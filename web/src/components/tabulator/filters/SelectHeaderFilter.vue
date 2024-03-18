<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import HeaderFilterButton from '../components/HeaderFilterButton.vue';
import type { SelectHeaderFilterItem, HeaderFilterProps } from '../types';

interface Props extends HeaderFilterProps {
  items: SelectHeaderFilterItem[];
  valueFormatter?: <T>(arg: T) => string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  success: () => true,
  cancel: () => {},
});

const currentIndex = ref(0);
const selected = ref(props.value);

const menuOpened = ref(false);
const table = ref();

const inputValue = ref();
watch(
  () => props.value,
  newVal => {
    if (props.valueFormatter) {
      inputValue.value = props.valueFormatter(newVal);
      return;
    }
    const selected = props.items.find(item => item.value === newVal);
    if (selected) {
      inputValue.value = selected.text;
      return;
    }
    inputValue.value = newVal;
  },
  { deep: true, immediate: true },
);

const filteredItems = computed(() =>
  props.items.filter(item => {
    if (!inputValue.value) return true;
    if (selected.value) return true;
    if (typeof item.text === 'string') return item.text.includes(inputValue.value);
    if (Array.isArray(item.text)) return item.text.some(val => val.includes(inputValue.value));
    return true;
  }),
);

const onInput = () => {
  currentIndex.value = 0;
  selected.value = '';
};
const onFocus = () => {
  menuOpened.value = true;
};
const onBlur = () => {
  menuOpened.value = false;
  if (selected.value) return;
  props.success('');
  inputValue.value = '';
};
const up = () => {
  if (currentIndex.value === 0) return;
  currentIndex.value--;
  table.value.scrollTo(0, table.value.children[currentIndex.value].offsetTop);
};
const down = () => {
  if (currentIndex.value === filteredItems.value.length - 1) return;
  currentIndex.value++;
  const activeItem = table.value.children[currentIndex.value];
  if (activeItem.offsetTop + activeItem.offsetHeight <= table.value.offsetHeight) return;
  table.value.scrollTo(0, activeItem.offsetTop + activeItem.offsetHeight - table.value.offsetHeight);
};

const onEnterKeydown = () => {
  if (!filteredItems.value?.length) {
    props.success('');
    return;
  }
  select(currentIndex.value);
};
const clear = () => {
  inputValue.value = '';
  props.success('');
  currentIndex.value = 0;
  selected.value = '';
};
const select = (index: number) => {
  const item = filteredItems.value[index];
  selected.value = item.value;
  inputValue.value = props.valueFormatter ? props.valueFormatter(item.value) : item.text;
  props.success(item.value);
  menuOpened.value = false;
};
</script>
<template>
  <div class="select-container">
    <div class="input-container">
      <input
        v-model="inputValue"
        type="text"
        class="header-filter-input"
        @input.stop="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.down.prevent="down"
        @keydown.up.prevent="up"
        @keydown.enter="onEnterKeydown"
        @keydown.esc="props.cancel"
        @click.stop="onFocus"
      />
      <HeaderFilterButton v-if="inputValue" icon="clear" alt="X" @click="clear" />
    </div>

    <div v-if="menuOpened" class="items-container">
      <table ref="table">
        <tr
          v-for="(item, index) in filteredItems"
          :key="item.value"
          :class="{ 'active-item': index === currentIndex }"
          @mousedown.stop="select(index)"
          @click.stop
        >
          <template v-if="Array.isArray(item.text)">
            <td v-for="(column, colIndex) in item.text" :key="colIndex">{{ column || '&nbsp;' }}</td>
          </template>
          <td v-else>{{ item.text }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.select-container {
  display: flex;
  flex-direction: column;
  .input-container {
    display: flex;
    align-items: center;
  }
}
.header-filter-input {
  width: calc(100% - 20px);
}

.items-container {
  table {
    background-color: rgb(var(--v-theme-menu-background));
    color: rgb(var(--v-theme-text));
    display: block;
    max-height: 250px;
    overflow: auto;
    overscroll-behavior: none;
    empty-cells: show;
    position: fixed;
    z-index: 1;
    tr {
      &.active-item {
        background-color: rgb(var(--v-theme-primary-light-1));
        color: #fff;
      }
      td {
        padding: 10px;
        text-align: left;
      }
    }
  }
}
</style>

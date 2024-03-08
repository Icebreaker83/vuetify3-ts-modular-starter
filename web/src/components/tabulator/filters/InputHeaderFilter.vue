<script setup lang="ts">
import { ref } from 'vue';
import HeaderFilterButton from '../components/HeaderFilterButton.vue';
import type { HeaderFilterProps } from '../types';
import { watch } from 'vue';
import { vMaska } from 'maska';

const props = withDefaults(
  defineProps<HeaderFilterProps>(),
  {
    success: () => true,
    cancel: () => {},
  },
);

const vMask = props.maska ? vMaska : {};

const inputValue = ref();
watch(
  () => props.value,
  newVal => {
    inputValue.value = newVal;
  },
  { deep: true, immediate: true },
);

const defaultDebounce = import.meta.env.VITE_DEFAULT_DEBOUNCE;
let debounce: ReturnType<typeof setTimeout> | undefined;
const onInput = (event: Event) => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    const target = event.target as HTMLInputElement;
    if (!event.target) return; // if not for this check, request would be sent 2 times
    props.success(target.value);
  }, defaultDebounce);
};

const clear = () => {
  inputValue.value = '';
  props.success('');
};
</script>
<template>
  <input
    v-model="inputValue"
    v-mask
    :data-maska="props.maska"
    data-maska-tokens="D:[\d]:repeated"
    type="text"
    class="header-filter-input"
    @input="onInput"
    @keydown.enter="props.success(inputValue)"
    @keydown.esc="props.cancel"
  />
  <HeaderFilterButton v-if="inputValue" icon="clear" alt="X" @click="clear" />
</template>
<style scoped lang="scss">
.header-filter-input {
  width: calc(100% - 20px);
}
</style>

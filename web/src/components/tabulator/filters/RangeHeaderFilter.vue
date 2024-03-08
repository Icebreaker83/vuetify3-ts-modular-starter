<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { vMaska, type MaskaDetail } from 'maska';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import HeaderFilterButton from '../components/HeaderFilterButton.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { isoToFormat } from '@/utils/helpers';
import type { DateMasks, RangeData, RangeFilter, HeaderFilterProps } from '../types';

interface Props extends Omit<HeaderFilterProps, 'value'> {
  value: RangeFilter | null;
  type: 'amount' | 'date';
  maskaReversed?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  value: null,
  success: () => true,
  cancel: () => {},
});

const containerWidth = computed(() => {
  return props.type === 'date' ? 'calc(100% - 40px)' : 'calc(100% - 20px)';
});

const dateMasks: DateMasks = {
  en: {
    mask: '##/##/####',
    format: 'MM/dd/yyyy',
    maskToValue: (masked: string) => {
      return masked.replace(/^([\d]{2})\/([\d]{2})\/([\d]{4})$/, '$3-$1-$2');
    },
  },
  sr: {
    mask: '##.##.####',
    format: 'dd.MM.yyyy',
    maskToValue: (masked: string) => {
      return masked.replace(/^([\d]{2})\.([\d]{2})\.([\d]{4})$/, '$3-$2-$1');
    },
  },
};

const { locale } = storeToRefs(useAppStore());
const dateMask = computed(() => {
  return dateMasks[locale.value];
});
const maskaOptions = computed(() => ({
  mask: props.type === 'date' ? dateMask.value.mask : 'D.DD#',
  tokens: {
    D: { pattern: /[\d]/, repeated: true },
  },
  reversed: props.type === 'amount',
}));

const datePicker = ref();
const date = ref<string[]>(['', '']);

const data: RangeData = reactive({
  from: {
    masked:
      props.type === 'date' ? isoToFormat(props.value?.from, dateMask.value.format) || '' : props.value?.from || '',
    unmasked: props.value?.from || '',
  },
  to: {
    masked: props.type === 'date' ? isoToFormat(props.value?.to, dateMask.value.format) || '' : props.value?.to || '',
    unmasked: props.value?.to || '',
  },
});

const onMaska = (detail: MaskaDetail, field: string) => {
  data[field as keyof RangeData].unmasked = detail.unmasked;
  if (props.type !== 'date') return;
  const index = field === 'from' ? 0 : 1;
  if (!detail.completed && detail.masked) {
    date.value[index] = '';
    return;
  }
  const filter: RangeFilter = {
    ...(data.from.masked ? { from: dateMask.value.maskToValue(data.from.masked) } : {}),
    ...(data.to.masked ? { to: dateMask.value.maskToValue(data.to.masked) } : {}),
  };
  date.value[index] = filter[field as keyof RangeFilter] ?? '';
  props.success(filter);
};

const defaultDebounce = import.meta.env.VITE_DEFAULT_DEBOUNCE;
let debounce: ReturnType<typeof setTimeout> | undefined;
const onInput = (event: Event) => {
  if (props.type === 'date') return;
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    if (!event.target) return; // if not for this check, request would be sent 2 times
    props.success({
      ...(data.from.unmasked ? { from: data.from.unmasked } : {}),
      ...(data.to.unmasked ? { to: data.to.unmasked } : {}),
    });
  }, defaultDebounce);
};

const clear = () => {
  Object.assign(data, { from: { masked: '', unmasked: '' }, to: { masked: '', unmasked: '' } });
  props.success({});
};

const onCalendarRangeSelected = (value: string[]) => {
  data.from.masked = isoToFormat(value[0], dateMask.value.format) || '';
  data.to.masked = isoToFormat(value[1], dateMask.value.format) || '';
};
</script>
<template>
  <div :style="{ width: containerWidth }" class="input-container">
    <input
      v-model="data.from.masked"
      v-maska:[maskaOptions]
      :placeholder="$t('misc.from')"
      @maska="onMaska($event.detail, 'from')"
      @input="onInput"
    />
    <input
      v-model="data.to.masked"
      v-maska:[maskaOptions]
      :placeholder="$t('misc.to')"
      @maska="onMaska($event.detail, 'to')"
      @input="onInput"
    />
  </div>
  <Datepicker
    v-if="props.type === 'date'"
    ref="datePicker"
    v-model="date"
    model-type="yyyy-MM-dd"
    :locale="locale"
    range
    multi-calendars
    auto-apply
    :teleport="true"
    :enable-time-picker="false"
    @update:model-value="onCalendarRangeSelected"
  >
    <template #trigger>
      <HeaderFilterButton icon="calendar-range" alt="calendar-range" />
    </template>
  </Datepicker>
  <HeaderFilterButton v-if="data.from.masked || data.to.masked" icon="clear" alt="X" @click="clear" />
</template>
<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  height: 38px;
  justify-content: space-between;
  input {
    width: 100%;
    height: 18px;
    font-size: 14px !important;
    text-align: right;
  }
}
.dp__main {
  &.dp__theme_light,
  &.dp__theme_dark {
    width: 20px;
  }
}
</style>

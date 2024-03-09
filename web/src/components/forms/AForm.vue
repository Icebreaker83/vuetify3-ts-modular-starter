<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    hideActions?: boolean;
    loading?: boolean;
    cancelable?: boolean;
    blockActions?: boolean;
  }>(),
  {
    cancelable: true,
  },
);

const emit = defineEmits(['cancel']);

onKeyStroke(['Escape'], e => {
  e.preventDefault();
  emit('cancel');
});
</script>
<template>
  <v-form>
    <slot></slot>
    <slot v-if="!props.hideActions" name="actions" v-bind="{ loading }">
      <v-row class="mt-2">
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            v-if="props.cancelable"
            color="secondary"
            type="button"
            :block="props.blockActions"
            :disabled="props.loading"
            size="large"
            class="text-none me-2"
            data-cy="form-cancel-button"
            @click="emit('cancel')"
          >
            {{ $t('form.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :block="props.blockActions"
            :disabled="props.loading"
            :loading="props.loading"
            size="large"
            class="text-none"
            data-cy="form-submit-button"
          >
            {{ $t('form.submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </slot>
  </v-form>
</template>

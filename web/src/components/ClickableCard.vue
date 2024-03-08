<script setup lang="ts">
type ClickableCardItem = {
  title: string;
  topNumber: string | number;
  baseColor: string;
  icon: string;
  goTo: object;
};

const props = defineProps<{
  data: ClickableCardItem;
}>();
</script>

<template>
  <div class="clickable-card__wrapper">
    <v-list-item
      min-height="90"
      class="clickable-card__item"
      variant="flat"
      :title="props.data.title"
      :append-icon="props.data.icon"
      :to="props.data.goTo"
      lines="two"
      base-color="white"
    >
      <template #prepend>
        <div class="clickable-card__item--prepend mr-4" :style="{ background: props.data.baseColor }">
          {{ props.data.topNumber }}
        </div>
      </template>

      <template #append>
        <v-icon :icon="props.data.icon" :color="props.data.baseColor"/>
      </template>
    </v-list-item>
  </div>
</template>

<style lang="scss">
.clickable-card {
  &__wrapper {
    border: 1px solid lightgray; // remove border when page background is changed to gray
  }

  &__item {
    &--prepend {
      width: 100px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
}
</style>

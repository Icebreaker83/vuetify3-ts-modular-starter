<script setup lang="ts">
type ActivityListItem = {
  title: string;
  subtitle: string;
  user: string;
};

const props = defineProps<{
  // limit?: string | number;
  // goTo?: string | object;
  type: string;
  data: Array<ActivityListItem>;
}>();
</script>

<template>
  <div class="activity-list__wrapper">
    <v-list lines="two" class="pa-0">
      <v-list-subheader class="bg-primary">
        <template #default>
          <v-btn icon="mdi-account-reactivate-outline" variant="text"></v-btn>
          <span class="ml-1">Poslednje aktivnosti</span>
        </template>
      </v-list-subheader>

      <v-list-item class="activity-list__item" v-for="item in props.data" variant="flat" :key="item.title">
        <template v-slot:prepend>
          <v-avatar class="activity-list__item--avatar"> A </v-avatar>
        </template>

        <template v-slot:title>
          <div class="activity-list__item--title">{{ item.title }}</div>
        </template>

        <template v-slot:subtitle>
          <div class="activity-list__item--subtitle">{{ item.subtitle }}</div>
        </template>

        <template v-slot:default>
          <div class="activity-list__item--user">{{ item.user }}</div>
        </template>

        <template v-slot:append>
          <div>{{ props.type }}</div>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss">
.activity-list {
  &__wrapper {
    // border: 1px solid lightgray;
  }
  &__item {
    border-bottom: 1px solid #cac4d0;
    background-color: #fef7ff !important;

    &--avatar {
      color: #21005d;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      background-color: #eaddff !important;
    }

    &--title {
      color: #49454f !important;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
    }

    &--subtitle {
      color: #1d1b20 !important;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }

    &--user {
      color: #49454f;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>

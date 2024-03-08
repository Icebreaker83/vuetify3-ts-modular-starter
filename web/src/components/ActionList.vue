<script setup lang="ts">
type ActionListItem = {
  title: string;
  icon: string;
  baseColor: string;
};

const props = defineProps<{
  data: ActionListItem[];
}>();
</script>

<template>
  <div class="action-list__wrapper">
    <v-list lines="two" class="pa-0">
      <v-list-item
        class="action-list__item mb-2"
        v-for="item in props.data"
        variant="flat"
        :key="item.title"
        :title="item.title"
        append-icon="mdi-chevron-right"
        :prepend-icon="item.icon"
        :to="{ name: 'dashboard' }"
        lines="two"
        :base-color="item.baseColor"
      >
      </v-list-item>
    </v-list>
  </div>
</template>

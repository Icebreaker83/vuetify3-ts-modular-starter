<script setup lang="ts">
import { ref } from 'vue';
import { endpoints } from '../api';
import { useApis, type ApiResponse } from '@/services/api';
import ClickableCard from '@/components/ClickableCard.vue';
import ActivityList from '@/components/ActivityList.vue';
import ActionList from '@/components/ActionList.vue';

const { sendRequest } = useApis();

const cardData = ref([]);
const actionData = ref([]);
const activityData = ref([]);

const activityRequest = {
  ...endpoints.getActivityData(),
  onSuccess: {
    callback: (response: ApiResponse) => Object.assign(activityData.value, response.data),
  },
};

const actionRequest = {
  ...endpoints.getActionData(),
  onSuccess: {
    callback: (response: ApiResponse) => Object.assign(actionData.value, response.data),
  },
};

const cardRequest = {
  ...endpoints.getCardData(),
  onSuccess: {
    callback: (response: ApiResponse) => Object.assign(cardData.value, response.data),
  },
};

sendRequest(cardRequest);
sendRequest(actionRequest);
sendRequest(activityRequest);
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="item in cardData" cols="12" md="4">
        <ClickableCard :data="item" />
      </v-col>
    </v-row>

    <v-divider class="mb-4 mt-4"></v-divider>

    <v-row>
      <v-col cols="12" md="8">
        <ActivityList type="Kvote" :data="activityData" />
      </v-col>
      <v-col cols="12" md="4">
        <ActionList :data="actionData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  icon: string;
  alt: string;
}>();

const iconRef = ref('');

// Function to dynamically import and set the icon
const setDynamicIcon = async (icon: string) => {
  try {
    const { default: importedIcon } = await import(`../assets/icons/${icon}.svg`);
    iconRef.value = importedIcon;
  } catch (error) {
    console.error('Error occurred while importing the icon: ', error);
  }
};

// Call the function with the prop value
setDynamicIcon(props.icon);
</script>
<template>
  <button type="button" tabindex="-1" class="header-filter-button">
    <img :src="iconRef" :alt="props.alt" />
  </button>
</template>
<style scoped lang="scss">
.header-filter-button {
  align-items: center;
  display: flex;
  padding-left: 2px;
  padding-right: 2px;
  img {
    width: 16px;
    height: 16px;
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(267deg) brightness(104%) contrast(104%);
  }
}
</style>

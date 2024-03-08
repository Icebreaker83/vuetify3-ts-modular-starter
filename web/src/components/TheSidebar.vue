<script setup lang="ts">
import { SidebarMenu, type SidebarItem } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const props = withDefaults(
  defineProps<{
    width?: string | number;
    menu: SidebarItem[];
  }>(),
  {
    width: 300,
  },
);

const { xs } = useDisplay();
const { toggleSidebar } = useAppStore();
const { sidebarCollapse, theme } = storeToRefs(useAppStore());
</script>
<template>
  <sidebar-menu
    v-if="!xs || (xs && !sidebarCollapse)"
    :menu="menu"
    :collapsed="xs ? false : sidebarCollapse"
    :theme="theme === 'light' ? 'white-theme' : ''"
    :width="`${props.width}px`"
    :relative="!xs"
    :class="[xs && 'mt-16']"
    @update:collapsed="toggleSidebar"
  />
</template>
<style scoped lang="scss">
.v-sidebar-menu {
  // margin-top: 64px;
  // height: calc(100vh - 64px) !important;
  z-index: 1005;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  &.vsm_white-theme {
    background-color: #f2f2f2;

    .vsm--link:hover {
      color: lightgray;
      background-color: #184a86;
      i {
        color: lightgray;
        background-color: #184a86;
      }
    }

    &.vsm_collapsed {
      .vsm--link.vsm--link_mobile-item {
        &.vsm--link_active {
          color: lightgray;
          background-color: #184a86;
        }
        .vsm--icon {
          background-color: #184a86;
        }
        &.vsm--link_active {
          background-color: #184a86;
        }
      }
      .vsm--link_level-1.vsm--link_open {
        .vsm--icon {
          background-color: #184a86;
        }
        background-color: #184a86;
      }
    }

    &.vsm_expanded {
      .vsm--link_level-1.vsm--link_open {
        .vsm--icon {
          background-color: #184a86;
        }
        background-color: #184a86;
      }
    }
    .vsm--toggle-btn {
      border-top: 1px solid lightgray;
    }

    .vsm--link_level-1 {
      .vsm--icon {
        background-color: transparent;
      }
      &.vsm--link_active {
        .vsm--icon {
          background-color: #184a86;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import TheSidebar from '@/components/TheSidebar.vue';
import type { SidebarItem } from 'vue-sidebar-menu';
import { useRouter, type RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { useAuthorizationService } from '@/services/authorization';
import type { BreadcrumbItem } from '@/types';

const router = useRouter();
const { authState } = useAuthorizationService();

type CombinedRoute = RouteRecordRaw | RouteRecordNormalized;

const allRoutes = router.getRoutes();
const parseRoutes = (routes: CombinedRoute[], depth = 0): SidebarItem[] => {
  const menuItems = routes.reduce(
    (acc, route) => {
      if (!route.meta?.isNavigation) return acc;
      if (!depth && !route.meta?.isRoot) return acc;
      acc.push({
        title: (route.meta?.title || route.name || route.path) as string,
        ...(route.name ? { href: { name: route.name } } : {}),
        icon: route.meta?.icon || '',
        ...(route.children && route.children.length
          ? { child: parseRoutes(route.children as CombinedRoute[], ++depth) }
          : {}),
      });
      return acc;
    },
    <SidebarItem[]>[],
  );
  return menuItems;
};

const menu = parseRoutes(allRoutes);

// const showActions = computed(() => {
//   return !router.currentRoute.value.meta.hideActions;
// });

// "to" prop of v-breadcrumbs-item is not working as expected
// thats why we use href prop in meta.breadcrumbs
const breadcrumbs = computed(() => {
  const currentRoute = router.currentRoute.value;
  if (!currentRoute.meta.breadcrumbs || !Array.isArray(currentRoute.meta.breadcrumbs))
    return currentRoute.matched.reduce(
      (acc, item, index) => {
        if (!index) return acc;
        acc.push({ title: item.meta.title as string, ...(!!item.components ? { href: item.path } : {}) });
        return acc;
      },
      <BreadcrumbItem[]>[],
    );
  const routes = currentRoute.meta.breadcrumbs.map(item => {
    if (!item.param) return item;
    return { ...item, title: currentRoute.params[item.param] };
  }) as BreadcrumbItem[];
  return routes;
});
</script>
<template>
  <div class="d-flex fill-height">
    <TheSidebar :menu="menu" />
    <div class="d-flex flex-column flex-grow-1 overflow-auto">
      <!-- use this for breadcrumb wrapper for now -->
      <div v-if="authState.isAuth" class="d-flex bg-primary px-4 py-2 actions-bar">
        <portal-target name="actions">
          <v-breadcrumbs :items="breadcrumbs" class="pa-0">
            <template #prepend>
              <router-link to="/">
                <v-icon icon="mdi-home" color="white" />
              </router-link>
            </template>
          </v-breadcrumbs>
        </portal-target>
      </div>
      <v-container fluid class="view-content">
        <router-view />
      </v-container>
    </div>
  </div>
</template>
<style scoped lang="scss">
.view-content {
  max-height: calc(100vh - 64px - 52px);
  overflow: auto;
}
.actions-bar {
  min-height: 52px;
}
</style>

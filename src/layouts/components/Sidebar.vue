<script setup>
import { ref, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menuItems = ref([]);

watchEffect(() => {
  if (router && router.options && router.options.routes) {
    menuItems.value = router.options.routes
      .filter(r => !r.meta?.hidden) 
      .map(r => {
        const children = r.children?.map(child => ({
          label: child.name,
          route: r.path !== '/' 
            ? `${r.path}/${child.path}`.replace('//', '/') 
            : `/${child.path}`, 
        })) || [];

        const isActive = r.children 
          ? route.path.startsWith(r.path)   
          : route.path === r.path;

        return {
          label: r.meta?.label || r.name,
          icon: r.meta?.icon,
          route: r.path,
          badge: r.meta?.badge,
          badgeColor: r.meta?.badgeColor || 'bg-blue-100 text-blue-500', 
          children,
          isOpen: isActive
        };
      });
  }
});

const toggleMenu = (index) => {
  if (menuItems.value[index]) {
    menuItems.value[index].isOpen = !menuItems.value[index].isOpen;
  }
};

const isParentActive = (item) => {
  if (!item.children || item.children.length === 0) return false;
  return route.path.startsWith(item.route);
};
</script>

<template>
  <aside class="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 overflow-hidden z-20">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 mb-2 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg  flex items-center justify-center text-white shadow-sm">
          <img src="../../assets/image.png" alt="logo nutapos" class="w-10 h-10 rounded-lg">
        </div>
        <span class="text-4xl font-bold text-nutagreen">nutapos</span>
      </div>
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
      <template v-for="(item, index) in menuItems" :key="index">
        <!-- Single Item -->
        <div v-if="!item.children || item.children.length === 0">
          <router-link 
            :to="item.route" 
            class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-nutagreen hover:bg-green-50 rounded-xl transition-all group"
            active-class="bg-green-50 text-nutagreen font-medium"
          >
            <Icon :icon="item.icon" class="text-[24px]" />
            <span class="font-medium text-[15px]">{{ item.label }}</span>
          </router-link>
        </div>

        <!-- Parent Item with Children -->
        <div v-else>
          <div 
            class="flex items-center justify-between px-4 py-2.5 hover:bg-green-50 text-gray-800 rounded-xl cursor-pointer transition-colors"
            :class="{ 'bg-gray-50': item.isOpen, 'bg-green-50 text-nutagreen': isParentActive(item) }"
            @click="toggleMenu(index)"
          >
            <div class="flex items-center gap-3">
              <Icon :icon="item.icon" class="text-[24px]" />
              <span class="font-medium text-[15px]">{{ item.label }}</span>
              <span v-if="item.badge" class="bg-blue-100 text-blue-500 text-[11px] px-2.5 py-0.5 rounded-full font-bold lowercase">{{ item.badge }}</span>
            </div>
            <Icon 
              icon="material-symbols:keyboard-arrow-down" 
              class="text-xl text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': item.isOpen }"
            />
          </div>
          
          <div v-show="item.isOpen" class="mt-2 space-y-1">
            <router-link 
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :to="child.route"
              class="flex items-center pl-[54px] pr-4 py-2 text-[15px] text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
              active-class="text-nutagreen bg-[#F0FDF4] font-medium rounded-xl"
            >
              {{ child.label }}
            </router-link>
          </div>
        </div>
      </template>
    </nav>

    <!-- Activation Button -->
    <div class="p-6 bg-white z-10">
      <button class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-all font-medium shadow-sm active:scale-[0.98]">
        <Icon icon="material-symbols:key-outline" class="text-xl" />
        <span class="text-sm">Aktivasi Nutapos</span>
      </button>
    </div>
  </aside>
</template>



<style scoped>

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}
</style>

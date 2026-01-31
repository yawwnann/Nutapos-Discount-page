<template>
  <header class="h-[72px] bg-white border-b border-gray-100 flex items-center px-4 md:px-8 fixed top-0 left-0 lg:left-[280px] right-0 z-30 transition-all duration-300">
    <!-- Menu Button (Mobile) -->
    <button 
      class="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden mr-4"
      @click="$emit('toggle-sidebar')"
    >
      <Icon icon="material-symbols:menu-rounded" class="text-2xl" />
    </button>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xl">
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon icon="material-symbols:search-rounded" class="text-gray-400 text-xl group-focus-within:text-green-500 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Cari Stok" 
          class="block w-full pl-10 pr-3 py-2.5 border-none bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-0 transition-all"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-6 ml-auto">
      <!-- Notification -->
      <button class="relative p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-full transition-colors">
        <Icon icon="material-symbols:notifications" class="text-[26px]" />
        <span class="absolute top-1 right-1.5 flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
        </span>
        <span class="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">9</span>
      </button>

      <!-- User Profile -->
      <div class="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
        <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
          J
        </div>
        <div class="hidden md:flex flex-col">
          <span class="text-sm font-bold text-gray-800 leading-tight">Yuwananta</span>
          <span class="text-xs text-gray-500 font-medium">Admin</span>
        </div>
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-gray-400 text-xl" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineEmits(['toggle-sidebar']);
</script>

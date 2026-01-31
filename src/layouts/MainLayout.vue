<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import AppBar from './components/AppBar.vue';
import Footer from './components/Footer.vue';
import Toast from '../components/common/Toast.vue';

const isSidebarOpen = ref(false); 

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white border-r border-gray-100 w-[280px]"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar />
    </div>

   
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/20 z-20 lg:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-[280px]">
      <AppBar @toggle-sidebar="toggleSidebar" />
      
      <main class="flex-1 mt-[72px] mb-16 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
        <div class="max-w-9xl mx-auto">
          <slot />
        </div>
      </main>
      
      <Footer />
    </div>
    <Toast />
  </div>
</template>


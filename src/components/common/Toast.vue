    <script setup>
    import { useToast } from '../../composables/useToast';
    
    const { isVisible, message, type } = useToast();
    </script>
<template>
  <Transition name="toast-slide">
    <div 
      v-if="isVisible" 
      class="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg min-w-[300px] justify-center"
      :class="[
        type === 'success' ? 'bg-[#155753] text-white' : 
        type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'
      ]"
    >
      <span class="text-sm font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>


<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  --tw-translate-y: -20px;
}
</style>

    
    <script setup>
    import { Icon } from '@iconify/vue';
    
    const props = defineProps({
      isOpen: Boolean,
      showCloseButton: {
        type: Boolean,
        default: true
      },
      closeOnBackdrop: {
        type: Boolean,
        default: true
      }
    });
    
    const emit = defineEmits(['close']);
    
    const close = () => {
      emit('close');
    };

    const handleBackdropClick = () => {
      if (props.closeOnBackdrop) {
        close();
      }
    };
    </script>
<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" @click="handleBackdropClick"></div>

      <!-- Modal Panel -->
      <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 leading-6">
              <slot name="title">Modal Title</slot>
            </h3>
            <button v-if="showCloseButton" @click="close" class="text-gray-400 hover:text-gray-500 transition-colors">
              <Icon icon="material-symbols:close-rounded" class="text-2xl" />
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-6">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
             <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

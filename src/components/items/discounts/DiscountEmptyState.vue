<script setup>
import Button from '@/components/common/Button.vue';
import blankDiscountImage from '@/assets/blankDiscountImage.png'; // Direct import if possible, or use prop

const emit = defineEmits(['openAddModal']);
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
    <div class="w-48 h-48 mb-6 relative">
       <!-- Circular blur background -->
       <div class="absolute inset-0 bg-blue-50 rounded-full blur-xl opacity-60 animate-pulse"></div>
       <img :src="blankDiscountImage" alt="No Discounts" class="w-full h-full object-contain relative z-10 drop-shadow-sm" />
    </div>
    <h3 class="text-xl font-bold text-gray-800 mb-2">Belum ada diskon</h3>
    <p class="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
      Buat promo menarik untuk pelanggan setiamu dan tingkatkan penjualan!
    </p>
    <Button 
      icon="material-symbols:add-rounded" 
      size="lg" 
      class="shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5 transition-all duration-300"
      @click="$emit('openAddModal')"
    >
      Tambah Diskon Baru
    </Button>
  </div>
</template>

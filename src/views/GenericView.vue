<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import img404 from '@/assets/404notFound.png';
    import Button from '@/components/common/Button.vue';
    
    const route = useRoute();
    const title = computed(() => route.name || 'Halaman');
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
    <div class="w-64 md:w-96 mb-6">
      <img :src="img404" alt="Page Not Found" class="w-full h-auto drop-shadow-sm" />
    </div>
    
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Ups halaman belum tersedia</h2>
    <p class="text-gray-500 mb-8 max-w-md mx-auto">
      Silahkan kembali ke halaman discount
    </p>

    <router-link to="/items/diskon">
      <Button icon="material-symbols:arrow-back-rounded" class="font-semibold !px-6 !py-3">
        Kembali ke Halaman Diskon
      </Button>
    </router-link>
  </div>
</template>


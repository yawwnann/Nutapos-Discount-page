<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['save']);

const step = ref('choice'); // 'choice' | 'custom'
const customUrl = ref('');
const defaultUrl = import.meta.env.VITE_API_BASE_URL || '';

const selectDefault = () => {
  emit('save', defaultUrl);
};

const goToCustom = () => {
  step.value = 'custom';
  customUrl.value = '';
};

const goBack = () => {
  step.value = 'choice';
};

const saveCustom = () => {
  if (!customUrl.value) return;
  emit('save', customUrl.value);
};
</script>

<template>
  <div v-if="isOpen">
    <!-- Backdrop (Fixed) -->
    <div class="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30"></div>

    <!-- Content (Absolute relative to parent) -->
    <div class="absolute top-full right-0 mt-2 w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-40 origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Title -->
      <div class="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        <Icon icon="material-symbols:settings-suggest-rounded" class="text-nutagreen text-2xl" />
        <span class="text-lg font-bold text-gray-800">Konfigurasi API</span>
      </div>
      
      <div class="py-1">
        <!-- Choice Step -->
        <div v-if="step === 'choice'" class="space-y-3">
          <p class="text-gray-600 mb-5 text-sm leading-relaxed">
            Selamat datang! Untuk memulai, silakan pilih sumber data API yang ingin Anda gunakan.
          </p>

          <div class="grid gap-3">
            <!-- Demo Option -->
            <button 
              @click="selectDefault"
              class="group text-left p-4 rounded-xl border border-gray-200 hover:border-nutagreen hover:bg-green-50/50 transition-all active:scale-[0.99]"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-nutagreen text-xl font-bold">
                    D
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 group-hover:text-nutagreen transition-colors text-sm">Gunakan API Demo</h3>
                    <p class="text-xs text-gray-500 mt-1">Menggunakan server CrudCrud bawaan (.env)</p>
                  </div>
                </div>
                <Icon icon="material-symbols:arrow-forward-rounded" class="text-gray-300 group-hover:text-nutagreen transition-colors text-lg" />
              </div>
            </button>

            <!-- Custom Option -->
            <button 
              @click="goToCustom"
              class="group text-left p-4 rounded-xl border border-gray-200 hover:border-nutagreen hover:bg-green-50/50 transition-all active:scale-[0.99]"
            >
               <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl font-bold">
                    K
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 group-hover:text-nutagreen transition-colors text-sm">API Kustom</h3>
                    <p class="text-xs text-gray-500 mt-1">Gunakan URL endpoint CrudCrud Anda sendiri</p>
                  </div>
                </div>
                 <Icon icon="material-symbols:arrow-forward-rounded" class="text-gray-300 group-hover:text-nutagreen transition-colors text-lg" />
              </div>
            </button>
          </div>
        </div>

        <!-- Custom Step -->
        <div v-else class="space-y-4">
          <div class="flex items-center gap-2 mb-4 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors w-fit" @click="goBack">
             <Icon icon="material-symbols:arrow-back-rounded" />
             <span class="text-sm font-medium">Kembali</span>
          </div>

          <div class="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-4">
            <p class="text-xs text-orange-700 leading-relaxed">
              <strong>Catatan:</strong> Pastikan endpoint CrudCrud Anda valid dan aktif.
            </p>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">URL Endpoint</label>
            <input 
              v-model="customUrl"
              type="text" 
              placeholder="https://crudcrud.com/api/..."
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-nutagreen outline-none transition-all font-medium text-sm"
            />
          </div>

          <Button 
            @click="saveCustom" 
            block 
            class="!mt-4 !bg-nutagreen hover:!bg-nutagreen/90 font-bold"
            :disabled="!customUrl"
          >
            Simpan Konfigurasi
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

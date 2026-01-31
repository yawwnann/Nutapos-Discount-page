<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';

const props = defineProps({
  isOpen: Boolean,
  isEditMode: Boolean,
  formData: Object,
  isLoading: Boolean,
  isLoading: Boolean,
  errors: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'save', 'delete', 'update:formData']);

const modalTitle = computed(() => props.isEditMode ? 'Edit Diskon' : 'Tambah Diskon');

const handleInput = (event) => {
  let val = event.target.value;
  
  if (props.formData.type === 'currency') {
    // Remove non-digits
    val = val.replace(/\D/g, '');
    
    // Format if valid number
    if (val) {
      val = parseInt(val, 10).toLocaleString('id-ID');
    }
  }
  
  props.formData.value = val;
};

const isFormValid = computed(() => {
  return props.formData.name && props.formData.value && props.formData.value !== '0';
});
</script>

<template>
  <Modal :isOpen="isOpen" @close="$emit('close')">
    <template #title>{{ modalTitle }}</template>
    <div class="space-y-6">
      
      <!-- Nama Diskon -->
      <div>
        <div class="relative">
          <label 
            class="absolute -top-2 left-4 bg-white px-1 text-xs font-regular transition-colors z-10"
            :class="errors.name ? 'text-red-500' : 'text-gray-500'"
          >
            Nama Diskon
          </label>
          <input 
            v-model="formData.name"
            type="text" 
            placeholder="Promo Merdeka"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all outline-none font-medium"
            :class="[
              errors.name
                ? 'border-red-500 text-gray-900 focus:ring-red-100 focus:border-red-500 pr-10' 
                : 'border-gray-300 focus:ring-green-100 focus:border-nutagreen text-gray-900'
            ]"
          />
          <div v-if="errors.name" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon icon="material-symbols:error-rounded" class="text-red-500 text-xl" />
          </div>
        </div>
        <p v-if="errors.name" class="mt-1 text-xs text-red-500 font-medium ml-4">
          {{ errors.name }}
        </p>
      </div>

      <!-- Diskon -->
      <div>
        <div class="flex gap-3">
          <!-- Input -->
          <div class="flex-1 relative">
            <label class="absolute -top-2 left-4 bg-white px-1 text-xs font-regular text-gray-500 z-10">
              Diskon
            </label>
            <span 
              v-if="formData.type === 'currency'"
              class="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500"
            >
              Rp
            </span>
          <input 
              :value="formData.value"
              @input="handleInput"
              type="text" 
              placeholder="0"
              class="w-full py-3 border rounded-lg focus:ring-2 transition-all outline-none font-semibold text-gray-900"
              :class="[
                formData.type === 'currency' ? 'pl-12' : 'pl-4',
                errors.value
                  ? 'border-red-500 focus:ring-red-100 focus:border-red-500 pr-10' 
                  : 'border-gray-300 focus:ring-green-100 focus:border-nutagreen pr-4'
              ]"
            />

            <div v-if="errors.value" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon icon="material-symbols:error-rounded" class="text-red-500 text-xl" />
            </div>
            <p v-if="errors.value" class="mt-1 text-xs text-red-500 font-medium ml-4 text-left">
              {{ errors.value }}
            </p>
          </div>
          
          <!-- Type Toggle -->
          <div class="flex border border-gray-300 rounded-lg overflow-hidden bg-white shrink-0 h-[50px]">
            <button 
              @click="formData.type = 'percentage'"
              class="px-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 min-w-[80px]"
              :class="formData.type === 'percentage' ? 'bg-green-50 text-nutagreen' : 'bg-transparent text-gray-900 hover:bg-gray-50'"
            >
              <Icon v-if="formData.type === 'percentage'" icon="material-symbols:check" class="text-lg" />
              %
            </button>
            <div class="w-[1px] bg-gray-300 my-2"></div>
            <button 
              @click="formData.type = 'currency'"
              class="px-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 min-w-[80px]"
              :class="formData.type === 'currency' ? 'bg-green-50 text-nutagreen' : 'bg-transparent text-gray-900 hover:bg-gray-50'"
            >
              <Icon v-if="formData.type === 'currency'" icon="material-symbols:check" class="text-lg" />
              Rp
            </button>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4">
        <Button 
          @click="$emit('save')" 
          :disabled="isLoading"
          block
          class="!py-3.5 !rounded-full !bg-nutagreen hover:!bg-nutagreen/90 font-semibold text-base shadow-none"
        >
          <span v-if="isLoading">Menyimpan...</span>
          <span v-else>Simpan</span>
        </Button>

        <button 
          v-if="isEditMode"
          @click="$emit('delete')"
          class="w-full mt-3 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-3 rounded-xl transition-colors text-sm font-bold"
        >
          Hapus Diskon
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Button from '@/components/common/Button.vue';
import ApiSetupModal from '@/components/items/discounts/ApiSetupModal.vue';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  isApiConfigOpen: {
    type: Boolean,
    default: false
  },
  apiUrlConfig: {
    type: String,
    default: ''
  },
  selectedCount: {
    type: Number,
    default: 0
  },
  isApiSetupOpen: {
    type: Boolean,
    default: false
  },
  totalData: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:searchQuery', 'toggleApiConfig', 'saveApiConfig', 'openAddModal', 'update:apiUrlConfig', 'cancelSelection', 'bulkDelete', 'resetApiConfig', 'setup-save']);

const handleSearchInput = (e) => {
  emit('update:searchQuery', e.target.value);
};

const handleApiUrlInput = (e) => {
  emit('update:apiUrlConfig', e.target.value);
};
</script>

<template>
  <div class="p-6 transition-all flex flex-col items-center md:items-start duration-300">
    <div class="flex flex-col sm:flex-row items-center w-full justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 tracking-tight">Daftar Diskon</h1>
        <p class="text-gray-500 text-sm mt-1">Total jumlah diskon: {{ totalData }}</p>
      </div>

      <div v-if="selectedCount > 0" class="flex gap-3">
        <Button 
          variant="secondary"
          class="!bg-white !border !border-red-500 !text-red-500 hover:!bg-red-50 !font-semibold !px-6"
          @click="$emit('cancelSelection')"
        >
          Batalkan
        </Button>
        <Button   
          variant="danger"
          class="!bg-red-500 hover:!bg-red-600 !text-white !font-semibold !px-6 !border-none"
          @click="$emit('bulkDelete')"
        >
          Hapus
        </Button>
      </div>
      <Button v-else icon="material-symbols:add-rounded" @click="$emit('openAddModal')">
        Tambah Diskon
      </Button>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-fit  p-1.5 rounded-2xl ">
      <!-- Search -->
      <div class="relative w-full md:w-80 group">
        <Icon icon="material-symbols:search-rounded" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-nutagreen transition-colors text-lg" />
        <input 
          :value="searchQuery"
          @input="handleSearchInput"
          type="text" 
          placeholder="Cari diskon..." 
          class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-nutagreen focus:ring-1 focus:ring-nutagreen transition-all placeholder:text-gray-400 text-gray-700"
        />
      </div>

      <!-- Outlet Filter / API Config -->
      <div class="relative">
         <button 
            @click="$emit('toggleApiConfig')"
            class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:border-gray-300 transition-colors w-full md:w-auto justify-between"
            :class="{'border-green-500 ring-1 ring-green-500 bg-green-50': isApiConfigOpen}"
         >
            <Icon icon="material-symbols:storefront-outline" class="text-gray-500 text-lg" :class="{'text-nutagreen': isApiConfigOpen}" />
            <span class="text-sm font-medium">Kopi Anak Bangsa</span>
            <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-gray-400" :class="{'rotate-180 text-nutagreen': isApiConfigOpen}" />
         </button>

         <!-- API CONFIG POPOVER -->
         <div 
           v-if="isApiConfigOpen"
           class="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-20"
         >
            <label class="block text-xs font-semibold text-gray-500 mb-2">URL API crudcrud.com</label>
            <input 
              :value="apiUrlConfig"
              @input="handleApiUrlInput"
              type="text" 
              placeholder="https://crudcrud.com/api/..."
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mb-4"
            />
            <Button @click="$emit('saveApiConfig')" block class="!py-2 !text-sm">
              Terapkan
            </Button>
            
            <div class="border-t border-gray-100 my-3"></div>
            
            <button 
              @click="$emit('resetApiConfig')"
              class="w-full text-center text-xs text-gray-500 hover:text-nutagreen font-medium transition-colors"
            >
              Ubah Sumber Data / Reset
            </button>
         </div>

         <!-- Mandatory API Setup Modal (Custom Positioned) -->
         <ApiSetupModal 
            :isOpen="isApiSetupOpen"
            @save="(url) => $emit('setup-save', url)"
         />
      </div>
    </div>
  </div>
</template>

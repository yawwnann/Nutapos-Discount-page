<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  itemsPerPage: Number,
  isPerPageDropdownOpen: Boolean
});

const emit = defineEmits(['changePage', 'setItemsPerPage', 'togglePerPageDropdown']);

const handleSetItemsPerPage = (size) => {
  emit('setItemsPerPage', size);
};

const handlePageChange = (page) => {
  emit('changePage', page);
};
</script>

<template>
  <div class="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 text-sm text-gray-500 border-t border-gray-100 bg-white">
    <div class="flex items-center gap-3">
      <div class="relative">
         <button 
           @click="$emit('togglePerPageDropdown')"
           class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 focus:outline-none"
         >
            {{ itemsPerPage }}
            <Icon icon="material-symbols:keyboard-arrow-down" :class="{ 'rotate-180': isPerPageDropdownOpen }" class="transition-transform" />
         </button>
         
         <!-- Dropdown Menu -->
         <div 
           v-if="isPerPageDropdownOpen"
           class="absolute bottom-full mb-1 left-0 w-full min-w-[80px] bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-10"
         >
           <button 
             v-for="option in [10, 25, 50]" 
             :key="option"
             @click="handleSetItemsPerPage(option)"
             class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
             :class="{ 'bg-green-50 text-nutagreen font-medium': itemsPerPage === option }"
           >
             {{ option }}
           </button>
         </div>
      </div>
      <span>data per halaman</span>
    </div>

    <div class="flex items-center gap-2">
       <button 
         @click="handlePageChange(currentPage - 1)"
         :disabled="currentPage === 1"
         class="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
       >
         <Icon icon="material-symbols:chevron-left" class="text-xl" />
       </button>

       
       <template v-for="page in totalPages" :key="page">
          <button 
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            @click="handlePageChange(page)"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            :class="currentPage === page ? 'font-bold bg-nutagreen text-white shadow-sm ring-2 ring-green-100' : 'font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
          <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="text-gray-400 px-1">...</span>
       </template>

       <button 
         @click="handlePageChange(currentPage + 1)"
         :disabled="currentPage === totalPages"
         class="p-2 text-gray-600 hover:text-nutagreen disabled:opacity-50 disabled:cursor-not-allowed"
       >
         <Icon icon="material-symbols:chevron-right" class="text-xl" />
       </button>
    </div>
  </div>
</template>

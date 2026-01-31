
<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { api } from '../../services/api';
import { useToast } from '../../composables/useToast';
import DiscountHeader from '../../components/items/discounts/DiscountHeader.vue';
import DiscountTable from '../../components/items/discounts/DiscountTable.vue';
import DiscountPagination from '../../components/items/discounts/DiscountPagination.vue';
import DiscountEmptyState from '../../components/items/discounts/DiscountEmptyState.vue';
import DiscountModal from '../../components/items/discounts/DiscountModal.vue';
import Modal from '../../components/common/Modal.vue';
import Button from '../../components/common/Button.vue';

const discounts = ref([]);
const isLoading = ref(true);
const errors = reactive({
  name: '',
  value: '',
  general: ''
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalData = ref(0);
const totalPages = ref(1);

// Sort & Search State
const searchQuery = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref('desc');

// Debounce helper
let timeout = null;
const debounce = (func, wait) => {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const fetchDiscounts = async () => {
  isLoading.value = true;
  errors.general = '';
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (!apiUrl) throw new Error('VITE_API_BASE_URL is not defined in .env');
    
    const response = await api.getDiscounts(
      currentPage.value, 
      itemsPerPage.value,
      searchQuery.value,
      sortBy.value,
      sortOrder.value
    );
    
    if (response.success) {
      if (response.Pagination.total_data === 0 && !searchQuery.value) {
        discounts.value = [];
        updatePagination(response.Pagination);
      } else {
        discounts.value = response.data || [];
        updatePagination(response.Pagination);
      }
    } else {
      throw new Error(response.message || 'Failed to fetch');
    }

  } catch (e) {
    console.error(e);
    errors.general = e.message;
  } finally {
    isLoading.value = false;
  }
};

const updatePagination = (pagination) => {
  totalData.value = pagination.total_data;
  totalPages.value = pagination.total_pages;
  currentPage.value = pagination.current_page;
};

// Watch search with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1;
  fetchDiscounts();
}, 500));

const handleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  fetchDiscounts();
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchDiscounts();
  }
};

const isPerPageDropdownOpen = ref(false);
const setItemsPerPage = (size) => {
  itemsPerPage.value = size;
  currentPage.value = 1;
  isPerPageDropdownOpen.value = false;
  fetchDiscounts();
};

const togglePerPageDropdown = () => {
  isPerPageDropdownOpen.value = !isPerPageDropdownOpen.value;
};

// API Configuration
const isApiConfigOpen = ref(false);
const apiUrlConfig = ref(localStorage.getItem('dynamic_api_url') || import.meta.env.VITE_API_BASE_URL || '');

const toggleApiConfig = () => {
  isApiConfigOpen.value = !isApiConfigOpen.value;
};

const saveApiConfig = () => {
  if (apiUrlConfig.value) {
    localStorage.setItem('dynamic_api_url', apiUrlConfig.value);
    isApiConfigOpen.value = false;
    showToast('API URL berhasil disimpan', 'success');
    currentPage.value = 1;
    fetchDiscounts();
  }
};

// Add/Edit Discount Logic
const { showToast } = useToast();

const isModalOpen = ref(false);
const isEditMode = ref(false);
const editingId = ref(null);
const formData = reactive({
  name: '',
  value: '',
  type: 'percentage',
  isNew: true
});

const resetForm = () => {
  formData.name = '';
  formData.value = '';
  formData.type = 'percentage';
  formData.isNew = true;
  editingId.value = null;
  isEditMode.value = false;
  
  // Reset errors
  errors.name = '';
  errors.value = '';
  errors.general = '';
};

const openAddModal = () => {
  resetForm();
  isModalOpen.value = true;
};

const openEditModal = (item) => {
  isEditMode.value = true;
  editingId.value = item._id;
  
  formData.name = item.name;
  formData.isNew = item.isNew || false;
  
  if (item.value.includes('%')) {
    formData.type = 'percentage';
    formData.value = item.value.replace('%', '').trim();
  } else {
    formData.type = 'currency';
    formData.value = item.value.replace(/[^\d]/g, '');
  }
  
  // Reset errors when opening existing
  errors.name = '';
  errors.value = '';
  errors.general = '';
  
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(resetForm, 200);
};

const saveDiscount = async () => {
  // Reset errors
  errors.name = '';
  errors.value = '';
  errors.general = '';
  
  let isValid = true;
  
  if (!formData.name) {
    errors.name = 'Nama diskon wajib diisi';
    isValid = false;
  } else {
    // Unique Name Validation (Client-side, current page only)
    const isDuplicate = discounts.value.some(d => {
      if (isEditMode.value && d._id === editingId.value) return false;
      return d.name.toLowerCase() === formData.name.toLowerCase();
    });

    if (isDuplicate) {
      errors.name = 'Nama diskon sudah digunakan';
      isValid = false;
    }
  }

  if (!formData.value || formData.value === '0') {
    errors.value = 'Nilai diskon tidak valid';
    isValid = false;
  }
  
  if (!isValid) return;

  isLoading.value = true;
  
  try {
    const payload = {
      name: formData.name,
      value: formData.type === 'percentage' 
        ? `${formData.value}%` 
        : `Rp ${parseInt(formData.value.replace(/\./g, '')).toLocaleString('id-ID')}`,
      isNew: formData.isNew
    };

    if (isEditMode.value && editingId.value) {
      await api.updateDiscount(editingId.value, payload);
      showToast('Diskon berhasil diubah', 'success');
    } else {
      await api.createDiscount(payload);
      showToast('Diskon berhasil ditambahkan', 'success');
    }

    closeModal();
    fetchDiscounts();
  } catch (e) {
    console.error(e);
    errors.general = e.message;
    showToast('Gagal menyimpan diskon', 'error');
  } finally {
    isLoading.value = false;
  }
};

const isDeleteModalOpen = ref(false);
const isBulkDeleteMode = ref(false);

const openDeleteModal = () => {
  isBulkDeleteMode.value = false;
 
  isModalOpen.value = false; 
  isDeleteModalOpen.value = true;
};

const openBulkDeleteModal = () => {
  if (selectedItems.value.length === 0) return;
  isBulkDeleteMode.value = true;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const confirmDelete = async () => {
  isLoading.value = true;
  try {
    if (isBulkDeleteMode.value) {
      await Promise.all(selectedItems.value.map(id => api.deleteDiscount(id)));
      showToast(`${selectedItems.value.length} diskon berhasil dihapus`, 'success');
      selectedItems.value = [];
    } else {
      await api.deleteDiscount(editingId.value);
      showToast('Diskon berhasil dihapus', 'success');
    }
    
    closeDeleteModal();
    fetchDiscounts();
  } catch (e) {
    console.error(e);
    showToast('Gagal menghapus diskon', 'error');
  } finally {
    isLoading.value = false;
  }
};

const selectedDiscountNames = computed(() => {
  return discounts.value
    .filter(d => selectedItems.value.includes(d._id))
    .map(d => d.name)
    .join(', ');
});

// Selection Logic
const selectedItems = ref([]);

const toggleSelection = (id) => {
  const index = selectedItems.value.indexOf(id);
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(id);
  }
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = discounts.value.map(d => d._id);
  }
};

const isAllSelected = computed(() => {
  return discounts.value.length > 0 && selectedItems.value.length === discounts.value.length;
});

const isIndeterminate = computed(() => {
  return selectedItems.value.length > 0 && selectedItems.value.length < discounts.value.length;
});



// Show empty state only when no data at all and not searching
const showEmptyState = computed(() => {
  return !isLoading.value && discounts.value.length === 0 && !searchQuery.value;
});

const isApiSetupOpen = ref(false);

const handleApiSetup = (url) => {
  localStorage.setItem('dynamic_api_url', url);
  apiUrlConfig.value = url;
  isApiSetupOpen.value = false;
  showToast('Konfigurasi API berhasil disimpan', 'success');
  fetchDiscounts();
};

const handleApiReset = () => {
  localStorage.removeItem('dynamic_api_url');
  apiUrlConfig.value = '';
  isApiConfigOpen.value = false;
  isApiSetupOpen.value = true;
};

onMounted(() => {
  const savedUrl = localStorage.getItem('dynamic_api_url');
  if (!savedUrl) {
    isApiSetupOpen.value = true;
  } else {
    fetchDiscounts();
  }
});
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
    
    <!-- Header -->
    <DiscountHeader 
      v-model:searchQuery="searchQuery"
      v-model:apiUrlConfig="apiUrlConfig"
      :isApiConfigOpen="isApiConfigOpen"
      :isApiSetupOpen="isApiSetupOpen"
      :selectedCount="selectedItems.length"
      :totalData="totalData"
      @toggleApiConfig="toggleApiConfig"
      @saveApiConfig="saveApiConfig"
      @openAddModal="openAddModal"
      @cancelSelection="selectedItems = []"
      
      @bulkDelete="openBulkDeleteModal"
      @resetApiConfig="handleApiReset"
      @setup-save="handleApiSetup"
    />



        <!-- Empty State -->
        <DiscountEmptyState 
          v-if="showEmptyState"
          @openAddModal="openAddModal"
        />

        <!-- Table View -->
        <template v-else>
          <div class="flex-1 px-6">
            <DiscountTable 
              v-model:searchQuery="searchQuery"
              :discounts="discounts"
              :selectedItems="selectedItems"
              :sortBy="sortBy"
              :sortOrder="sortOrder"
              :isAllSelected="isAllSelected"
              :isIndeterminate="isIndeterminate"
              :searchQuery="searchQuery"
              @toggleSelectAll="toggleSelectAll"
              @toggleSelection="toggleSelection"
              @handleSort="handleSort"
              @editItem="openEditModal"
            />
          </div>

          <!-- Pagination -->
          <DiscountPagination 
            :currentPage="currentPage"
            :totalPages="totalPages"
            :itemsPerPage="itemsPerPage"
            :isPerPageDropdownOpen="isPerPageDropdownOpen"
            @changePage="changePage"
            @setItemsPerPage="setItemsPerPage"
            @togglePerPageDropdown="togglePerPageDropdown"
          />
    </template>

  </div>

  <!-- Modal -->
  <DiscountModal 
      :isOpen="isModalOpen"
      :isEditMode="isEditMode"
      :formData="formData"
      :isLoading="isLoading"
      :errors="errors"
      @close="closeModal"
      @save="saveDiscount"
      @delete="openDeleteModal"
    />
  <!-- Delete Confirmation Modal -->
  <Modal :isOpen="isDeleteModalOpen" @close="closeDeleteModal">
    <template #title>Hapus Diskon</template>
    <div class="space-y-4">
      <p class="text-gray-600">
        Apakah Anda yakin ingin menghapus 
        <span class="font-bold text-gray-900">
          {{ isBulkDeleteMode ? ` ${selectedDiscountNames}` : ` ${formData.name}` }}
        </span>?
      </p>
      
      <div class="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
        <div class="mt-2 w-1 h-1 rounded-full bg-gray-800 shrink-0"></div>
        <p class="text-sm text-gray-600">
          Diskon yang dihapus tidak bisa dikembalikan lagi.
        </p>
      </div>

      <div class="flex gap-3 pt-2">
        <Button 
          variant="secondary"
          block
          class="!bg-white !border !border-gray-300 !text-gray-700 hover:!bg-gray-50"
          @click="closeDeleteModal"
        >
          Batalkan
        </Button>
        <Button 
          variant="danger"
          block
          class="!bg-red-500 hover:!bg-red-600 !text-white !border-none"
          @click="confirmDelete"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Menghapus...</span>
          <span v-else>Hapus</span>
        </Button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
/* Custom checkbox styling */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid currentColor;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background-color: rgb(34, 197, 94);
  border-color: rgb(34, 197, 94);
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}

.custom-checkbox:indeterminate {
  background-color: rgb(34, 197, 94);
  border-color: rgb(34, 197, 94);
}

.custom-checkbox:indeterminate::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 2px;
  background-color: white;
  border-radius: 1px;
}
</style>

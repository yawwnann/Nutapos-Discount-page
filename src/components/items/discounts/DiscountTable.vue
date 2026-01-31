<script setup>
import { Icon } from '@iconify/vue';
import Button from '@/components/common/Button.vue';

const props = defineProps({
  discounts: Array,
  selectedItems: Array,
  sortBy: String,
  sortOrder: String,
  isAllSelected: Boolean,
  isIndeterminate: Boolean,
  searchQuery: String
});

const emit = defineEmits(['toggleSelectAll', 'toggleSelection', 'handleSort', 'editItem', 'update:searchQuery']);

const getSortIcon = (field) => {
  if (props.sortBy !== field) return 'material-symbols:unfold-more-rounded';
  return props.sortOrder === 'asc' ? 'material-symbols:arrow-downward-alt-rounded' : 'material-symbols:arrow-upward-alt-rounded';
};

const clearSearch = () => {
    emit('update:searchQuery', '');
};

</script>

<template>
  <div class="overflow-x-auto border border-gray-200 rounded-lg">
    <table class="w-full">
      <thead>
        <tr class="border-b bg-gray-50 border-gray-200">
          <th class="py-4 px-6 w-16 text-center">
            <div class="flex items-center justify-center">
              <input 
                type="checkbox" 
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="$emit('toggleSelectAll')"
                class="custom-checkbox w-5 h-5 transition-all text-nutagreen border-gray-400 rounded-lg focus:ring-nutagreen focus:ring-offset-0 cursor-pointer"
              />
            </div>
          </th>
          <th class="py-4 px-4 text-left cursor-pointer hover:bg-gray-50 transition-colors" @click="$emit('handleSort', 'name')">
            <button class="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-800 pointer-events-none">
              Nama Diskon
              <Icon :icon="getSortIcon('name')" class="text-gray-400 text-base" :class="{'text-nutagreen': sortBy === 'name'}" />
            </button>
          </th>
          <th class="py-4 px-4 text-left cursor-pointer hover:bg-gray-50 transition-colors" @click="$emit('handleSort', 'value')">
            <button class="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-800 pointer-events-none">
              Nilai Diskon
              <Icon :icon="getSortIcon('value')" class="text-gray-400 text-base" :class="{'text-nutagreen': sortBy === 'value'}" />
            </button>
          </th>
          <th class="py-4 px-4 w-12"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr 
          v-for="item in discounts" 
          :key="item._id" 
          class="hover:bg-gray-50 transition-colors group"
        >
          <td class="py-5 px-6 text-center">
             <div class="flex items-center justify-center">
              <input 
                type="checkbox" 
                :checked="selectedItems.includes(item._id)"
                @change="$emit('toggleSelection', item._id)"
                class="custom-checkbox w-5 h-5 transition-all text-nutagreen border-gray-400 rounded-lg focus:ring-nutagreen focus:ring-offset-0 cursor-pointer"
              />
            </div>
          </td>
          <td class="py-5 px-4">
            <div class="flex items-center gap-3">
              <span class="font-medium text-gray-800 text-sm">{{ item.name }}</span>
              <span v-if="item.isNew" class="bg-blue-50 text-blue-500 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-blue-100">
                baru
              </span>
            </div>
          </td>
          <td class="py-5 px-4">
            <span class="text-gray-600 font-medium text-sm">{{ item.value }}</span>
          </td>
          <td class="py-5 px-4 text-right">
            <div class="flex items-center justify-end gap-2 pr-2">
              <button 
                @click="$emit('editItem', item)"
                class="p-2 text-gray-400 hover:text-nutagreen hover:bg-green-50 rounded-full transition-all"
              >
                <Icon icon="material-symbols:edit-outline" class="text-xl" />
              </button>
            </div>
          </td>
        </tr>
        
        <!-- Empty Search Result -->
        <tr v-if="discounts.length === 0">
          <td colspan="4" class="py-12 text-center text-gray-500">
            <div class="flex flex-col items-center gap-2">
              <p>Tidak ditemukan data yang cocok</p>
              <Button 
                v-if="searchQuery"
                variant="ghost" 
                size="sm" 
                @click="clearSearch"
                class="!text-nutagreen !p-0 hover:!bg-transparent hover:underline"
              >
                Hapus pencarian
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Custom checkbox styling */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid #9ca3af;
  cursor: pointer;
  position: relative;
  background-color: white;
}

.custom-checkbox:checked {
  background-color: rgb(34, 197, 94);
  border-color: rgb(34, 197, 94);
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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
  width: 10px;
  height: 2px;
  background-color: white;
}
</style>

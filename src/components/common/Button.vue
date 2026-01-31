<template>
  <button 
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full',
      variantClasses[variant],
      sizeClasses[size],
      block ? 'w-full' : ''
    ]"
    v-bind="$attrs"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'outline', 'ghost', 'danger-outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  }
});

const variantClasses = {
  primary: 'bg-nutagreen hover:bg-green-600 text-white shadow-sm shadow-green-200 border border-transparent',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-transparent',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-200 border border-transparent',
  outline: 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50',
  'danger-outline': 'bg-white border border-red-200 text-red-500 hover:bg-red-50',
  ghost: 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 border border-transparent'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5'
};
</script>

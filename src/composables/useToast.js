import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
const type = ref('success'); 
let timeout = null;

export function useToast() {
  const showToast = (msg, msgType = 'success', duration = 3000) => {
    message.value = msg;
    type.value = msgType;
    isVisible.value = true;

    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  const hideToast = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    message,
    type,
    showToast,
    hideToast
  };
}

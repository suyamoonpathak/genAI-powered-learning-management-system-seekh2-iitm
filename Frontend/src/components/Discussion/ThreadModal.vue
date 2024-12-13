<!-- ThreadModal.vue -->
<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-neutral-800 p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-white">Create New Thread</h2>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2">Topic</label>
          <input v-model="topic" type="text" class="w-full p-2 rounded-lg text-white" placeholder="Enter topic" />
        </div>
        <div class="flex justify-end">
          <button @click="cancel" class="bg-gray-500 text-white p-2 rounded-lg mr-2">Cancel</button>
          <button @click="createThread" class="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">Create</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define event emitters
  const emit = defineEmits(['close', 'create-thread']);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  
  const topic = ref('');
  
  const cancel = () => {
    topic.value = '';
    emit('close');
  };
  
  const createThread = () => {
    if (!topic.value) {
      alert('Please enter a topic');
      return;
    }
    emit('create-thread', {
      topic: topic.value,
      created_by: user.id,
      created_at: new Date().toISOString(),
    });
    topic.value = '';
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  
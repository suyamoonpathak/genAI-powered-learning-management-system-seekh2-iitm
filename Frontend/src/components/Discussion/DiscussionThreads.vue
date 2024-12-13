<template>
  <div>
    <UserNav />
    <div class="flex">
      <UserSidebar />
      <div class="flex-1 text-left p-6 bg-neutral-800 text-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Discussion Threads</h2>
        <button 
          @click="showModal = true" 
          class="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">
          <i class="fa-solid fa-file-invoice mr-2"></i>Create New Thread
        </button>
        <div class="mt-4">
          <h2 class="text-xl font-bold mb-4">Available Threads</h2>
          <div 
            v-for="thread in threads" 
            :key="thread.id" 
            class="bg-neutral-700 cursor-pointer p-4 rounded-lg hover:bg-neutral-600 mb-4"
            @click="goToThread(thread.thread_id)">
            <h3 class="text-lg font-bold">{{ thread.topic }}</h3>
            <p class="text-sm">{{ thread.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Thread Modal -->
    <ThreadModal v-if="showModal" @close="showModal = false" @create-thread="handleCreateThread" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import UserNav from '../Bars/UserNav.vue';
import UserSidebar from '../Bars/UserSidebar.vue';
import ThreadModal from './ThreadModal.vue';

const threads = ref([]);
const courseId = 2; // Replace with dynamic course ID
const router = useRouter();
const showModal = ref(false);

const fetchThreads = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/courses/${courseId}/discussionthreads`);
    threads.value = response.data;
    console.log('Fetched threads:', threads.value);
  } catch (error) {
    console.error('Error fetching threads:', error);
  }
};


const goToThread = (thread_id) => {
  console.log('Navigating to thread:', thread_id);
  router.push(`/thread/${thread_id}`);
};

const handleCreateThread = async (newThread) => {
  try {
    await axios.post(`http://localhost:3001/api/courses/${courseId}/discussionthreads`, newThread);
    fetchThreads(); // Refresh the list after creating a thread
    showModal.value = false;
  } catch (error) {
    console.error('Error creating thread:', error);
  }
};

// Fetch threads when the component is mounted
onMounted(() => {
  fetchThreads();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>

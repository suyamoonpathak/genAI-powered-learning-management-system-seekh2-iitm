<template>
  <div>
    <UserNav />
    <div class="flex">
      <UserSidebar />
      <main class="flex-grow mx-auto px-6 py-10 text-left">
        <h2 class="text-2xl font-bold mb-6">Schedule</h2>
        <div class="m-5 p-4 bg-neutral-700 shadow-lg rounded-lg">
          <div class="flex justify-center items-center">
            <VCalendar
              transparent
              borderless
              :is-dark="isDark"
              title-position="left"
              expanded
              :color="selectedColor"
              :attributes="attrs"
            />
          </div>
        </div>
        <h2 class="text-2xl font-bold mt-4 mb-2">Upcoming/Previous Sessions</h2>

        <!-- Show "Create QA Session" button if the user is an admin -->
         <a v-if="isAdmin" href="/createqa">
        <button class="bg-orange-600 z-50 text-white w-full p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out mb-4">
          Create QA Session
        </button>
      </a>
        <!-- Display upcoming QA sessions -->
        <ul v-if="qaSessions.length" class="mb-6">
          <li v-for="session in qaSessions" :key="session.session_id" class="mb-4 p-4 bg-neutral-700 rounded-lg">
            <h3 class="text-lg font-semibold text-white">{{ session.topic }}</h3>
            <p class="text-white">Date: {{ new Date(session.session_date).toLocaleDateString() }}</p>
            <p class="text-white">Time: {{ new Date(session.session_date).toLocaleTimeString() }}</p>
            <a :href="session.recording_url" class="text-blue-500 underline" target="_blank" v-if="session.recording_url">
              Watch Recording
            </a>
          </li>
        </ul>
        <p v-else class="text-white">No sessions available.</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import UserNav from '../Bars/UserNav.vue';
import UserSidebar from '../Bars/UserSidebar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isDark = ref(true);
const selectedColor = ref('orange');
const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
]);

const showModal = ref(false);
const showCreateQAModal = ref(false);
const qaSessions = ref([]);
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const courseId = 2; // Replace with dynamic course ID if necessary
const isAdmin = user && user.role === 'Admin';

const fetchQASessions = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/courses/${courseId}/qaSessions`);
    qaSessions.value = response.data.sort((a, b) => new Date(b.session_date) - new Date(a.session_date));

    // Add QA sessions to the calendar
    qaSessions.value.forEach((session) => {
      attrs.value.push({
        key: session.topic,
        dates: new Date(session.session_date),
        highlight: {
          backgroundColor: selectedColor.value,
          borderColor: 'black',
          borderRadius: '10px'
        }
      });
    });

  } catch (error) {
    console.error('Error fetching QA sessions:', error);
  }
};

const addEvent = (event) => {
  attrs.value.push({
    key: event.title,
    dates: new Date(event.date),
    highlight: {
      backgroundColor: selectedColor.value,
      borderColor: 'black',
      borderRadius: '10px'
    }
  });
};

// Fetch QA sessions when the component is mounted
onMounted(() => {
  fetchQASessions();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>

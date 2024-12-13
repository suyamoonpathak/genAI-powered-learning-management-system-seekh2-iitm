<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <UserNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <!-- Add your main content here -->
        <h2 class="text-white text-2xl font-bold">Add Session</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="addSession" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
                <h2 class="text-white text-2xl mb-2 font-bold">Session Details</h2>
                <div class="mb-4">
                    <input v-model="session_name" type="text" name="name" id="name" placeholder="Session Topic" class="w-full p-2 mb-2 text-white bg-neutral-700 rounded-md" required>
                    <input v-model="date" type="date" name="date" id="date" placeholder="Session Date" class="w-full p-2 mb-2 text-white bg-neutral-700 rounded-md" required>
                    <input v-model="time" type="time" name="time" id="time" placeholder="Session Time" class="w-full p-2 mb-2 text-white bg-neutral-700 rounded-md" required>
                    <input v-modal="recording" type="text" name="recording" id="recording" placeholder="Recording URL" class="w-full p-2 text-white bg-neutral-700 rounded-md">
                </div>

              <button type="submit" class="w-full p-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition duration-300 ease-in-out">Submit</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  </template>
  


    <script setup>
    import { ref } from 'vue';
    import UserNav from '../Bars/UserNav.vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


    // Form fields
    const session_name = ref('');
    const recording = ref('');
    const course_id = 2;
    const date = ref('');
    const time = ref('');

    const addSession = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/courses/${course_id}/qaSessions`, {
          instructor_id: user.id,
          session_date: date.value + ' ' + time.value,
          topic: session_name.value,
          recording_url: recording.value
        });
        console.log(response.data);
        router.push('/schedule');
      } catch (error) {
        console.error(error);
      }
    };




    </script>
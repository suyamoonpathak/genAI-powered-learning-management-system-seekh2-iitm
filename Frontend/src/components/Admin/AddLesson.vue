<template>
  <div class="bg-neutral-800 min-h-screen flex flex-col">
    <header class="bg-neutral-900 top-0 w-full z-50">
      <UserNav />
    </header>
    <main class="flex-grow pt-16 flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold">Add Lesson</h2>
      <section class="text-white p-8 flex justify-center w-full">
        <div class="w-1/2">
          <form @submit.prevent="addLesson" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
            <h2 class="text-white text-2xl font-bold">Course Details</h2>
            <div class="mb-4">
              <label for="module_name" class="block text-white text-sm font-medium mb-2">Python Programming</label>
              <select
                v-model="selectedModule"
                name="module_name"
                id="module_name"
                class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                required
              >
                <option v-for="module in modules" :key="module.module_id" :value="module.module_id">
                  {{ module.module_name }}
                </option>
              </select>
              <input
                v-model="lesson_name"
                type="text"
                name="lesson_name"
                id="lesson_name"
                placeholder="Lesson Name"
                class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                required
              />
              <input
                v-model="video_url"
                type="text"
                name="video_url"
                id="video_url"
                placeholder="Video URL"
                class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                required
              />
              <input
                v-model="content"
                type="text"
                name="content"
                id="content"
                placeholder="Content"
                class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                required
              />
              <!-- Transcript textarea for multiline input -->
              <textarea
                v-model="transcript"
                name="transcript"
                id="transcript"
                placeholder="Transcript"
                class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md h-32 resize-y"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full p-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import UserNav from '../Bars/UserNav.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const course_id = 2;
const lesson_name = ref('');
const video_url = ref('');
const content = ref('');
const transcript = ref('');
const selectedModule = ref(null);
const modules = ref([]);

// Fetch modules when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/courses/${course_id}/modules`);
    modules.value = response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
  }
});

const addLesson = async () => {
  try {
    await axios.post('http://localhost:3001/api/lessons', {
      course_id: course_id,
      module_id: selectedModule.value, // Send the selected module ID
      lesson_name: lesson_name.value,
      video_url: video_url.value,
      content: content.value,
      transcript: transcript.value
    });
    // Redirect back to the course admin page
    router.push('/courses/Python Programming');
  } catch (error) {
    console.error('Error adding lesson:', error);
  }
};
</script>

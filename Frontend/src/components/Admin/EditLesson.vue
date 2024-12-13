<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <UserNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <h2 class="text-white text-2xl font-bold">Edit Lesson</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="updateLesson" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
              <h2 class="text-white text-2xl font-bold">Course Details</h2>
              <div class="mb-4">
                <label for="module_name" class="block text-white text-sm font-medium">Select Module</label>
                <select
                  v-model="selectedModule"
                  @change="fetchLessons"
                  name="module_name"
                  id="module_name"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                >
                  <option value="" disabled>Select a module</option>
                  <option v-for="module in modules" :key="module.module_id" :value="module.module_id">
                    {{ module.module_name }}
                  </option>
                </select>
  
                <label for="lesson_name" class="block text-white text-sm font-medium"></label>
                <select
                  v-model="selectedLessonId"
                  @change="fetchLessonDetails"
                  name="lesson_name"
                  id="lesson_name"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                >
                  <option value="" disabled>Select a lesson</option>
                  <option v-for="lesson in lessons" :key="lesson.lesson_id" :value="lesson.lesson_id">
                    {{ lesson.lesson_name }}
                  </option>
                </select>
  
                <label for="lesson_name_input" class="block text-white text-sm font-medium"></label>
                <input
                  v-model="lesson_name"
                  type="text"
                  name="lesson_name_input"
                  id="lesson_name_input"
                  placeholder="Lesson Name"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
  
                <label for="video_url" class="block text-white text-sm font-medium"></label>
                <input
                  v-model="video_url"
                  type="text"
                  name="video_url"
                  id="video_url"
                  placeholder="Video URL"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
  
                <label for="content" class="block text-white text-sm font-medium"></label>
                <input
                  v-model="content"
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Content"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
  
                <label for="transcript" class="block text-white text-sm font-medium"></label>
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
                Save Changes
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
  const course_id = 2; // Assuming this is hard-coded for now
  
  const lesson_name = ref('');
  const video_url = ref('');
  const content = ref('');
  const transcript = ref('');
  const selectedModule = ref(null);
  const selectedLessonId = ref(null);
  const modules = ref([]);
  const lessons = ref([]);
  
  // Fetch the modules when the component is mounted
  onMounted(async () => {
    try {
      const modulesResponse = await axios.get(`http://localhost:3001/api/courses/${course_id}/modules`);
      modules.value = modulesResponse.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  });
  
  // Fetch lessons for the selected module
  const fetchLessons = async () => {
    if (selectedModule.value) {
      try {
        const lessonsResponse = await axios.get(`http://localhost:3001/api/modules/${selectedModule.value}/lessons`);
        lessons.value = lessonsResponse.data;
        selectedLessonId.value = null;
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    }
  };
  
  // Fetch the details of the selected lesson
  const fetchLessonDetails = async () => {
    if (selectedLessonId.value) {
      try {
        const lessonResponse = await axios.get(`http://localhost:3001/api/lessons/${selectedLessonId.value}`);
        const lessonData = lessonResponse.data;
  
        // Populate the form with the existing lesson data
        lesson_name.value = lessonData.lesson_name;
        video_url.value = lessonData.video_url;
        content.value = lessonData.content;
        transcript.value = lessonData.transcript;
      } catch (error) {
        console.error('Error fetching lesson details:', error);
      }
    }
  };
  
  const updateLesson = async () => {
    if (!selectedLessonId.value) return;
    
    try {
      await axios.put(`http://localhost:3001/api/lessons/${selectedLessonId.value}`, {
        course_id: course_id,
        module_id: selectedModule.value,
        lesson_name: lesson_name.value,
        video_url: video_url.value,
        content: content.value,
        transcript: transcript.value
      });
      router.push('/courses/Python Programming');
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };
  </script>
  
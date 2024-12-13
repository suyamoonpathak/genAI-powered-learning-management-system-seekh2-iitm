<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <UserNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <h2 class="text-white text-2xl font-bold">Add Assignment</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="addAssignment" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
              <h2 class="text-white text-2xl font-bold">Assignment Details</h2>
              <div class="mb-4">
                <label for="module_id" class="block text-white text-sm font-medium mb-2">Select Module</label>
                <select
                  v-model="selectedModule"
                  name="module_id"
                  id="module_id"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                >
                  <option v-for="module in modules" :key="module.module_id" :value="module.module_id">
                    {{ module.module_name }}
                  </option>
                </select>
                <input
                  v-model="title"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Assignment Title"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
                <textarea
                  v-model="description"
                  name="description"
                  id="description"
                  placeholder="Assignment Description"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md h-32 resize-y"
                  required
                ></textarea>
                <input
                  v-model="type"
                  type="text"
                  name="type"
                  id="type"
                  placeholder="Assignment Type"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
                <input
                  v-model="due_date"
                  type="date"
                  name="due_date"
                  id="due_date"
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                  required
                />
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
  const course_id = 2; // Hard-coded course_id if needed elsewhere
  const title = ref('');
  const description = ref('');
  const type = ref('');
  const due_date = ref('');
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
  
  const addAssignment = async () => {
    try {
      await axios.post('http://localhost:3001/api/courses/assignments', {
        module_id: selectedModule.value, // Send the selected module ID
        title: title.value,
        description: description.value,
        type: type.value,
        due_date: due_date.value
      });
      // Redirect back to the course admin page
      router.push('/courses/Python Programming');
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };
  </script>
  
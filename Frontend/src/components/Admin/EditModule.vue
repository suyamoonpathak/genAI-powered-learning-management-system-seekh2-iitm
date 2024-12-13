<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <UserNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <h2 class="text-white text-2xl font-bold">Edit Module</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="updateModule" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
              <h2 class="text-white text-2xl font-bold">Course Details</h2>
              <div class="mb-4">
                <label for="module" class="block text-white text-sm font-medium mb-2">Select Module</label>
                <select 
                  v-model="selectedModuleId" 
                  @change="fetchModuleDetails" 
                  id="module" 
                  class="w-full mt-2 p-2 text-white bg-neutral-700 rounded-md"
                >
                  <option value="" disabled>Select a module</option>
                  <option v-for="module in modules" :key="module.module_id" :value="module.module_id">
                    {{ module.module_name }}
                  </option>
                </select>
              </div>
              <div class="mb-4">
                <label for="name" class="block text-white text-sm font-medium mb-2">Module Name</label>
                <input 
                  v-model="module_name" 
                  type="text" 
                  id="name" 
                  placeholder="Module Name" 
                  class="w-full p-2 text-white bg-neutral-700 rounded-md" 
                  required
                />
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
  const selectedModuleId = ref(null); // To hold the selected module's ID
  const module_name = ref('');
  const modules = ref([]); // To hold the list of modules
  
  // Fetch all modules when the component is mounted
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/courses/${course_id}/modules`);
      modules.value = response.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  });
  
  // Fetch the details of the selected module
  const fetchModuleDetails = async () => {
    if (selectedModuleId.value) {
      try {
        const response = await axios.get(`http://localhost:3001/api/modules/${selectedModuleId.value}`);
        const moduleData = response.data;
  
        // Populate the form with the existing module data
        module_name.value = moduleData.module_name;
      } catch (error) {
        console.error('Error fetching module data:', error);
      }
    }
  };
  
  const updateModule = async () => {
    try {
      await axios.put(`http://localhost:3001/api/modules/${selectedModuleId.value}`, {
        course_id: course_id,
        module_name: module_name.value
      });
      router.push('/courses/Python Programming');
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };
  </script>
  
<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <UserNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <!-- Add your main content here -->
        <h2 class="text-white text-2xl font-bold">Add Module</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="addModule" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
                <h2 class="text-white text-2xl font-bold">Course Details</h2>
                <div class="mb-4">
                    <label for="name" class="block text-white text-sm  font-medium mb-2">Python Programming</label>
                    <input v-model="module_name" type="text" name="name" id="name" placeholder="Module Name" class="w-full p-2 text-white bg-neutral-700 rounded-md" required>
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


    // Form fields
    const course_id = 2;
    const module_name = ref('');
    const order = 0;

    const addModule = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/courses/modules', {
          course_id: course_id,
          module_name: module_name.value,
          order: order
        });
        router.push('/courses/Python Programming');
      } catch (error) {
        console.error(error);
      }
    };


    </script>
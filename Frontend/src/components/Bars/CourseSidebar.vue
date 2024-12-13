<template>
    <div class="hidden xl:block xl:w-1/48 min-h-screen bg-neutral-900 p-5 border-r border-neutral-700 shadow-md">
      <ul>
        <div v-if="user.role === 'Admin' || user.role === 'Instrcutor' || user.role === 'TA'">
        <li class="mb-4">
          <a href="/admin/dashboard" class="text-white text-m font-normal">
          <div class="flex justify-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
            <i class="fa-solid fa-home"></i>
          </div>
          </a>
        </li>
        </div>
        <div v-else>
        <li class="mb-4">
          <a href="/dashboard" class="text-white text-m font-normal">
          <div class="flex justify-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
            <i class="fa-solid fa-home"></i>
          </div>
          </a>
        </li>
        </div>
        <li class="mb-4">
          <a href="/latestupdates" class="text-white text-m font-normal">
          <div class="flex justify-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
            <i class="fa-solid fa-bell"></i>
          </div>
          </a>
        </li>
        <li class="mb-4">
          <a href="/discussion" class="text-white text-m font-normal">
          <div class="flex justify-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
            <i class="fa-solid fa-comments"></i>
          </div>
          </a>
        </li>
        <li class="mb-4">
          <a href="/schedule" class="text-white text-m font-normal">
          <div class="flex justify-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          </a>
        </li>
        <div class="xl:block fixed bottom-4">
          <button class="bg-orange-600 text-white w-full p-3 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out" @click="logout"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
      </ul>

  </div>
</template>

<script>
export default {
name: 'CourseSidebar'
}

</script>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('chatHistory');
  router.push('/');
}

</script>

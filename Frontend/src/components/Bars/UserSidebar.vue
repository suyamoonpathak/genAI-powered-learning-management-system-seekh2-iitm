<template>
      <div class="hidden xl:block xl:w-1/5 min-h-screen bg-neutral-900 p-5 border-r border-neutral-700 shadow-md">
        <ul>
          <li class="mb-4">
            <a href="/latestupdates" class="text-white text-lg font-normal">
            <div class="flex items-center justify-center bg-neutral-800 p-2 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
              <i class="fa-solid fa-bell mr-2"></i>Latest Updates
            </div>
            </a>
          </li>
          <div v-if = "user.role === 'Admin' || user.role === 'Instructor' || user.role === 'TA'">
          <li class="mb-4">
            <a href="/admin/dashboard" class="text-white text-lg font-normal">
            <div class="flex justify-center items-center bg-neutral-800 p-2 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
              <i class="fa-solid fa-home mr-2"></i><p>Dashboard</p>
            </div>
            </a>
          </li>
          </div>
          <div v-else>
          <li class="mb-4">
            <a href="/dashboard" class="text-white text-lg font-normal">
            <div class="flex items-center justify-center bg-neutral-800 p-2 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
              <i class="fa-solid fa-home mr-2"></i><p>Dashboard</p>
            </div>
            </a>
          </li>
          </div>
          <li class="mb-4">
            <a href="/discussion" class="text-white text-lg font-normal">
            <div class="flex items-center justify-center bg-neutral-800 p-2 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
              <i class="fa-solid fa-comments mr-2"></i>Discussion
            </div>
            </a>
          </li>
          <li class="mb-4">
            <a href="/schedule" class="text-white text-lg font-normal">
            <div class="flex items-center justify-center bg-neutral-800 p-2 rounded-lg hover:bg-neutral-600 transition duration-300 ease-in-out">
              <i class="fa-solid fa-calendar-days mr-2"></i>Schedule
            </div>
            </a>
          </li>
          <div class="flex justify-center xl:w-1/6 fixed bottom-4">
            <button class="bg-orange-600 text-white w-full p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out" @click="logout"><i class="fa-solid fa-right-from-bracket mr-2"></i>Logout</button>
        </div>
        </ul>
        
    </div>
  </template>
  
<script>
export default {
name: 'UserSidebar'
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

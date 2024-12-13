<template>
    <nav class="flex justify-between p-6 px-4 top-0 left-0 w-full bg-neutral-900 shadow-lg">
      <div class="flex justify-between items-center w-full">
        <div class="xl:w-1/4">
          <div v-if = "user.role === 'Admin' || user.role === 'Instructor' || user.role === 'TA'">
                <a class="flex items-center max-w-max ml-8" href="/admin/dashboard">
                    <img src="../../assets/Seek2_transp_white.png" alt="Seek2 Logo" class="h-12">
                    <span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white pl-2">Seek<sup>2</sup></span><span class="ml-2 font-2xl text-neutral-300"> | {{ course_name }}</span>
                </a>
                </div>
                <div v-else>
                    <a class="flex items-center max-w-max ml-8" href="/dashboard">
                    <img src="../../assets/Seek2_transp_white.png" alt="Seek2 Logo" class="h-12">
                    <span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white pl-2">Seek<sup>2</sup></span><span class="ml-2 font-2xl text-neutral-300"> | {{ course_name }}</span>
                </a>
            </div>
        </div>
        <div class="xl:w-2/5">
          <div class="relative items-center w-full">
            <form action="/search" method="get">
              <input type="text"  name="search" placeholder="Search" class="rounded-3xl items-center w-full px-12 py-4 text-sm font-medium" @keyup.enter="submitSearch" />
                <i class="fa-solid fa-magnifying-glass absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </form>
          </div>
        </div>
        <div class="xl:w-1/4">
          <div class="flex justify-end items-center pr-12">
            <a href="/profile" class="flex items-center text-white hover:text-gray-300 px-3 py-2 rounded-md text-m font-medium">
              <i class="fa-regular fa-circle-user text-2xl"></i>
              <span class="ml-2">Profile</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>

  export default {
    name: 'CourseNav',
    props: {
      course_name: {
        type: String,
        required: true
      }
    }
  }
  </script>
  

<script setup>

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

</script>

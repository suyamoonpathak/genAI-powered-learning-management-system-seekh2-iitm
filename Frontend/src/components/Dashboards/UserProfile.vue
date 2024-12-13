<template>
    <div>
    <UserNav />
        <div class="flex">
            <UserSidebar />
        <main class="flex-1 mt-4 p-4">
          <ProfileContent />
        </main>
      </div>
      <footer class="bg-neutral-900 bottom-0 p-4 text-white text-center">
          <p>&copy; 2024 Seek<sup>2</sup></p>
        </footer>
    </div>
  </template>
  
  <script setup>
  import UserNav from '../Bars/UserNav.vue'
  import UserSidebar from '../Bars/UserSidebar.vue'
  import ProfileContent from './ProfileContent.vue'
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  
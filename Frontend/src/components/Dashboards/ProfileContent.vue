<template>
  <div v-if="user" class="grid grid-cols-3 gap-4">
    <!-- Left Section: User Info -->
    <div class="col-span-1 flex flex-col items-center space-y-4 bg-neutral-700 p-4 rounded-lg">
      <div class="w-32 h-32 flex justify-center items-center bg-gray-500 rounded-full mb-4">
        <img v-if="user.profile_picture" :src="user.profile_picture" class="rounded-full w-full h-full object-cover" alt="Profile Picture">
        <i v-else class="fa-regular fa-user text-4xl text-white"></i>
      </div>
      <div v-if="user.role === 'Admin' || 'Instructor' || 'TA'" class="bg-orange-600 cursor-pointer p-2 rounded-lg w-full text-center">
        <p>{{ user.role }} Account</p>
      </div>
      <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
        <p class="text-white text-lg font-bold">{{ user.username || "NA" }}</p>
      </div>
      <router-link to="/editprofile" class="bg-orange-600 p-2 rounded-lg w-full text-center">
        <div>
          <p class="text-white">Update Info</p>
        </div>
      </router-link>
    </div>

    <!-- Right Section: Details and Badges -->
    <div class="col-span-2 flex flex-col space-y-4">
      <div class="bg-neutral-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-white">User Details</h2>
        <div class="space-y-4">
          <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
            <p class="text-white">Email: {{ user.email || "NA" }}</p>
          </div>
          <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
            <p class="text-white">Full Name: {{ user.full_name || "NA" }}</p>
          </div>
          <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
            <p class="text-white">Bio: {{ user.bio || "NA" }}</p>
          </div>
          <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
            <p class="text-white">Contact Info: {{ user.contact_info || "NA" }}</p>
          </div>
          <div class="bg-neutral-800 p-2 rounded-lg w-full text-center">
            <p class="text-white">Languages: {{ user.language_preference || "NA" }}</p>
          </div>
          <div class="bg-neutral-800 p-2 rounded-lg cursor-pointer w-full text-center">
            <a :href="user.e_portfolio" target="_blank" class="text-orange-500 hover:underline">View Portfolio</a>
          </div>
        </div>
      </div>

      <!-- Badges Section -->
      <div class="bg-neutral-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-white">Badges</h2>
        <div class="flex space-x-4 justify-center">
          <div v-for="badge in badges" :key="badge" class="w-16 h-16 bg-gray-500 rounded-lg">
            <img :src="badge" alt="Badge" class="w-full h-full object-cover">
          </div>
          <div class="flex space-x-4 justify-center">
            <div class="w-16 h-16 bg-gray-500 rounded-lg"></div>
            <div class="w-16 h-16 bg-gray-500 rounded-lg"></div>
            <div class="w-16 h-16 bg-gray-500 rounded-lg"></div>
            <div class="w-16 h-16 bg-gray-500 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-white">Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const badges = ref([]);

const fetchUserProfile = async () => {
  
  const userId = user.id || null;
  try {
    const response = await axios.get(`http://localhost:3001/api/user/profile/${userId}`);
    user.value = response.data;
    console.log('User:', user.value);
    badges.value = user.value.badges ? user.value.badges.split(',') : [];
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

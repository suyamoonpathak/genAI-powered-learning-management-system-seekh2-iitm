<template>
  <div class=" bg-neutral-800 min-h-screen">
    <UserNav />
    <div class="flex">
      <UserSidebar />
      <div v-if="profile" class="grid grid-cols-3 gap-4 col-span-4 m-6">
        <!-- Left Section: User Info -->
        <div class="col-span-1 flex flex-col items-center space-y-4 bg-neutral-700 p-4 rounded-lg">
          <div class="w-32 h-32 flex justify-center items-center bg-gray-500 rounded-full mb-4">
            <img v-if="profile.profile_picture" :src="profile.profile_picture" class="rounded-full w-full h-full object-cover" alt="Profile Picture">
            <i v-else class="fa-regular fa-user text-4xl text-white"></i>
          </div>
          <input type="file" @change="onFileChange" class="bg-neutral-800 p-2 rounded-lg w-full text-center text-white" />
        </div>

        <!-- Right Section: Edit Details -->
        <div class="col-span-2 flex flex-col space-y-4">
          <div class="bg-neutral-700 p-4 rounded-lg">
            <h2 class="text-xl font-bold mb-4 text-white">Edit User Details</h2>
            <div class="space-y-4">
              <div class="bg-neutral-800 p-2 rounded-lg w-full">
                <input v-model="profile.full_name" type="text" placeholder="Full Name" class="bg-neutral-800 p-2 rounded-lg w-full text-white" />
              </div>
              <div class="bg-neutral-800 p-2 rounded-lg w-full">
                <textarea v-model="profile.bio" placeholder="Bio" class="bg-neutral-800 p-2 rounded-lg w-full text-white"></textarea>
              </div>
              <div class="bg-neutral-800 p-2 rounded-lg w-full">
                <input v-model="profile.contact_info" type="text" placeholder="Contact Info" class="bg-neutral-800 p-2 rounded-lg w-full text-white" />
              </div>
              <div class="bg-neutral-800 p-2 rounded-lg w-full">
                <input v-model="profile.language_preference" type="text" placeholder="Languages" class="bg-neutral-800 p-2 rounded-lg w-full text-white" />
              </div>
              <div class="bg-neutral-800 p-2 rounded-lg w-full">
                <input v-model="profile.e_portfolio" type="text" placeholder="E-Portfolio Link" class="bg-neutral-800 p-2 rounded-lg w-full text-white" />
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <button @click="updateProfile" class="bg-orange-600 p-2 rounded-lg w-full text-center text-white hover:bg-orange-700 transition duration-300 ease-in-out">
            Save Changes
          </button>
        </div>
      </div>
      <div v-else class="text-center text-white col-span-4 mt-6">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import UserNav from '../Bars/UserNav.vue';
import UserSidebar from '../Bars/UserSidebar.vue';

const router = useRouter();
const route = useRoute();
const profile = ref(null);
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const fetchUserProfile = async () => {
  const userId = user?.id || route.params.id;
  try {
    const response = await axios.get(`http://localhost:3001/api/user/profile/${userId}`);
    profile.value = response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

const updateProfile = async () => {
  try {
    const formData = new FormData();
    const userId = user?.id || route.params.id;
    Object.keys(profile.value).forEach((key) => {
      formData.append(key, profile.value[key]);
    });

    await axios.put(`http://localhost:3001/api/user/profile/${userId}`, formData, {
      full_name: profile.value.full_name,
      bio: profile.value.bio,
      contact_info: profile.value.contact_info,
      language_preference: profile.value.language_preference,
      e_portfolio: profile.value.e_portfolio,
      

    });

    router.push(`/profile`);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    profile.value.profile_picture = URL.createObjectURL(file);
    profile.value.profile_picture_file = file;
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
/* Additional styling if needed */
</style>

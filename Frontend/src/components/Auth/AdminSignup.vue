<template>
  <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
          <LandingNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
          <img src="../../assets/Seek2_transp_white.png" alt="Seek2 Logo" class="h-20">
          <h2 class="text-white text-2xl font-bold">Create a new Account</h2>
          <section class="text-white p-8 flex justify-center w-full">
              <div class="w-1/2">
                  <form @submit.prevent="registerUser" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
                      <div class="mb-4">
                          <label for="username" class="block text-white text-sm font-medium mb-2">Username</label>
                          <input v-model="username" type="text" name="username" id="username" placeholder="Username" class="w-full p-2 text-white bg-neutral-700 rounded-md">
                      </div>
                      <div class="mb-4">
                          <label for="email" class="block text-white text-sm font-medium mb-2">Email</label>
                          <input v-model="email" type="email" name="email" id="email" placeholder="Email" class="w-full p-2 text-white bg-neutral-700 rounded-md">
                      </div>
                      <div class="mb-4">
                          <label for="role" class="block text-white text-sm font-medium mb-2">Role</label>
                          <select v-model="role" name="role" id="role" class="w-full p-2 text-white bg-neutral-700 rounded-md">
                              <option value="TA">TA</option>
                              <option value="Instructor">Instructor</option>
                              <option value="Admin">Admin</option>
                          </select>
                      </div>
                      <div class="mb-4">
                          <label for="password" class="block text-white text-sm font-medium mb-2">Password</label>
                          <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="w-full p-2 text-white bg-neutral-700 rounded-md">
                      </div>
                      <div class="flex justify-between mb-4">
                          <div class="flex items-center">
                              <input v-model="remember" type="checkbox" name="remember" id="remember" class="mr-2">
                              <label for="remember" class="text-white text-sm font-medium">Remember me</label>
                          </div>
                          <div>
                              <a href="/login" class="text-white text-sm font-medium hover:text-orange-500 transition duration-300 ease-in-out">Already have an account?</a>
                          </div>
                      </div>
                      <button type="submit" class="w-full p-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition duration-300 ease-in-out">Sign Up</button>
                  </form>
              </div>
          </section>
      </main>
      <footer class="w-full bg-neutral-900">
          <LandingFooter />
      </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LandingNav from '../Bars/LandingNav.vue';
import LandingFooter from '../Bars/LandingFooter.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form fields
const username = ref('');
const email = ref('');
const password = ref('');
const remember = ref(false);
const role = ref('');

const registerUser = async () => {
try {
  const response = await axios.post('http://localhost:3001/api/auth/register', {
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 201) {
    // Redirect to dashboard on successful registration
    router.push('/login');
  } else {
    console.error('Registration failed:', response.data.message);
  }
} catch (error) {
  console.error('Registration failed:', error);
}
};
</script>

<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <LandingNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
        <!-- Add your main content here -->
        <img src="../../assets/Seek2_transp_white.png" alt="Seek2 Logo" class="h-20">
        <h2 class="text-white text-2xl font-bold">Log In to your account</h2>
        <section class="text-white p-8 flex justify-center w-full">
          <div class="w-1/2">
            <form @submit.prevent="loginUser" class="bg-neutral-600 rounded-lg p-8 shadow-md mb-20">
              <div class="mb-4">
                <label for="email" class="block text-white text-sm font-medium mb-2">Email</label>
                <input type="email" v-model="email" id="email" placeholder="Email" class="w-full p-2 text-white bg-neutral-700 rounded-md">
              </div>
              <div class="mb-4">
                <label for="password" class="block text-white text-sm font-medium mb-2">Password</label>
                <input type="password" v-model="password" id="password" placeholder="Password" class="w-full p-2 text-white bg-neutral-700 rounded-md">
              </div>
              <div class="flex justify-left mb-4">
                <input type="checkbox" v-model="remember" id="remember" class="mr-2">
                <label for="remember" class="text-white text-sm font-medium">Remember me</label>
              </div>
              <div class="flex justify-between mb-4">
                <a href="/forgotPassword" class="text-white text-sm font-medium hover:text-orange-500 transition duration-300 ease-in-out">Forgot Password?</a>
                <a href="/signup" class="text-white text-sm font-medium hover:text-orange-500 transition duration-300 ease-in-out">Don't have an account?</a>
              </div>
              <button type="submit" class="w-full p-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition duration-300 ease-in-out">Log In</button>
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
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  import LandingNav from '../Bars/LandingNav.vue';
  import LandingFooter from '../Bars/LandingFooter.vue';
  
  // Initialize the router
  const router = useRouter();
  
  // Define form data refs
  const email = ref('');
  const password = ref('');
  const remember = ref(false);
  
  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: email.value,
        password: password.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Redirect to dashboard on successful login

        if (response.data.user.role === 'Admin') {
          router.push('/admin/dashboard');
        } else if (response.data.user.role === 'Instructor') {
          router.push('/admin/dashboard');
        } else if (response.data.user.role === 'TA') {
          router.push('/admin/dashboard');
        } else {
            console.log(response.data.user.role);
            router.push('/dashboard');
        }
        


        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  </script>
  
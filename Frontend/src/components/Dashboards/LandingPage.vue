
<template>
    <div class="bg-neutral-800 min-h-screen flex flex-col">
      <header class="bg-neutral-900 top-0 w-full z-50">
        <LandingNav />
      </header>
      <main class="flex-grow pt-16 flex flex-col items-center justify-center">
      <!-- Add your main content here -->
      <section class="text-white p-8 flex justify-between w-full">
        <div class="w-1/2">
          <div class="text-left p-12">
            <h1 class="text-5xl font-bold">Welcome to Seek<sup>2</sup></h1>
            <p class="text-lg mt-4">Empowering your learning journey with Generative AI.</p>
            <a href ="/signup">
            <button class="border-2 border-white text-white px-4 py-2 mt-4 rounded-md hover:bg-white hover:text-neutral-900 w-64 h-12 hover:shadow-lg transition duration-300 ease-in-out">Get Started</button>
            </a>
          </div>
        </div>
        <div class="w-1/2 flex justify-center">
          <LottieAnimation :animationData="animationData" />
        </div>
      </section>
      <!-- <hr class="w-3/4 border-neutral-700 border-2 my-8" />
      <section class="text-white pl-20 w-full">
        <div class="flex justify-left">
          <h1 class="text-5xl font-bold">How it works</h1>
        </div>
        <p class="text-lg text-left mt-4">Our platform uses Generative AI to help you learn more effectively.</p>
      </section> -->
    </main>
      <footer class="w-full bg-neutral-900">
        <LandingFooter />
      </footer>
    </div>
  </template>


<script setup>
import LandingNav from '../Bars/LandingNav.vue'
import LandingFooter from '../Bars/LandingFooter.vue'
import LottieAnimation from '../LottieAnimation.vue';
import animationData from '../../assets/Animation.json';



</script>
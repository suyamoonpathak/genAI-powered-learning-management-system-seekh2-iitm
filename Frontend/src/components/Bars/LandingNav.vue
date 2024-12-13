
<template>

<nav class="flex justify-between p-6 px-4 top-0 left-0 w-full bg-neutral-900 shadow-lg">
  <div class="flex justify-between items-center w-full">
      <div class="xl:w-1/4">
          <a class="flex items-center max-w-max ml-8" href="/">
              <img src="../../assets/Seek2_transp_white.png" alt="Seek2 Logo" class="h-12">
              <span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white pl-2">Seek<sup>2</sup></span>
          </a>
      </div>
      <div class="hidden xl:block xl:w-2/4">
          <ul class="flex justify-center space-x-8">
              <li><a class="text-gray-300 hover:text-gray-100 font-medium" href="#">About Us</a></li>
              <!-- Add more nav items here if needed -->
          </ul>
      </div>
      <div class="hidden xl:block xl:w-1/4">
          <div class="flex items-center justify-end">
              <a class="inline-block py-2 px-4 mr-2 leading-5 text-gray-300 hover:text-gray-100 bg-transparent font-medium rounded-md" href="/login">Log In</a>
              <a class="inline-block py-2 px-4 text-sm leading-5 bg-orange-600 text-gray-50 hover:shadow-lg hover:bg-orange-700 hover:text-gray-50 font-medium focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md transition duration-300 ease-in-out" href="/signup">Sign Up</a>
          </div>
      </div>
  </div>
</nav>


</template>


<script>




export default {
  name: 'LandingNav',
}

</script>

<style scoped>

/* Add your CSS here */


</style>
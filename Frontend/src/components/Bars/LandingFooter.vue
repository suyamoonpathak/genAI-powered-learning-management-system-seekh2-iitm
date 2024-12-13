
<template>
    <!-- Footer -->
<footer class="p-6 px-4 bottom-0 left-0 bg-neutral-900 shadow-lg">
  <div class="container mx-auto flex flex-wrap justify-between items-center">
    <!-- Footer Logo and Description -->
    <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
      <a href="/" class="flex justify-center items-center text-gray-300">
        <img src="../../assets/Seek2.png" alt="Stolen Logo" class="h-12">
        <span class="text-2xl font-extrabold pl-2">Seek<sup>2</sup></span>
      </a>
      <p class="mt-4 text-gray-400">Empowering your learning journey with Generative AI.</p>
    </div>

    <!-- Footer Links -->
    <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
      <h3 class="text-gray-100 font-bold mb-2">Quick Links</h3>
      <ul>
        <li><a href="#" class="hover:text-gray-100">Home</a></li>
        <li><a href="#" class="hover:text-gray-100">About Us</a></li>
        <li><a href="#" class="hover:text-gray-100">Courses</a></li>
        <li><a href="http://localhost:5173/admin/Signup" class="hover:text-gray-100">Admin Signup</a></li>
      </ul>
    </div>

    <!-- Footer Social Links -->
    <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
      <h3 class="text-gray-100 font-bold mb-2">Follow Us</h3>
      <ul class="flex space-x-4">
        <li><a href="#" class="hover:text-gray-100">Twitter</a></li>
        <li><a href="#" class="hover:text-gray-100">LinkedIn</a></li>
        <li><a href="#" class="hover:text-gray-100">Facebook</a></li>
        <li><a href="#" class="hover:text-gray-100">Instagram</a></li>
      </ul>
    </div>

    <!-- Footer Contact Info -->
    <div class="w-full sm:w-1/2 lg:w-1/4">
      <h3 class="text-gray-100 font-bold mb-2">Contact Us</h3>
      <p class="text-gray-400">Email: support@seek2.com</p>
      <p class="text-gray-400">Phone: +1 234 567 890</p>
    </div>
  </div>

  <div class="container mx-auto text-center mt-6 border-t border-gray-700 pt-4">
    <p class="text-gray-500">&copy; 2024 Seek<sup>2</sup>. All rights reserved.</p>
  </div>
</footer>

</template>

<script>

export default {
    name: 'LandingFooter',
}

</script>

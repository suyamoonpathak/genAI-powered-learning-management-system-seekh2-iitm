<template>
  <div>
    <CourseNav :course_name="courseName" />
    <div class="flex">
      <CourseSidebar />
      <main class="flex-grow flex mx-auto text-left">
        <!-- Left Side: PythonWeeks -->
        <div>
          <PythonWeeks />
        </div>
        
        <!-- Right Side: LecturePage will render here -->
        <div class="items-center w-full justify-center">
          <router-view />
        </div>
      </main>
      <!-- Add and Edit buttons -->
      <button
        v-if="isAdmin"
        @click="openModal2"
        class="bg-orange-600 text-white w-12 h-12 fixed bottom-5 right-5 p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button
        v-if="isAdmin"
        @click="openModal"
        class="bg-orange-600 text-white w-12 h-12 fixed bottom-20 right-5 p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <!-- Add Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-white text-xl font-bold mb-4">Add New</h2>
        <hr class="border-neutral-700 mb-4" />
        <ul>
          <li @click="navigateTo('Module', 'Add')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Module
          </li>
          <li @click="navigateTo('Lesson', 'Add')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Lesson
          </li>
          <li @click="navigateTo('Assignment', 'Add')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Assignment
          </li>
          <li @click="navigateTo('ProgrammingAssignment', 'Add')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Programming Assignment
          </li>
        </ul>
        <button
          @click="closeModal"
          class="mt-4 bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal2" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-white text-xl font-bold mb-4">Edit Existing</h2>
        <hr class="border-neutral-700 mb-4" />
        <ul>
          <li @click="navigateTo('Module', 'Edit')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Module
          </li>
          <li @click="navigateTo('Lesson', 'Edit')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Lesson
          </li>
          <li @click="navigateTo('Assignment', 'Edit')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Assignment
          </li>
          <li @click="navigateTo('ProgrammingAssignment', 'Edit')" class="text-white py-2 px-4 hover:bg-neutral-700 rounded-lg cursor-pointer">
            Programming Assignment
          </li>
        </ul>
        <button
          @click="closeModal2"
          class="mt-4 bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import CourseNav from '../Bars/CourseNav.vue'
import CourseSidebar from '../Bars/CourseSidebar.vue'
import PythonWeeks from './PythonWeeks.vue'
import { ref, inject } from 'vue'

// Get course name from the route
const route = useRoute()
const router = useRouter()
const courseName = ref(route.params.course_name)

// Selected content (e.g., for routing purposes)
const selectedContent = inject('selectedContent', ref({ type: '', title: '', id: '' })) // Provide a default value
console.log(selectedContent)

// Modal visibility states
const showModal = ref(false)
const showModal2 = ref(false)

// Open and close functions for modals
const openModal = () => {
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}

const openModal2 = () => {
  showModal2.value = true
}
const closeModal2 = () => {
  showModal2.value = false
}

// Check the user's role from localStorage
const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : 'Student'
const isAdmin = ref(userRole === 'Admin') // Set the role check

// Navigate to different pages based on user choice (Add or Edit)
const navigateTo = (type, action) => {
  const baseRoute = `/admin/${action}${type}/${courseName.value}`
  closeModal()
  closeModal2()
  if (type === 'Module') {
    router.push(`${baseRoute}`)
  } else if (type === 'Lesson') {
    router.push(`${baseRoute}/Lesson`)
  } else if (type === 'Assignment') {
    router.push(`${baseRoute}/Assignment`)
  } else if (type === 'ProgrammingAssignment') {
    router.push(`${baseRoute}/ProgrammingAssignment`)
  }
}
</script>

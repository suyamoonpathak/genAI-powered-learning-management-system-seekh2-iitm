<template>
    <div>
        <UserNav />
        <div class="flex">
            <UserSidebar />
            <main class="flex-grow mx-auto px-6 py-10 text-left">
                <h2 class="text-2xl font-bold mb-6">Hi, {{ user.username }}</h2>
                <div class="flex flex-col md:flex-row md:space-x-8">
                    <div class="w-full md:w-2/3">
                        <a href = "/courses/Python Programming">
                        <div class="bg-neutral-700 h-52 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-lg hover:bg-neutral-600 transition duration-500 ease-in-out mb-8">
                            <div>
                                <h2 class="text-2xl font-bold text-white m-4 ml-0">Python Programming</h2>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div class="w-full md:w-1/3 bg-neutral-800 p-4 rounded-lg shadow-lg">
                        <h2 class="text-2xl font-bold text-white mb-4">Schedule</h2>
                        <hr class="border-1 border-neutral-700 my-4">
                        <div class="flex justify-center items-center">
                            <VCalendar transparent borderless :is-dark="isDark" title-position="left" expanded :color="selectedColor" :attributes='attrs' />
                        </div>
                        <hr class="border-1 border-neutral-700 my-4">
                        <div class="flex justify-center items-center">
                            <a href="/schedule" class="bg-orange-600 text-white w-full p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">
                                <button >Add Event</button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import UserNav from '../Bars/UserNav.vue'
import UserSidebar from '../Bars/UserSidebar.vue'
import { ref } from 'vue';



const isDark = ref(true);
const selectedColor = ref('orange');
const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
]);

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


</script>

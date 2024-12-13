<template>
    <div>
    <UserNav />
        <div class="flex">
            <UserSidebar />
            <main class="flex-grow mx-auto px-6 py-10 text-left">
                <h2 class="text-2xl font-bold mb-6">Latest Updates</h2>
            </main>
        </div>
    </div>
</template>

<script setup>
import UserNav from '../Bars/UserNav.vue'
import UserSidebar from '../Bars/UserSidebar.vue'
</script>


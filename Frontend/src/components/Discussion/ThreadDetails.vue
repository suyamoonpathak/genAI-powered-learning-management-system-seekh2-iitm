<template>
  <div>
    <UserNav />
    <div class="flex">
      <UserSidebar />
      <div class="flex-1 text-left p-6 bg-neutral-800 text-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">{{ thread.topic }}</h2>
        <p class="text-lg mb-4">{{ thread.content }}</p>

        <!-- Posts List -->
        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-4">Posts</h3>
          <div v-if="posts.length === 0" class="text-gray-400">No posts yet.</div>
          <div v-for="post in posts" :key="post.id" class="bg-neutral-700 p-4 mb-4 rounded-lg shadow-md">
            <p class="text-sm text-gray-300"> {{ authors[post.author_id] || 'Unknown' }} {{ post.created_at }}</p>
            <p class="text-lg">{{ post.content }}</p>
          </div>
        </div>

        <!-- Create Post Form -->
        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-4">Create a Post</h3>
          <textarea v-model="newPostContent" class="w-full p-2 mb-4 border rounded-lg" rows="4" placeholder="Write your post here..."></textarea>
          <button @click="createPost" class="bg-orange-500 text-white p-2 rounded-lg">Create Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import UserNav from '../Bars/UserNav.vue';
import UserSidebar from '../Bars/UserSidebar.vue';

const thread = ref({});
const posts = ref([]);
const newPostContent = ref('');
const route = useRoute();
const threadId = route.params.threadId;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const authors = ref({}); // Object to map author IDs to names

const fetchThreadDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/discussionthreads/${threadId}`);
    thread.value = response.data;
  } catch (error) {
    console.error('Error fetching thread details:', error);
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/discussionthreads/${threadId}/posts`);
    posts.value = response.data;
    // Fetch author names for each post
    const authorIds = [...new Set(posts.value.map(post => post.author_id))];
    await Promise.all(authorIds.map(fetchAuthorName));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const fetchAuthorName = async (authorId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/user/profile/${authorId}`);
    authors.value[authorId] = response.data.username;
    console.log('Fetched author name:', authors);
  } catch (error) {
    console.error('Error fetching author name:', error);
  }
};

const createPost = async () => {
  try {
    const postData = {
      author_id: user.id,
      content: newPostContent.value,
      created_at: new Date().toISOString(),
    };
    await axios.post(`http://localhost:3001/api/discussionthreads/${threadId}/posts`, postData);
    newPostContent.value = ''; // Clear the textarea
    fetchPosts(); // Refresh posts list
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

// Fetch thread details and posts when the component is mounted
onMounted(() => {
  fetchThreadDetails();
  fetchPosts();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>

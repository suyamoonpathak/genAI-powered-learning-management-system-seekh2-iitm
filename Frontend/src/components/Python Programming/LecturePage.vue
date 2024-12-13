<template>
  <div class="p-5">
    <!-- Video Section -->
     <h2 class="text-2xl font-bold text-white mb-4">{{ lectureData.lesson_name }}</h2>
    <div class="video-section bg-neutral-900 rounded-lg p-4">
      <!-- This section will be used to display the video/lecture content -->
      <iframe
        v-if="lectureData.video_url"
        :src="getYouTubeEmbedUrl(lectureData.video_url)"
        class="w-full h-96"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Details Section -->
    <div class="details-section mt-5">
      <div class="flex justify-between items-center mb-4">
        <!-- Action Buttons -->
        <div class="flex space-x-4">
          <button  
            @click="selectTab('content')"
            :class="getTabClass('content')"
          >
            Content
          </button>
          <button 
            @click="selectTab('transcript')"
            :class="getTabClass('transcript')"
          >
            Transcript
          </button>
          <button  
            @click="selectTab('summary')"
            :class="getTabClass('summary')"
          >
            <i class="fa-solid fa-wand-magic-sparkles"></i> Summary
          </button>
          <a href="/chatbot">
            <button class="bg-orange-600 text-white w-40 h-12 bottom-5 right-5 p-2 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">
              <i class="fa-regular fa-pen-to-square"></i> New Chat
            </button>
          </a>
        </div>
      </div>

      <!-- Content Display -->
      <div class="content bg-neutral-700 p-4 rounded-lg">
        <p v-if="selectedTab === 'content'">
          {{ lectureData.content }}
        </p>
        <p class="max-w-5xl" v-if="selectedTab === 'transcript'">
          {{ lectureData.transcript }}
        </p>
        <div v-if="selectedTab === 'summary'" v-html="parsedSummary"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { marked } from 'marked';

const route = useRoute();
const lessonId = ref(route.params.lecture_id);

// Initialize the lectureData with expected structure
const lectureData = ref({
  lesson_id: '',
  lesson_name: '',
  video_url: '',
  content: '',
  summary: '',
  transcript: '',
});

const selectedTab = ref('content');

// Computed property to parse the summary as HTML
const parsedSummary = computed(() => {
  return marked(lectureData.value.summary || '');
});

// Function to select tab
const selectTab = (tab) => {
  selectedTab.value = tab;
};

// Function to get the class for a tab button
const getTabClass = (tab) => {
  return selectedTab.value === tab
    ? 'bg-neutral-500 text-white px-4 py-2 rounded-lg cursor-pointer'
    : 'bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-600';
};

// Convert a YouTube URL to an embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) {
    console.error('URL is undefined');
    return ''; // Return an empty string or some default URL
  }

  const videoId = url.split('.be/')[1];
  if (!videoId) {
    console.error('Video ID not found');
    return ''; // Return an empty string if videoId is not found
  }

  const ampersandPosition = videoId.indexOf('&');
  if (ampersandPosition !== -1) {
    return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

console.log('Lesson IDD:', lessonId.value);

// Function to fetch the lecture data
const fetchLectureData = async () => {
  if (lessonId.value) {
    try {
      const response = await axios.get(`http://localhost:3001/api/lessons/${lessonId.value}`);
      lectureData.value = response.data;
      console.log('Lecture data:', lectureData.value);
    } catch (error) {
      console.error('Error fetching lecture data:', error);
    }
  } else {
    console.error('Lesson ID is undefined');
  }
};

watch(
  () => route.params.lecture_id,
  (newLectureId) => {
    lessonId.value = newLectureId;
    fetchLectureData();
  }
);

onMounted(() => {
  fetchLectureData();
});
</script>


<style scoped>
iframe {
  border: none;
  width: 100%;
  height: 100%;
}
.video-section {
  display: flex;
  justify-content: center;
  width: 1060px;
  height: 600px;
  align-items: center;
}

</style>
<template>
  <div class="p-5 w-full bg-neutral-800 min-h-screen">
    <!-- Assignment Details Section -->
    <h2 class="text-2xl font-bold text-white mb-4">{{ assignmentData.title }}</h2>
    <div class="assignment-section bg-neutral-900 rounded-lg p-4">
      <!-- Display the assignment description as a heading -->
      <h3 class="text-xl font-semibold text-white mb-4">Question</h3>
      <div v-html="parsedDescription" class="text-white"></div>
    </div>

    <!-- Answer Submission Section -->
    <div class="answer-section mt-5">
      <h3 class="text-lg font-bold text-white mb-4">Your Answer</h3>
      <textarea
        v-model="studentAnswer"
        placeholder="Type your answer here..."
        class="w-full h-48 p-4 text-white bg-neutral-700 rounded-md resize-y"
      ></textarea>
      <button
        @click="submitAnswer"
        class="mt-4 bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 transition duration-300 ease-in-out"
      >
        Submit Answer
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { marked } from 'marked';

const route = useRoute();
const assignmentId = ref(route.params.assignment_id);

const assignmentData = ref({
  title: '',
  description: ''
});

const studentAnswer = ref('');

// Computed property to parse the description as HTML
const parsedDescription = computed(() => {
  return marked(assignmentData.value.description || '');
});

const fetchAssignmentData = async () => {
  if (assignmentId.value) {
    try {
      const response = await axios.get(`http://localhost:3001/api/assignments/${assignmentId.value}`);
      assignmentData.value = response.data;
    } catch (error) {
      console.error('Error fetching assignment data:', error);
    }
  } else {
    console.error('Assignment ID is undefined');
  }
};

const submitAnswer = async () => {
  try {
    alert('Your answer has been submitted successfully!');
    studentAnswer.value = ''; // Clear the textarea after submission
  //   await axios.post(`http://localhost:3001/api/assignments/${assignmentId.value}/submissions`, {
  //     answer: studentAnswer.value
  //   });
  //   alert('Your answer has been submitted successfully!');
  //   studentAnswer.value = ''; // Clear the textarea after submission
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
};

onMounted(() => {
  fetchAssignmentData();
});
</script>


<style scoped>
textarea {
  border: none;
  width: 100%;
}
.assignment-section, .answer-section {
  padding: 16px;
  border-radius: 8px;
}
</style>

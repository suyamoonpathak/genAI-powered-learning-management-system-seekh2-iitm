<template>
  <div class="max-w-80 min-w-80 align-baseline bg-neutral-900 p-5 min-h-full">
    <ul>
      <li v-for="(module, index) in modules" :key="module.module_id" class="mb-4">
        <button @click="toggleModule(index)" class="w-full p-3 text-left text-white font-bold bg-neutral-800 hover:bg-neutral-700 rounded-md">
          {{ module.module_name }}
          <i :class="{'fa-chevron-down': !module.open, 'fa-chevron-up': module.open}" class="fas pl-5 float-right"></i>
        </button>
        <ul v-if="module.open" class="mt-2 pl-4">
          <li v-if="module.loading" class="text-neutral-300">Loading content...</li>
          
          <!-- Lessons -->
          <li v-for="(lesson, i) in module.lessons" :key="'lesson-' + i" class="mb-2 text-neutral-300 cursor-pointer hover:text-white">
            <router-link :to="{ name: 'LecturePage', params: { course_name: 'Python Programming', lecture_id: lesson.lesson_id } }">
              <i class="fa fa-video mr-2"></i>{{ lesson.lesson_name }}
            </router-link>
          </li>
          
          <!-- Assignments -->
          <li v-for="(assignment, i) in module.assignments" :key="'assignment-' + i" class="mb-2 text-neutral-300 cursor-pointer hover:text-white">
            <router-link :to="{ name: 'AssignmentPage', params: { course_name: 'Python Programming', assignment_id: assignment.assignment_id } }">
              <i class="fa fa-book mr-2"></i>{{ assignment.title }}
            </router-link>
          </li>
          
          <!-- Programming Assignments -->
          <li v-for="(progAssignment, i) in module.programmingAssignments" :key="'prog-assignment-' + i" class="mb-2 text-neutral-300 cursor-pointer hover:text-white">
            <router-link :to="{ name: 'ProgrammingAssignmentPage', params: { course_name: 'Python Programming', assignment_id: progAssignment.assignment_id } }">
              <i class="fa fa-code mr-2"></i>{{ progAssignment.assignment_name }}
            </router-link>
          </li>
          
          <li v-if="!module.loading && module.lessons.length === 0 && module.assignments.length === 0 && module.programmingAssignments.length === 0" class="text-neutral-300">No content available</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const modules = ref([]);

const fetchModules = async () => {
  console.log('Fetching modules...');
  try {
    const response = await axios.get('http://localhost:3001/api/courses/2/modules');
    modules.value = response.data.map((module) => ({
      ...module,
      open: false,
      lessons: [],
      assignments: [],
      programmingAssignments: [],
      loading: false,
    })).sort((a, b) => a.module_id - b.module_id);
  } catch (error) {
    console.error('Failed to fetch modules:', error);
  }
};

const toggleModule = async (index) => {
  const module = modules.value[index];
  module.open = !module.open;
  if (module.open && !module.lessons.length && !module.assignments.length && !module.programmingAssignments.length) {
    await fetchModuleContent(module.module_id, index);
  }
};

const fetchModuleContent = async (module_id, index) => {
  const module = modules.value[index];
  module.loading = true;
  try {
    const [lessonsResponse, assignmentsResponse, programmingAssignmentsResponse] = await Promise.allSettled([
      axios.get(`http://localhost:3001/api/modules/${module_id}/lessons`),
      axios.get(`http://localhost:3001/api/courses/${module_id}/assignments`),
      axios.get(`http://localhost:3001/api/modules/${module_id}/programmingassignments`)
    ]);

    module.lessons = lessonsResponse.status === 'fulfilled' ? lessonsResponse.value.data.sort((a, b) => a.lesson_id - b.lesson_id) : [];
    module.assignments = assignmentsResponse.status === 'fulfilled' ? assignmentsResponse.value.data.sort((a, b) => a.assignment_id - b.assignment_id) : [];
    module.programmingAssignments = programmingAssignmentsResponse.status === 'fulfilled' ? programmingAssignmentsResponse.value.data.sort((a, b) => a.assignment_id - b.assignment_id) : [];
  } catch (error) {
    console.error('Failed to fetch module content:', error);
  } finally {
    module.loading = false;
  }
};

onMounted(fetchModules);
</script>

<style scoped>
.fas {
  transition: transform 0.5s;
}
</style>

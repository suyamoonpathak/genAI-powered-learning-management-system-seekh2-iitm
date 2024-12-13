<template>
  <div class="h-screen flex flex-col bg-neutral-100">
    <UserNav />
    <main class="flex-1 flex overflow-hidden">
      <CourseSidebar />
      <div class="flex-1 flex flex-col">
        <div class="bg-neutral-800 p-2 pb-0 shadow-md">
          <h2 class="text-white font-bold text-lg">Talk to Seeko</h2>
        </div>
        <div class="flex-1 overflow-hidden flex flex-col-reverse p-4 bg-neutral-800" ref="chatContainer">
          <div class="overflow-y-auto max-w-3xl pb-12 mx-auto w-full scrollbar-hide">
            <div v-for="(message, index) in chatHistory" :key="index" class="mb-4 flex items-start" :class="{'justify-end': message.type === 'user'}">
              <div v-if="message.type === 'bot'" class="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center mr-2">
                <i class="fas fa-robot text-white"></i>
              </div>
              <div :class="{
                'bg-orange-500 text-white rounded-lg py-2 px-4 max-w-[70%]': message.type === 'user',
                'bg-neutral-700 text-neutral-200 rounded-lg py-2 px-4 max-w-[70%] shadow': message.type === 'bot'
              }">
                <p class="whitespace-pre-wrap break-words text-left" v-html="parseMarkdown(message.content || '')"></p>
              </div>
              <div v-if="message.type === 'user'" class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center ml-2">
                <i class="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed bottom-0 w-full p-4 flex items-center justify-center">
          <form @submit.prevent="submitSearch" class="relative flex w-full items-center space-x-2 max-w-3xl mx-auto">
            <i class="fa-solid fa-feather absolute left-7 text-gray-400"></i>
            <input
              v-model="message"
              type="text"
              placeholder="Type your message..."
              class="flex-1 rounded-full p-3 pl-12 bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              class="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out"
            >
              <i class="fa-solid fa-paper-plane text-md"></i>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import UserNav from '../Bars/UserNav.vue'
import CourseSidebar from '../Bars/CourseSidebar.vue'
import { marked } from 'marked'

const message = ref('')
const chatHistory = ref([])
const chatContainer = ref(null)

const fetchChatHistory = () => {
  const storedHistory = sessionStorage.getItem('chatHistory')
  if (storedHistory) {
    chatHistory.value = JSON.parse(storedHistory)
  }
}

const saveChatHistory = () => {
  sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory.value))
}

const submitSearch = async () => {
  if (message.value.trim() === '') return

  chatHistory.value.push({ type: 'user', content: message.value })
  saveChatHistory()
  message.value = ''

  try {
    const response = await axios.post('http://localhost:5000/ask', {
      chatHistory: chatHistory.value,
      question: message.value
    })
    const botReply = response.data.response

    chatHistory.value.push({ type: 'bot', content: botReply })
    saveChatHistory()

  } catch (error) {
    console.error('Error sending message:', error)
  }
}

watch(chatHistory, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

onMounted(fetchChatHistory)

const parseMarkdown = (content) => {
  return content ? marked(content) : ''
}
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>
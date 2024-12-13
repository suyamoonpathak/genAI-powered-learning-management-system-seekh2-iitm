import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/index.css'
import router from './router';


const app = createApp(App);

app.use(router);

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin with optional defaults
app.use(VCalendar, {})

app.mount('#app');

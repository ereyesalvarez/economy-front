import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import {Chart, DoughnutController, ArcElement, Tooltip, BarController, CategoryScale, LinearScale, BarElement, LogarithmicScale} from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip, BarController, CategoryScale, LinearScale, BarElement, LogarithmicScale);

createApp(App).use(store).use(router).mount('#app')

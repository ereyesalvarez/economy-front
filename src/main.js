import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip);

createApp(App).use(store).use(router).mount('#app')

import Maska from 'maska'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
import App from './App.vue'

createApp(App).use(ElementPlus).use(Maska).use(store).use(router).mount('#app')

// {
//    'Финансовый директор',
//    'ГД',
//    'Зам. ГД по развитию',
//    'Начальник ПКО',
//    'Инженеры ПКО': {
//       'Агент или подрядчик',
//       'Главный инженер - энергетик',
//       'Юрист внеш. коммуник',
//       'Тех служба',
//       'Геодезист'
//    },
//    'ЮРИСТ ДРУГОЙ',
//    'Подрядчик',
//    'Логист',
// }

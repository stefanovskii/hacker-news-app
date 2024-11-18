import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import './registerServiceWorker'
import ItemDetailsComponent from './components/ItemDetailsComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'


library.add(faSearch, faFireFlameCurved, faNewspaper);

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: HomePage, name: 'HomePage' },
      { path: '/items/:id', component: ItemDetailsComponent, name: 'ItemDetailsComponent', props: true }
    ]
  });
  

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)

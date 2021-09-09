import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import axios from 'axios'
axios.defaults.baseURL = 'http://103.81.195.130:8080/opencode/op-api/api/';
//axios.defaults.baseURL = 'http://103.81.194.212/myapp/api/';
//axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.getItem('myapptoken')}`;
  

const app=createApp(App)
app.use(router);
app.mount('#app');
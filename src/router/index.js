import { createRouter, createWebHistory } from "vue-router"

import axios from 'axios'

axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.getItem('myapptoken')}`;
    
const routes =[
    {
        path: '/',
        name: 'user.login',
        component: () => import("../views/Login.vue")
    },   
    {
        path: '/opencode',
        name: 'opencode.index',
        component: () => import("../views/Opencode.vue")
    },
    {
        path: '/profile',
        name: 'user.profile',
        component: () => import("../views/Register.vue")
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
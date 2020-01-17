import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const constantRoutes = [
    {
        path: '/',
        component: () => import('./views/Home.vue'),
        name: 'home',
    },
    {
        path: '/employes',
        component: () => import('./views/Employes.vue'),
        name: 'employes',
    },
    {
        path: '/employes/:slug/',
        component: () => import('./views/Employes.vue'),
        name: 'employes-department',
    },
    {
        path: '/404',
        component: () => import('./views/404.vue'),
        name: '404',
    },
    {
        path: '*',
        redirect: '/404'
    },
];

const createRouter = () => new Router({
    mode: 'history',
    routes: constantRoutes,
});

const router = createRouter();

export default router;

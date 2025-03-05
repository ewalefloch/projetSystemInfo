import { createRouter, createWebHistory } from 'vue-router';
import ManagerList from '../components/ManagerList.vue';
import ManagerDetails from '../components/ManagerDetails.vue';
import ManagerForm from '../components/ManagerForm.vue';

const routes = [
    { path: '/managers', component: ManagerList },
    { path: '/managers/new', component: ManagerForm },
    { path: '/managers/:id', component: ManagerDetails },
    { path: '/managers/edit/:id', component: ManagerForm }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import ManagerList from '../components/manager/ManagerList.vue';
import ManagerDetails from '../components/manager/ManagerDetails.vue';
import ManagerForm from '../components/manager/ManagerForm.vue';
import TeachingUnitsList from "@/components/formations/TeachingUnitsList.vue";
import GroupsList from "@/components/formations/GroupsList.vue";
import AcademicYearsList from "@/components/formations/AcademicYearsList.vue";
import AcademicYearForm from "@/components/formations/AcademicYearForm.vue";
import AcademicYearDetail from "@/components/formations/AcademicYearDetail.vue";

const routes = [
    { path: '/managers', component: ManagerList },
    { path: '/managers/new', component: ManagerForm },
    { path: '/managers/:id', component: ManagerDetails },
    { path: '/managers/edit/:id', component: ManagerForm },
    { path: '/academicyears', name: 'AcademicYearsList', component: AcademicYearsList },
    { path: '/academicyears/new', name: 'AcademicYearForm', component: AcademicYearForm },
    { path: '/academicyears/:id', name: 'AcademicYearDetail', component: AcademicYearDetail, props: true },
    { path: '/groups', name: 'GroupsList', component: GroupsList },
    { path: '/teachingunits', name: 'TeachingUnitsList', component: TeachingUnitsList },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

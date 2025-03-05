import { createRouter, createWebHistory } from 'vue-router';
import ManagerList from '../components/manager/ManagerList.vue';
import ManagerDetails from '../components/manager/ManagerDetails.vue';
import ManagerForm from '../components/manager/ManagerForm.vue';
import TeachingUnitsList from "@/components/formations/TeachingUnitsList.vue";
import GroupsList from "@/components/formations/GroupsList.vue";
import AcademicYearsList from "@/components/formations/AcademicYearsList.vue";
import AcademicYearForm from "@/components/formations/AcademicYearForm.vue";
import AcademicYearDetail from "@/components/formations/AcademicYearDetail.vue";
import GroupsListFormation from "@/components/formations/GroupsListFormation.vue";
import UeFormation from "@/components/formations/UeFormation.vue";
import GroupsForm from "@/components/formations/GroupsForm.vue";
import GroupsDetail from "@/components/formations/GroupsDetail.vue";
import TeachingUnitsForm from "@/components/formations/TeachingUnitsForm.vue";
import TeachingUnitsDetail from "@/components/formations/TeachingUnitsDetail.vue";

const routes = [
    { path: '/managers', component: ManagerList },
    { path: '/managers/new', component: ManagerForm },
    { path: '/managers/:id', component: ManagerDetails },
    { path: '/managers/edit/:id', component: ManagerForm },
    { path: '/academicyears', name: 'AcademicYearsList', component: AcademicYearsList },
    { path: '/academicyears/new', name: 'AcademicYearForm', component: AcademicYearForm },
    { path: '/academicyears/:id', name: 'AcademicYearDetail', component: AcademicYearDetail, props: true },
    { path: '/groups', name: 'GroupsList', component: GroupsList },
    { path: '/groups/new', name: 'GroupsForm', component: GroupsForm },
    { path: '/groups/:id', name: 'GroupsDetail', component: GroupsDetail },
    { path: '/teachingunits', name: 'TeachingUnitsList', component: TeachingUnitsList },
    { path: '/academicyears/:id/groups', name: 'GroupsListFormation', component: GroupsListFormation },
    { path: '/academicyears/:id/teachingunits', name: 'UeFormation', component: UeFormation },
    { path: '/teachingunits/new', name: 'TeachingUnitsForm', component: TeachingUnitsForm },
    { path: '/teachingunits/:id', name: 'TeachingUnitsDetail', component: TeachingUnitsDetail },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

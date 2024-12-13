import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/Dashboards/LandingPage.vue';
import UserLogin from './components/Auth/UserLogin.vue';
import UserSignup from './components//Auth/UserSignup.vue';
import AdminSignup from './components/Auth/AdminSignup.vue';
import UserDashboard from './components/Dashboards/UserDashboard.vue';
import AdminDashboard from './components/Dashboards/AdminDashboard.vue';
import LatestUpdates from './components/Dashboards/LatestUpdates.vue';
import UserProfile from './components/Dashboards/UserProfile.vue';
import UserSchedule from './components/Dashboards/UserSchedule.vue';
import CoursePage from './components/Python Programming/CoursePage.vue';
import LecturePage from './components/Python Programming/LecturePage.vue';
import AssignmentPage from './components/Python Programming/AssignmentPage.vue';
import AddModule from './components/Admin/AddModule.vue';
import AddLesson from './components/Admin/AddLesson.vue';
import ChatBot from './components/Python Programming/ChatBot.vue';
import EditModule from './components/Admin/EditModule.vue';
import EditLesson from './components/Admin/EditLesson.vue';
import EditProfile from './components/Dashboards/EditProfile.vue';
import DiscussionThreads from './components/Discussion/DiscussionThreads.vue';
import ThreadDetails from './components/Discussion/ThreadDetails.vue';
import CreateQAModal from './components/Dashboards/CreateQAModal.vue';
import AddAssignment from './components/Admin/AddAssignment.vue';



const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin,
    },
    {
        path: '/signup',
        name: 'UserSignup',
        component: UserSignup,
    },
    {
        path: '/admin/signup',
        name: 'AdminSignup',
        component: AdminSignup,
    },
    {
        path: '/dashboard',
        name: 'UserDashboard',
        component: UserDashboard,
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
    },
    {
        path: '/latestupdates',
        name: 'LatestUpdates',
        component: LatestUpdates,
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile,
    },
    {
        path: '/schedule',
        name: 'UserSchedule',
        component: UserSchedule,
    },
    {
        path: '/courses/:course_name',
        name: 'CoursePage',
        component: CoursePage,
        children: [
            {
                path: 'lecture/:lecture_id',
                name: 'LecturePage',
                component: LecturePage,
                props: true
            },
            {
                path: 'assignment/:assignment_id',
                name: 'AssignmentPage',
                component: AssignmentPage,
                props: true
            }
        ]
    },    
    
    // {
    //     path: '/courses/:course_name/lecture/:lecture_id',
    //     name: 'LecturePage',
    //     component: LecturePage,
    // },
    {
        path: '/admin/addmodule/:course_name',
        name: 'AddModule',
        component: AddModule,
    },
    {
        path: '/admin/addlesson/:course_name/:module_name',
        name: 'AddLesson',
        component: AddLesson,
    },
    {
        path: '/chatbot',
        name: 'ChatBot',
        component: ChatBot,
    },
    {
        path: '/admin/editmodule/:course_name',
        name: 'EditModule',
        component: EditModule,
    },
    {
        path: '/admin/editlesson/:course_name/:module_name',
        name: 'EditLesson',
        component: EditLesson,
    },
    {
        path: '/editprofile',
        name: 'EditProfile',
        component: EditProfile,
    },
    {
        path: '/discussion',
        name: 'DiscussionThreads',
        component: DiscussionThreads,
    },
    {
        path: '/thread/:threadId',
        name: 'ThreadDetails',
        component: ThreadDetails,
        props: true
    },
    {
        path: '/createqa',
        name: 'CreateQAModal',
        component: CreateQAModal,
    },
    {
        path: '/admin/addassignment/:course_name/assignment',
        name: 'AddAssignment',
        component: AddAssignment,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    });



export default router;
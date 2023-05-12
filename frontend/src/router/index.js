import { createRouter, createWebHistory } from "vue-router";

// Import Pages
import CurriculumView from "../views/CurriculumView.vue";
import SubjectView from "../views/SubjectView.vue";
import LecturerView from "../views/LecturerView.vue";
import SemesterView from "../views/SemesterView.vue";
import RoomView from "../views/RoomView.vue";
import TableView from "../views/TableView.vue";

import index from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => index,
      meta: {
        title: "หน้าหลัก",
      },
    },
    {
      path: "/curriculum",
      name: "Curriculum",
      component: () => CurriculumView,
      meta: {
        title: "หลักสูตร",
        requiresAuth: true,
      },
    },
    {
      path: "/subject",
      name: "Subject",
      component: () => SubjectView,
      meta: {
        title: "วิชา",
        requiresAuth: true,
      },
    },
    {
      path: "/lecturer",
      name: "Lecturer",
      component: () => LecturerView,
      meta: {
        title: "อาจารย์",
        requiresAuth: true,
      },
    },
    {
      path: "/semester",
      name: "Semester",
      component: () => SemesterView,
      meta: {
        title: "ภาคเรียน",
        requiresAuth: true,
      },
    },
    {
      path: "/room",
      name: "Room",
      component: () => RoomView,
      meta: {
        title: "ห้องเรียน",
        requiresAuth: true,
      },
    },
    {
      path: "/table",
      name: "Table",
      component: () => TableView,
      meta: {
        title: "ตารางเรียน",
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title;
  // If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title = title + " | ASAP";
  }
  // Continue resolving the route
  next();

  if (to.meta.requiresAuth) {
    if (
      localStorage.getItem("loggedIn") == null ||
      localStorage.getItem("loggedIn") == "[object Object]"
    ) {
      router.push("/");
    } else {
      next();
    }
  }
});

export default router;

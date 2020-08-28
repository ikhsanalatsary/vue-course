import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import FormGenData from "./components/FormGenData.vue";
import Student from "./components/Student.vue";
import Course from "./components/Course.vue";
import CourseDetail from "./components/CourseDetail.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/generate", component: FormGenData },
  { path: "/students", component: Student },
  { path: "/course", component: Course },
  {
    path: "/course-detail/:publicId",
    name: "course-detail",
    component: CourseDetail,
  },
];

export default new VueRouter({
  routes, // short for `routes: routes`
});

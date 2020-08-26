<template>
  <vs-navbar class="nabarx" v-model="indexActive">
    <div slot="title">
      <vs-navbar-title>Course</vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <router-link to="/">Home</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <router-link to="/students">Student</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <router-link to="/course">Course</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <router-link to="/generate">Generate</router-link>
    </vs-navbar-item>
  </vs-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      indexActive: 0,
    };
  },
};
</script>

<style scoped></style>

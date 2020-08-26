<template>
  <div class="home">
    <img width="25%" src="../assets/logo.png" />
    <HelloWorld msg="Hello Vue in CodeSandbox!" />
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style>
.home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template lang="html">
  <vs-row
    vs-type="flex"
    vs-justify="center"
    vs-align="center"
    vs-w="2"
    class="form-gen"
  >
    <h2>Generate teacher</h2>
    <vs-input placeholder="start from id" v-model="id" />
    <vs-input placeholder="total record to be generated" v-model="total" />
    <vs-button color="primary" type="border" v-on:click="generate" icon="save"
      >Generate</vs-button
    >
  </vs-row>
</template>

<script>
export default {
  name: "FormGenData",
  data() {
    return {
      id: 1,
      total: 10,
    };
  },
  methods: {
    generate() {},
  },
};
</script>

<style lang="css" scoped>
.form-gen .vs-input {
  margin: 10px;
}
</style>

<template lang="html">
  <vs-row
    vs-type="flex"
    vs-justify="center"
    vs-align="center"
    vs-w="8"
    class="form-gen"
  >
    <vs-row vs-type="flex" vs-justify="center">
      <h2>Generate teacher</h2>
    </vs-row>
    <vs-row vs-type="flex" vs-justify="center">
      <vs-input label="Entity" placeholder="Entity name" v-model="entity" />
    </vs-row>
    <vs-row vs-type="flex" vs-justify="center">
      <vs-input
        label="Total"
        placeholder="total record to be generated"
        v-model="total"
      />
    </vs-row>
    <vs-row vs-type="flex" vs-justify="center">
      <vs-button color="primary" type="border" v-on:click="generate" icon="save"
        >Generate</vs-button
      >
    </vs-row>
  </vs-row>
</template>

<script>
export default {
  name: "FormGenData",
  data() {
    return {
      entity: "teachers",
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

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
import gql from "graphql-tag";
import faker from "faker";

const GENERATE_DATA = gql`
  mutation insertTeacher($objects: [teachers_insert_input!]!) {
    insertTeacher(objects: $objects) {
      affected_rows
      returning {
        id
        name
        publicId
        birthday
      }
    }
  }
`;

export default {
  name: "FormGenData",
  data() {
    return {
      entity: "teacher",
      total: 10,
    };
  },
  methods: {
    generate() {
      console.log(this.total);
      /* eslint-disable radix */
      let total = parseInt(this.total);
      if (isNaN(total)) {
        alert("Total required and must be a number");
        return;
      }
      console.log(this.$apollo);
      let objects = Array.from({ length: total }, () => ({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        birthday: faker.date.past(),
      }));
      this.$apollo
        .mutate({
          mutation: GENERATE_DATA,
          variables: {
            objects,
          },
          update: (cache, { data: { insertTeacher } }) => {
            // Read the data from our cache for this query.
            // eslint-disable-next-line
            console.log(insertTeacher);
          },
        })
        .then((data) => {
          console.log("data", data);
          this.$vs.notify({
            title: "Saved",
            text: "affected row: " + this.total + " records",
            color: "success",
            icon: "check_box",
          });
        });
    },
  },
};
</script>

<style lang="css" scoped>
.form-gen .vs-input {
  margin: 10px;
}
</style>

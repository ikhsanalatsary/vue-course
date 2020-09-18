<template lang="html">
  <vs-row vs-justify="center" vs-w="8">
    <vs-col type="flex" vs-justify="center">
      <form class="centerx labelx">
        <vs-input
          :danger="validationField.name"
          danger-text="This field is required!"
          label="Name"
          placeholder="Student full name"
          v-model="name"
        />
        <vs-input
          label="DOB"
          :danger="validationField.dob"
          danger-text="This field is required!"
          placeholder="YYYY-MM-DD"
          v-model="birthday"
        />
        <vs-button color="primary" type="border" @click="addStudent"
          >Save</vs-button
        >
      </form>
    </vs-col>
    <vs-col>
      <vs-progress
        v-if="$apollo.queries.students.loading"
        indeterminate
        color="primary"
        >primary</vs-progress
      >
      <vs-table stripe :data="students.edges">
        <template v-slot:header>
          <h3>Student</h3>
        </template>
        <template v-slot:thead>
          <vs-th>Name</vs-th>
          <vs-th>Birthday</vs-th>
          <vs-th>Nro</vs-th>
        </template>

        <template v-slot:default="{ data }">
          <vs-tr :key="item.node.id" v-for="item in data">
            <vs-td :data="item.node.name">{{ item.node.name }}</vs-td>

            <vs-td :data="item.node.birthday">{{
              item.node.birthday || "-"
            }}</vs-td>

            <vs-td :data="item.node.publicId">{{ item.node.publicId }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          ref="loadableButton"
          class="vs-con-loading__container"
          type="border"
          v-if="students.pageInfo.hasNextPage"
          :disabled="$apollo.queries.students.loading"
          v-on:click="loadMore"
          >Load more</vs-button
        >
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
import gql from "graphql-tag";

let STUDENTS_CONNECTION = gql`
  query Students($first: Int = 10, $after: String) {
    students: students_connection(
      first: $first
      after: $after
      order_by: { createdAt: desc }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          birthday
          id
          name
          publicId
        }
      }
    }
  }
`;
export default {
  apollo: {
    students: {
      query: STUDENTS_CONNECTION,
      variables() {
        // Use vue reactive properties here
        return {
          first: this.first,
          after: this.after,
        };
      },
    },
  },
  data: () => ({
    validationField: {
      name: false,
      dob: false,
    },
    name: "",
    birthday: "",
    students: {
      edges: [],
      pageInfo: {},
    },
    first: 10,
    after: null,
    backgroundLoading: "primary",
    colorLoading: "#fff",
  }),
  methods: {
    loadMore() {
      let {
        $apollo,
        first,
        $vs,
        backgroundLoading,
        colorLoading,
        $refs,
      } = this;
      let {
        vm: {
          students: { pageInfo },
        },
      } = $apollo;
      console.log($apollo);
      console.log($vs);
      $vs.loading({
        background: backgroundLoading,
        color: colorLoading,
        container: $refs.loadableButton.$el,
        scale: 0.45,
      });
      $apollo.queries.students.fetchMore({
        variables: {
          first,
          after: pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log("previousResult", previousResult);
          console.log("fetchMoreResult", fetchMoreResult);
          const newStudents = fetchMoreResult.students.edges;
          const pageInfo = fetchMoreResult.students.pageInfo;

          $vs.loading.close($refs.loadableButton.$el);

          return {
            students: {
              __typename: previousResult.students.__typename,
              // Merging the tag list
              edges: [...previousResult.students.edges, ...newStudents],
              pageInfo,
            },
          };
        },
      });
    },
    addStudent() {
      if (!this.name) {
        this.validationField.name = true;
        this.validationField.dob = true;
        return;
      }
      // eslint-disable-next-line no-unused-vars
      let name = this.name;
      let birthday = this.birthday;
      this.name = this.birthday = "";
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation StudentMutation($name: String!, $birthday: date) {
              insertStudent(objects: { name: $name, birthday: $birthday }) {
                affected_rows
                returning {
                  birthday
                  id
                  name
                  publicId
                }
              }
            }
          `,
          // Parameters
          variables: {
            name,
            birthday,
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (
            store,
            {
              data: {
                insertStudent: { returning },
              },
            }
          ) => {
            console.log("addStudent -> returning", returning);
            console.log("addStudent -> store", store);
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: STUDENTS_CONNECTION,
              variables: {
                first: this.first,
                after: this.after,
              },
            });
            console.log("addStudent -> data", data);
            // Add our tag from the mutation to the end
            let newData = Array.isArray(returning) ? returning[0] : returning;
            console.log("addStudent -> newData", newData);
            let mergedData = {
              node: {
                ...newData,
                __typename: "students",
              },
              __typename: "studentsEdge",
            };
            console.log("addStudent -> mergedData", mergedData);
            data.students.edges.unshift(mergedData);
            // Write our data back to the cache.
            store.writeQuery({ query: STUDENTS_CONNECTION, data });
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          optimisticResponse: {
            __typename: "mutation_root",
            insertStudent: {
              affected_rows: 1,
              __typename: "students_mutation_response",
              returning: {
                id: -1,
                name,
                birthday,
                publicId: '78770fd8-4de0-4232-9af8-dcbe4d4476e3', // fake
                __typename: "students",
              },
            },
          },
        })
        .then((data) => {
          // Result
          console.log(data);
        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
          this.name = name;
          this.birthday = birthday;
        });
    },
  },
};
</script>

<style scoped>
.labelx .vs-input {
  margin: 10px;
  display: inline-block;
}
</style>

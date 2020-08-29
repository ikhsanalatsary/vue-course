<template lang="html">
  <vs-row vs-justify="center" vs-w="8">
    <vs-col type="flex" vs-justify="center">
    <form class="centerx labelx">
      <vs-input label="Name" placeholder="Student full name" v-model="name"/>
      <vs-input label="DOB" placeholder="Date of birth" v-model="birthday"/>
      <vs-button color="primary" type="border">Save</vs-button>
    </form>
    </vs-col>
    <vs-col>
      <vs-table stripe :data="students.edges">
        <template v-slot:header>
          <h3>
            Student
          </h3>
        </template>
      <template v-slot:thead>
        <vs-th>Name</vs-th>
        <vs-th>Birthday</vs-th>
        <vs-th>Nro</vs-th>
        <vs-progress v-if="$apollo.queries.students.loading" indeterminate color="primary">primary</vs-progress>
      </template>

        <template v-slot:default="{data}">
          <vs-tr :key="item.node.id" v-for="item in data">
            <vs-td :data="item.node.name">{{item.node.name}}</vs-td>

            <vs-td :data="item.node.birthday">{{item.node.birthday || '-'}}</vs-td>

            <vs-td :data="item.node.publicId">{{item.node.publicId}}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">  
        <vs-button ref="loadableButton" class="vs-con-loading__container" type="border" v-if="students.pageInfo.hasNextPage" :disabled="$apollo.queries.students.loading" v-on:click="loadMore">Load more</vs-button>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
import gql from "graphql-tag";

let STUDENTS_CONNECTION = gql`
  query Students($first: Int = 10, $after: String) {
    students: students_connection(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
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
          after: this.after
        };
      }
    }
  },
  data: () => ({
    name: '',
    birthday: '',
    students: {
      edges: [],
      pageInfo: {}
    },
    first: 10,
    after: null,
    backgroundLoading: "primary",
    colorLoading: "#fff",
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        website: "demarco.info",
      },
      {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        website: "ola.org",
      },
      {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        website: "elvis.io",
      },
      {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        website: "jacynthe.com",
      },
      {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        website: "conrad.com",
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        website: "ambrose.net",
      },
    ],
  }),
  methods: {
    loadMore() {
      let {
        $apollo,
        first,
        $vs,
        backgroundLoading,
        colorLoading,
        $refs
      } = this;
      let {
        vm: {
          students: { pageInfo }
        }
      } = $apollo;
      console.log($apollo);
      console.log($vs);
      $vs.loading({
        background: backgroundLoading,
        color: colorLoading,
        container: $refs.loadableButton.$el,
        scale: 0.45
      });
      $apollo.queries.students.fetchMore({
        variables: {
          first,
          after: pageInfo.endCursor
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
              pageInfo
            }
          };
        }
      });
    }
  }
};
</script>

<style scoped>
.labelx .vs-input {
  margin: 10px;
  display: inline-block;
} 
</style>
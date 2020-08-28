<template>
  <vs-row vs-justify="center" vs-w="8">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="6"
      v-for="data in courseEvents.edges"
      :key="data.node.id"
    >
      <vs-card class="cardx" fixedHeight actionable>
        <div slot="header">
          <h3>{{ data.node.course.name }}</h3>
        </div>
        <div slot="media">
          <img src="https://lusaxweb.github.io/vuesax/card.png" />
        </div>
        <div>
          <p>{{ data.node.course.description }}</p>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button
              color="primary"
              icon="visibility"
              @click="
                handleClick(
                  { id: data.node.id, publicId: data.node.publicId },
                  event
                )
              "
              >View</vs-button
            >
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card class="cardx" fixedHeight actionable>
        <div slot="header">
          <h3>Hello world !</h3>
        </div>
        <div slot="media">
          <img src="https://lusaxweb.github.io/vuesax/card2.png" />
        </div>
        <div>
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</span
          >
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button color="primary" icon="visibility">View</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import gql from "graphql-tag";

let COURSE_EVENTS_CONNECTION = gql`
  query Course {
    courseEvents: courseEvents_connection(first: 10) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          publicId
          course {
            name
            description
          }
        }
      }
    }
  }
`;
export default {
  name: "Course",
  data() {
    console.log(this);
    return {
      courseEvents: {
        edges: [],
        pageInfo: {},
      },
    };
  },
  methods: {
    handleClick({ id, publicId }) {
      console.log("jal", id, publicId);
      console.log("this.props", this.$router);
      this.$router.push({
        name: "course-detail",
        params: { publicId, id },
      });
    },
  },
  apollo: {
    courseEvents: {
      query: COURSE_EVENTS_CONNECTION,
      variables() {
        // Use vue reactive properties here
        return {};
      },
    },
  },
};
</script>

<style scoped>
.cardx {
  margin: 15px;
}
</style>

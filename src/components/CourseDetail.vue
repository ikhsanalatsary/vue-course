<template>
  <fragment>
    <vs-row vs-justify="center" class="course-row" vs-w="6">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-card>
          <div slot="header">
            <h3>
              {{ title }}
            </h3>
          </div>
          <div slot="media">
            <img src="https://lusaxweb.github.io/vuesax/card.png" />
          </div>
          <div>
            <span>{{ description }}</span>
          </div>
          <div class="tab-info">
            <vs-tabs>
              <vs-tab label="Waktu dan tanggal">
                <div class="con-tab-ejemplo">
                  <p>
                    Mulai:
                    {{ startDate }}
                  </p>
                  <p>Sampai: {{ endDate }}</p>
                  <p>Jam: {{ startTime }} - {{ endTime }}</p>
                </div>
              </vs-tab>
              <vs-tab label="Lokasi">
                <div class="con-tab-ejemplo">
                  <p>{{ location }}</p>
                  <p>{{ address }}</p>
                  <div>
                    <h3>Peta:</h3>
                    <p>Longitude: {{ longitude }}</p>
                    <p>Latitude: {{ latitude }}</p>
                  </div>
                </div>
              </vs-tab>
              <vs-tab label="Pengajar">
                <div class="con-tab-ejemplo">
                  <p>{{ teacher }}</p>
                  <p>
                    <strong>{{ teacherSkill }}</strong>
                  </p>
                </div>
              </vs-tab>
              <vs-tab label="Peserta">
                <div class="con-tab-ejemplo">
                  <vs-list v-for="data in students" :key="data.node.id">
                    <vs-list-item
                      :subtitle="data.node.student.name"
                    ></vs-list-item>
                  </vs-list>
                  <vs-row
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="12"
                  >
                    <vs-button
                      class="vs-con-loading__container"
                      id="load-more"
                      ref="loadableButton"
                      type="border"
                      v-if="hasNextPage"
                      :disabled="$apollo.queries.courseEvent.loading"
                      @click="loadMore"
                      >Load more</vs-button
                    >
                  </vs-row>
                </div>
              </vs-tab>
            </vs-tabs>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </fragment>
</template>

<script>
import gql from "graphql-tag";

let COURSE_EVENTS_DETAIL = gql`
  query CourseEventDetailQuery($id: ID!, $first: Int = 10, $after: String) {
    courseEvent: node(id: $id) {
      id
      ... on courseEvents {
        id
        course {
          id
          name
          description
        }
        startDate
        startTime
        endDate
        endTime
        location {
          id
          name
          address
          latitude
          longitude
        }
        teacher {
          id
          name
          skill
        }
        students: studentToCourseEvents_connection(
          first: $first
          after: $after
        ) {
          edges {
            cursor
            node {
              id
              student {
                id
                name
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    }
  }
`;
export default {
  name: "CourseDetail",
  // components: {},
  data() {
    console.log(this);
    return {
      courseEvent: null,
      first: 10,
      after: null,
      backgroundLoading: "primary",
      colorLoading: "#fff",
    };
  },
  computed: {
    title() {
      return this.courseEvent?.course?.name;
    },
    description() {
      return this.courseEvent?.course?.description;
    },
    startDate() {
      return this.$moment(this.courseEvent?.startDate).format("LL");
    },
    endDate() {
      return this.$moment(this.courseEvent?.endDate).format("LL");
    },
    startTime() {
      return this.$moment(this.courseEvent?.startTime, "HH:mm:ss").format("LT");
    },
    endTime() {
      return this.$moment(this.courseEvent?.endTime, "HH:mm:ss").format("LT");
    },
    location() {
      return this.courseEvent?.location?.name;
    },
    address() {
      return this.courseEvent?.location?.address;
    },
    longitude() {
      return this.courseEvent?.location?.longitude;
    },
    latitude() {
      return this.courseEvent?.location?.latitude;
    },
    teacher() {
      return this.courseEvent?.teacher?.name;
    },
    teacherSkill() {
      return this.courseEvent?.teacher?.skill;
    },
    students() {
      return this.courseEvent?.students?.edges ?? [];
    },
    pageInfo() {
      return this.courseEvent?.students?.pageInfo;
    },
    hasNextPage() {
      return this.pageInfo?.hasNextPage;
    },
  },
  apollo: {
    courseEvent: {
      query: COURSE_EVENTS_DETAIL,
      variables() {
        // Use vue reactive properties here
        return {
          id:
            this.$route.params.id ||
            "WzEsICJwdWJsaWMiLCAiY291cnNlRXZlbnRzIiwgMV0=",
          first: this.first,
          after: this.after,
        };
      },
    },
  },
  methods: {
    loadMore() {
      let {
        $apollo,
        pageInfo,
        first,
        $vs,
        backgroundLoading,
        colorLoading,
        $refs,
      } = this;
      // let {
      //   vm: {
      //     students: { pageInfo }
      //   }
      // } = $apollo;
      console.log(pageInfo);
      console.log($apollo);
      console.log($vs.loading.toString());
      console.log(this.refs);
      console.log($refs);
      console.log($refs.loadableButton instanceof Element);
      console.log($refs.loadableButton.$el instanceof Element);
      $vs.loading({
        background: backgroundLoading,
        color: colorLoading,
        container: $refs.loadableButton.$el,
        // container: "#load-more",
        scale: 0.45,
      });
      $apollo.queries.courseEvent.fetchMore({
        variables: {
          first,
          after: pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log("previousResult", previousResult);
          console.log("fetchMoreResult", fetchMoreResult);
          const newStudents = fetchMoreResult.courseEvent.students.edges;
          const pageInfo = fetchMoreResult.courseEvent.students.pageInfo;
          const { students, ...excludeStudent } = previousResult.courseEvent;

          $vs.loading.close($refs.loadableButton.$el);
          // $vs.loading.close("#load-more");

          return {
            courseEvent: {
              ...excludeStudent,
              // Merging the student list
              students: {
                edges: [...students.edges, ...newStudents],
                pageInfo,
                __typename: students.__typename,
              },
            },
          };
        },
      });
    },
  },
};
</script>

<style scoped>
/* h1 {
  margin-top: 12px;
  margin-bottom: 12px;
} */
.course-row {
  margin-top: 15px;
}
.tab-info {
  margin-top: 8px;
}
</style>

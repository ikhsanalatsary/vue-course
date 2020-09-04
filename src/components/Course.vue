<template>
  <vs-row vs-justify="center" vs-w="10">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card class="cardx left" fixedHeight actionable>
        <div slot="header">
          <h3>Hello world !</h3>
        </div>
        <div slot="media">
          <img src="https://lusaxweb.github.io/vuesax/card.png" />
        </div>
        <div>
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</span
          >
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</span
          >
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button
              color="primary"
              icon="visibility"
              @click="handleClick('0')"
              >View</vs-button
            >
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card class="cardx right" fixedHeight actionable>
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
            <vs-button
              color="primary"
              icon="visibility"
              @click="handleClick('1')"
              >View</vs-button
            >
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "Course",
  methods: {
    handleClick(index) {
      console.log("jal", index);
      console.log("this.props", this.$router);
      this.$router.push({
        name: "course-detail",
        params: { publicId: index, id: 123 },
      });
    },
  },
};
</script>

<style scoped>
.cardx {
  margin-top: 15px;
  margin-bottom: 15px;
}
.left {
  margin-right: 15px;
}
.right {
  margin-left: 15px;
}
div p {
  padding-bottom: 12px;
}
</style>

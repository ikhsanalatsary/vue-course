<template #tbody>
  <fragment>
    <vs-tr :key="indextr" v-for="(tr, indextr) in students">
      <vs-td :students="students[indextr].email">
        {{ students[indextr].email }}
      </vs-td>

      <vs-td :students="students[indextr].username">
        {{ students[indextr].name }}
      </vs-td>

      <vs-td :students="students[indextr].id">
        {{ students[indextr].website }}
      </vs-td>

      <vs-td :students="students[indextr].id">
        {{ students[indextr].id }}
      </vs-td>
    </vs-tr>
  </fragment>
</template>

<script>
export default {
  name: "StudentItem",
  props: { students: Array },
};
</script>

<style scoped></style>

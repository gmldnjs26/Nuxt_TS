<template>
  <v-list>
    <v-col
      v-for="people in peoples"
      :key="people.id"
      cols="12"
      md="4"
      style="display: inline-block"
    >
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{ people.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ people.nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="remove(people.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
</template>
<script>
export default {
  props: {
    peoples: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    console.log(this.peoples);
  },
};
</script>
<style></style>

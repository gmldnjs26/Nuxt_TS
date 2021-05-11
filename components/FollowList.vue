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
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class FollowList extends Vue {
  @Prop() readonly peoples!: Array<object>;
  @Prop() readonly remove!: Function;
}
</script>
<style></style>

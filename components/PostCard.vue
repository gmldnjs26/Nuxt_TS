<template>
  <v-card>
    <v-img></v-img>
    <v-card-text>
      <div>
        <h3>Gwakheewon</h3>
        <div>안녕하세영 {{ myNickname }}게시글 목록~</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange">
        <v-icon>mdi-twitter-retweet</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-dots-horizontals</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { UserStore } from '~/store';

@Component({
  components: {},
})
export default class PostsCard extends Vue {
  get me() {
    return UserStore.me;
  }
}
</script>

<style></style>

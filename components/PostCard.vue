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

<script>
import { Vue } from 'nuxt-property-decorator';
import { UserStore } from '~/store';
export default class PostsCard extends Vue {
  get myNickname() {
    return UserStore.me.nickname;
  }
}
</script>

<style></style>

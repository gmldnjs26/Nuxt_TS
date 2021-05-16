<template>
  <div class="container">
    <post-form v-if="me"></post-form>
    <div>
      <logo />
      <post-card
        v-for="post in mainPosts"
        :key="post.id"
        :post="post"
      ></post-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';
import PostCard from '~/components/PostCard.vue';
import PostForm from '~/components/PostForm.vue';
import { UserStore, PostStore } from '~/store';
@Component({
  components: {
    Logo,
    PostCard,
    PostForm,
  },
})
export default class extends Vue {
  get me() {
    return UserStore.me;
  }

  get mainPosts() {
    return PostStore.mainPosts;
  }
}
</script>

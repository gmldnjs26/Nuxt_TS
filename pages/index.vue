<template>
  <div class="container">
    <div>
      <logo />
      <post-card></post-card>
      <post-card></post-card>
      <post-card></post-card>
      <post-card></post-card>
      <post-card></post-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';
import PostCard from '~/components/PostCard.vue';

@Component({
  components: {
    Logo,
    PostCard,
  },
})
export default class extends Vue {
  authorName: string = 'Heewon';
}
</script>

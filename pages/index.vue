<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">{{ authorName }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class extends Vue {
  authorName: string = 'JHyeok';
}
</script>

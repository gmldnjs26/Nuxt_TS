<template>
	<div class="container">
		<CheckBoxGroup></CheckBoxGroup>
		<post-form v-if="me && me.id !== ''"></post-form>
		<div>
			<logo />
			<post-card v-for="post in mainPosts" :key="post.id" :post="post"></post-card>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';
import PostCard from '~/components/PostCard.vue';
import PostForm from '~/components/PostForm.vue';
import CheckBoxGroup from '~/components/CheckBoxGroup.vue';
import { PostStore, UserStore } from '~/store';
Component.registerHooks(['fetch']);

@Component({
	components: {
		Logo,
		PostCard,
		PostForm,
		CheckBoxGroup,
	},
})
export default class extends Vue {
	get me() {
		return UserStore.getMe;
	}

	async fetch() {
		await PostStore.fetchPosts(); // parameter in { offset: 0 }
	}

	get mainPosts() {
		return PostStore.getMainPosts;
	}
}
</script>

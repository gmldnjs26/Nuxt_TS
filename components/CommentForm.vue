<template>
	<v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
		<v-textarea
			v-model="content"
			filled
			label="댓글 달기"
			:hide-details="hideDetails"
			:success="success"
			:success-messages="successMessages"
			@input="onChangeTextarea"
		/>
		<v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
	</v-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class CommentForm extends Vue {
	@Prop() readonly postId!: String;

	valid: Boolean = false;
	content: string = '';
	success: Boolean = false;
	successMessages: string = '';
	hideDetails: Boolean = true;

	get me() {
		return this.$store.state.users.me;
	}

	onChangeTextarea(value: string) {
		if (value.length) {
			this.hideDetails = true;
			this.success = false;
			this.successMessages = '';
		}
	}

	onSubmitForm() {
		if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
			this.$store
				.dispatch('posts/addComment', {
					postId: this.postId,
					content: this.content,
				})
				.then(() => {
					this.content = '';
					this.success = true;
					this.successMessages = '댓글이 작성되었습니다.';
					this.hideDetails = false;
				});
		}
	}
}
</script>
<style></style>

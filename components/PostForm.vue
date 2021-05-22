<template>
	<v-card style="margin: 10px 0">
		<v-container>
			<v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
				<v-textarea
					v-model="content"
					outlined
					auto-grow
					clearable
					label="어떤 신기한 일이 있엇나요?"
					:hide-details="hideDetails"
					:success-message="successMessages"
					:success="success"
					:rules="[v => !!v.trim() || '내용을 입력하세요.']"
					@input="onChangeTextarea"
				/>
				<input ref="imageInput" type="file" multiple hidden @change="onChangeImages" />
				<v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
				<v-btn type="submit" color="green" absolute right style="margin-right: 10px">짹짹</v-btn>
				<div>
					<div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
						<img :src="`http://localhost:3087/${p}`" alt="p" style="width: 200px" />
						<div>
							<button type="button" @click="onRemoveImage(i)">제거</button>
						</div>
					</div>
				</div>
			</v-form>
		</v-container>
	</v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class PostForm extends Vue {
	hideDetails: boolean = true;
	successMessages: string = '';
	success: boolean = false;
	content: string = '';
	valid: boolean = false;

	get me() {
		return this.$store.state.users.me;
	}

	get imagePaths() {
		return this.$store.state.posts.imagePaths;
	}

	onChangeTextarea() {
		this.hideDetails = true;
		this.success = false;
		this.successMessages = '';
	}

	onSubmitForm() {
		if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
			this.$store
				.dispatch('posts/add', {
					content: this.content,
				})
				.then(() => {
					this.content = '';
					this.hideDetails = false;
					this.success = true;
					this.successMessages = '게시글 등록 성공!';
				})
				.catch(() => {
					console.log('게시글 등록 실패!');
				});
		}
	}

	onClickImageUpload() {
		(this.$refs.imageInput as HTMLElement).click();
	}

	onChangeImages(event: { target: HTMLInputElement }) {
		const imageFormData = new FormData();
		[].forEach.call(event.target.files, f => {
			imageFormData.append('image', f);
		});
		this.$store.dispatch('posts/uploadImages', imageFormData);
	}

	onRemoveImage(index: number) {
		this.$store.commit('posts/removeImagePath', index);
	}
}
</script>
<style></style>

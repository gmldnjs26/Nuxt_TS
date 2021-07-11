<template>
	<div v-if="images.length === 0"></div>
	<div v-else-if="images.length === 1">
		<v-img :src="`http://localhost:3087/${images[0].src}`" contain aspect-ratio="2" />
	</div>
	<div v-else-if="images.length === 2" style="display: flex">
		<v-img
			:src="`http://localhost:3087/${images[0].src}`"
			contain
			aspect-ratio="2"
			style="flex: 1"
			@click="showModal"
		/>
		<v-img
			:src="`http://localhost:3087/${images[1].src}`"
			contain
			aspect-ratio="2"
			style="flex: 1"
			@click="showModal"
		/>
		<ImageZoom v-show="isShowDetailImages" :images="images" :close-modal="closeModal" />
	</div>
	<div v-else>
		<v-img
			:src="`http://localhost:3087/${images[0].src}`"
			contain
			aspect-ratio="2"
			style="flex: 1"
			@click="showModal"
		/>
		<ImageZoom v-show="isShowDetailImages" :images="images" :close-modal="closeModal" />
		<div
			style="flex: 1; align-items: center; justify-content: center; display: flex"
			@click="showModal"
		>
			<v-icon>mdi-dots-horizontal</v-icon>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
	components: {
		ImageZoom: () => import('@/components/ImageZoom.vue'),
	},
})
export default class PostImages extends Vue {
	@Prop({ default: () => [] })
	images!: Array<any>;

	private isShowDetailImages = false;

	showModal() {
		this.isShowDetailImages = true;
	}

	closeModal() {
		console.log('closeModal');
		this.isShowDetailImages = false;
	}
}
</script>

<style></style>

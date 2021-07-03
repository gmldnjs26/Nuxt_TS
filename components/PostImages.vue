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
		/>
		<v-img
			:src="`http://localhost:3087/${images[1].src}`"
			contain
			aspect-ratio="2"
			style="flex: 1"
		/>
	</div>
	<div v-else>
		<v-img
			:src="`http://localhost:3087/${images[0].src}`"
			contain
			aspect-ratio="2"
			style="flex: 1"
		/>
		<div style="flex: 1; align-items: center; justify-content: center; display: flex">
			<v-icon>mdi-dots-horizontal</v-icon>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class PostImages extends Vue {
	@Prop({ default: () => [] })
	images!: Array<any>;
}
</script>

<style></style>

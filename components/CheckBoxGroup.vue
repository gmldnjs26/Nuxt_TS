<template>
	<div>
		<span>selectedValues: {{ selectedValues }}</span>
		<div v-for="item in testData" :key="item.id">
			<v-checkbox v-model="selectedValues" :value="item.value"></v-checkbox>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
	testData = [
		{ id: '1', value: 'test1' },
		{ id: '2', value: 'test2' },
		{ id: '3', value: 'test3' },
	];

	selectedValues: string[] = [];
}
</script>

<style scoped></style>

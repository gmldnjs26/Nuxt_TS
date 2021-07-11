<template>
	<div>
		<v-card>
			<PostImages :images="post.Images"></PostImages>
			<v-card-text>
				<div>
					<h3>{{ post.User.nickname }}</h3>
					<div>{{ post.content }}</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-btn text color="orange">
					<v-icon>mdi-twitter-retweet</v-icon>
				</v-btn>
				<v-btn text color="orange">
					<v-icon>mdi-heart-outline</v-icon>
				</v-btn>
				<v-btn text color="orange" @click="onToggleComment">
					<v-icon>mdi-comment-outline</v-icon>
				</v-btn>
				<v-menu offset-y open-on-hover>
					<template #activator="{ on }">
						<v-btn text color="orange" v-on="on">
							<v-icon>mdi-dots-horizontal</v-icon>
						</v-btn>
					</template>
					<div style="background: white">
						<v-btn dark color="red" @click="onRemovePost"> 삭제 </v-btn>
						<v-btn dark color="orange" @click="onEditPost"> 편집 </v-btn>
					</div>
				</v-menu>
			</v-card-actions>
		</v-card>
		<template v-if="commentOpened">
			<comment-form :post-id="post.id" />
			<v-list>
				<v-list-item v-for="c in post.Comments" :key="c.id">
					<v-list-item-avatar color="teal">
						<span>{{ c.User.nickname[0] }}</span>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</template>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { UserStore, PostStore } from '~/store';
import { Post } from '~/store/store.interface';
@Component({
	components: {
		PostImages: () => import('~/components/PostImages.vue'),
	},
})
export default class PostCard extends Vue {
	@Prop() readonly post!: Post;

	commentOpened: boolean = false;

	get liked() {
		const me = UserStore.getMe;
		return (this.post.likers || []).find(v => v.id === (me && me.id));
	}

	get heartIcon() {
		const me = UserStore.getMe;
		const liked = (this.post.likers || []).find(v => v.id === (me && me.id));
		return liked ? 'mdi-heart' : 'mdi-heart-outline';
	}

	get me() {
		return UserStore.getMe;
	}

	onRemovePost() {
		PostStore.remove({
			postId: this.post.id,
		});
	}

	onEditPost() {}

	onRetweet() {
		if (!this.me) {
			return alert('로그인이 필요합니다.');
		}
		PostStore.retweet({
			postId: this.post.id,
		});
	}

	onClickHeart() {
		if (!this.me) {
			return alert('로그인이 필요합니다.');
		}
		if (this.liked) {
			return PostStore.unlikePost({
				postId: this.post.id,
			});
		}
		return PostStore.likePost({
			postId: this.post.id,
		});
	}

	onToggleComment() {
		this.commentOpened = !this.commentOpened;
	}
}
</script>

<style></style>

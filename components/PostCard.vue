<template>
	<div>
		<v-card>
			<v-img></v-img>
			<v-card-text>
				<div>
					<h3>{{ post.user.nickname }}</h3>
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
				<v-list-item v-for="c in post.comments" :key="c.id">
					<v-list-item-avatar color="teal">
						<span>{{ c.user.nickname[0] }}</span>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ c.user.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</template>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Post } from '~/store/store.interface';
@Component({
	components: {},
})
export default class PostCard extends Vue {
	@Prop() readonly post!: Post;

	commentOpened: boolean = false;

	get liked() {
		const me = this.$store.state.users.me;
		return (this.post.likers || []).find(v => v.id === (me && me.id));
	}

	get heartIcon() {
		const me = this.$store.state.users.me;
		const liked = (this.post.likers || []).find(v => v.id === (me && me.id));
		return liked ? 'mdi-heart' : 'mdi-heart-outline';
	}

	get me() {
		return this.$store.state.users.me;
	}

	onRemovePost() {
		this.$store.dispatch('posts/remove', {
			postId: this.post.id,
		});
	}

	onEditPost() {}

	onRetweet() {
		if (!this.me) {
			return alert('로그인이 필요합니다.');
		}
		this.$store.dispatch('posts/retweet', {
			postId: this.post.id,
		});
	}

	onClickHeart() {
		if (!this.me) {
			return alert('로그인이 필요합니다.');
		}
		if (this.liked) {
			return this.$store.dispatch('posts/unlikePost', {
				postId: this.post.id,
			});
		}
		return this.$store.dispatch('posts/likePost', {
			postId: this.post.id,
		});
	}

	onToggleComment() {
		this.commentOpened = !this.commentOpened;
	}
}
</script>

<style></style>

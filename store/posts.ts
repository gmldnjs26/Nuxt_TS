import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
// import throttle from 'lodash.throttle';
import { $axios } from '~/utils/api';
import { bUser, Post } from '~/store/store.interface';

const limit = 10; // 실무에서는 라맛방식으로는 안한다고 한다. 변동이 많기때문

@Module({
	name: 'posts',
	stateFactory: true,
	namespaced: true,
})
export default class Posts extends VuexModule {
	public mainPosts: Post[] = [];
	public hasMorePost: boolean = true;
	public imagePaths: string[] = [];
	public errMsg: string = '';

	@Mutation
	addMainPost(payload: any) {
		this.mainPosts.unshift(payload); // 제일 앞으로
	}

	@Mutation
	removeMainPost(payload: any) {
		const index = this.mainPosts.findIndex(v => v.id === payload.id);
		this.mainPosts.splice(index, 1); // 삭제
	}

	@Mutation
	addComment(payload: any) {
		const index = this.mainPosts.findIndex(v => v.id === payload.postId);
		(this.mainPosts[index].comments as Array<string>).unshift(payload);
	}

	@Mutation
	loadComments(payload: any) {
		const index = this.mainPosts.findIndex(v => v.id === payload.postId);
		this.mainPosts[index].comments = payload;
	}

	@Mutation
	loadPosts(payload: any) {
		this.mainPosts = this.mainPosts.concat(payload);
		this.hasMorePost = payload.length === limit;
	}

	@Mutation
	concatImagePaths(payload: any) {
		this.imagePaths = this.imagePaths.concat(payload);
	}

	@Mutation
	removeImagePath(payload: any) {
		this.imagePaths.splice(payload, 1);
	}

	@Mutation
	unlikePost(payload: any) {
		const index = this.mainPosts.findIndex(v => v.id === payload.postId);
		const userIndex = (this.mainPosts[index].likers as Array<bUser>).findIndex(
			v => v.id === payload.userId,
		);
		(this.mainPosts[index].likers as Array<bUser>).splice(userIndex, 1);
	}

	@Mutation
	likePost(payload: any) {
		const index = this.mainPosts.findIndex(v => v.id === payload.postId);
		(this.mainPosts[index].likers as Array<bUser>).push({
			id: payload.userId,
		});
	}

	@Action({ rawError: true })
	add(payload: any) {
		return $axios
			.post(
				'/post',
				{
					content: payload.content,
					imagePaths: this.imagePaths,
				},
				{
					withCredentials: true,
				},
			)
			.then(res => {
				this.addMainPost(res.data); // 3번째 root인자는 index.js를 참조할지안할지
			})
			.catch(e => {
				console.log(e);
			});
	}

	@Action({ rawError: true })
	remove(payload: any) {
		return $axios
			.delete(`/post/${payload.postId}`, {
				withCredentials: true,
			})
			.then(() => {
				this.removeMainPost(payload);
			})
			.catch(err => {
				console.log(err);
			});
	}

	/**
	 * TODO: addComment -> regComment
	 */
	@Action({ rawError: true })
	regComment(payload: any) {
		return $axios
			.post(
				`/post/${payload.postId}/comment`,
				{
					content: payload.content,
				},
				{
					withCredentials: true,
				},
			)
			.then(res => {
				this.addComment(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	/**
	 * :TODO: loadComments -> fetchComments로 바꿈
	 */
	@Action({ rawError: true })
	fetchComments(payload: any) {
		return $axios
			.get(`/post/${payload.postId}/comments`)
			.then(res => {
				this.loadComments(res.data);
			})
			.catch(err => {
				this.errMsg = err;
			});
	}

	/**
	 * :TODO:throttle 적용시키기,
	 *       loadPosts -> fetchPosts로 바꿈
	 */
	@Action({ rawError: true })
	fetchPosts() {
		if (this.hasMorePost) {
			try {
				const lastPost = this.mainPosts[this.mainPosts.length - 1];
				return $axios
					.get(`/posts?lastId=${lastPost && lastPost.id}&limit=${limit}`)
					.then(res => this.loadPosts(res.data));
			} catch (error) {
				console.log('Axios Error');
			}
		}
	}

	@Action({ rawError: true })
	uploadImages(payload: any) {
		return $axios
			.post('/post/images', payload, {
				withCredentials: true,
			})
			.then(res => {
				this.concatImagePaths(res.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	@Action({ rawError: true })
	retweet(payload: any) {
		return $axios
			.post(
				`/post/${payload.postId}/retweet`,
				{},
				{
					withCredentials: true,
				},
			)
			.then(res => {
				this.addMainPost(res.data);
			})
			.catch(err => {
				console.error(err);
				alert(err.response.data);
			});
	}

	/**
	 * TODO: likePost -> addLikePost
	 */
	@Action({ rawError: true })
	addLikePost(payload: any) {
		return $axios
			.post(
				`/post/${payload.postId}/like`,
				{},
				{
					withCredentials: true,
				},
			)
			.then(res => {
				this.likePost({
					userId: res.data.userId,
					postId: payload.postId,
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	/**
	 * TODO: unlikePost -> removeLikePost
	 */
	@Action({ rawError: true })
	removeLikePost(payload: any) {
		return $axios
			.delete(`/post/${payload.postId}/like`, {
				withCredentials: true,
			})
			.then(res => {
				console.log('unlikePost');
				this.unlikePost({
					userId: res.data.userId,
					postId: payload.postId,
				});
			})
			.catch(err => {
				console.error(err);
			});
	}
}

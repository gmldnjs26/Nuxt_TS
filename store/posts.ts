import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
  errMsg: '',
});

const limit = 10; // 실무에서는 라맛방식으로는 안한다고 한다. 변동이 많기때문
const totalPosts = 51;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload); // 제일 앞으로
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1); // 삭제
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments = payload;
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
  unlikePost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    const userIndex = state.mainPosts[index].Likers.findIndex(
      (v) => v.id === payload.userId
    );
    state.mainPosts[index].Likers.splice(userIndex, 1);
  },
  likePost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Likers.push({
      id: payload.userId,
    });
  },
};

export const actions = {
  add({ commit }, payload) {
    this.$axios
      .post(
        '/post',
        {
          content: payload.content,
          imagePaths: state.imagePaths,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit('addMainPost', res.data, { root: false }); // 3번째 root인자는 index.js를 참조할지안할지
      })
      .catch((e) => {
        console.log(e);
      });
  },
  remove({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        withCredentials: true,
      })
      .then(() => {
        commit('removeMainPost', payload);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addComment({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/comment`,
        {
          content: payload.content,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit('addComment', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  loadComments({ commit, state }, payload) {
    this.$axios
      .get(`/post/${payload.postId}/comments`)
      .then((res) => {
        commit('loadComments', res.data);
      })
      .catch((err) => {
        state.errMsg = err;
      });
  },
  loadPosts: throttle(async function ({ commit, state }) {
    console.log('actions loadPosts');
    if (state.hasMorePost) {
      try {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        console.log('lastPost.id' + lastPost.id);
        await this.$axios.get(
          `/posts?lastId=${lastPost && lastPost.id}&limit=${limit}`
        );
        commit('loadPosts', res.data);
        return;
      } catch (error) {
        console.log('Axios Error');
      }
    }
  }, 300),
  uploadImages({ commit }, payload) {
    this.$axios
      .post('/post/images', payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit('concatImagePaths', res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  retweet({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/retweet`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit('addMainPost', res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  },
  likePost({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/like`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  unlikePost({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}/like`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('unlikePost');
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

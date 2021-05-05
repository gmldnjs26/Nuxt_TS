import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { AxiosResponse } from 'axios';
import { User, uState } from '~/store/store.interface';
import AxiosService from '~/service/axios.service';

Vue.use(Vuex);

const limit = 3;

const store: StoreOptions<uState> = {
  state: {
    me: undefined, // me가 null이면 비로그인 있으면 로그인한 상태
    hasMoreFollower: true,
    hasMoreFollowing: true,
    followerList: [],
    followingList: [],
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
    },
    // setOther(state, payload) {
    //   state.other = payload;
    // },
    changeNickname(state, payload) {
      (state.me as User).nickname = payload.nickname;
    },
    removeFollower(state, payload) {
      let index = state.followerList.findIndex((v) => v.id === payload.userId);
      state.followerList.splice(index, 1); // 팔로워 삭제
      index = (state.me as User).followers.findIndex(
        (v) => v.id === payload.userId
      );
      (state.me as User).followers.splice(index, 1); // 팔로워 삭제
    },
    cancleFollowing(state, payload) {
      let index = state.followingList.findIndex((v) => v.id === payload.userId);
      state.followingList.splice(index, 1); // 팔로잉 취소
      index = (state.me as User).followings.findIndex(
        (v) => v.id === payload.userId
      );
      (state.me as User).followings.splice(index, 1); // 팔로잉 취소
    },
    loadFollowers(state, payload) {
      if (payload.offset === 0) {
        state.followerList = payload.data;
      } else {
        state.followerList = state.followerList.concat(payload.data);
      }
      state.hasMoreFollower = payload.data.length === limit;
    },
    loadFollowings(state, payload) {
      if (payload.offset === 0) {
        state.followingList = payload.data;
      } else {
        state.followingList = state.followingList.concat(payload.data);
      }
      state.hasMoreFollowing = payload.data.length === limit;
    },
    addfollowing(state, payload) {
      (state.me as User).followings.push({
        id: payload.userId,
      });
    },
  },
  actions: {
    loadUser({ commit }) {
      AxiosService.instance
        .get('/user/', {
          withCredentials: true,
        })
        .then((res: AxiosResponse<User>) => {
          commit('setMe', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async loadOther({ commit }, payload) {
      try {
        const res: AxiosResponse<User> = await AxiosService.instance.get(
          `/user/${payload.userId}`,
          {
            withCredentials: true,
          }
        );
        commit('setOther', res.data);
      } catch (err) {
        console.error(err);
      }
    },
    signUp(context, payload) {
      AxiosService.instance
        .post(
          '/user/',
          {
            nickname: payload.nickname,
            email: payload.email,
            password: payload.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          context.commit('setMe', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logIn(context, payload) {
      AxiosService.instance
        .post(
          '/user/login',
          {
            email: payload.email,
            password: payload.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          context.commit('setMe', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logOut(context) {
      AxiosService.instance
        .post('/user/logout', {}, { withCredentials: true })
        .then(() => {
          context.commit('setMe', null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeNickname({ commit }, payload) {
      AxiosService.instance
        .patch(
          `/user/nickname`,
          { nickname: payload.nickname },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          commit('changeNickname', res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeFollower({ commit }, payload) {
      return AxiosService.instance
        .delete(`/user/${payload.userId}/follower`, {
          withCredentials: true,
        })
        .then(() => {
          commit('removeFollower', {
            userId: payload.userId,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    loadFollowers({ commit, state }, payload) {
      let offset = state.followerList.length;
      if (payload && payload.offset === 0) {
        offset = 0;
      }
      if (state.hasMoreFollower) {
        return AxiosService.instance
          .get(`/user/${state.me?.id}/followers?limit=3&offset=${offset}`, {
            withCredentials: true,
          })
          .then((res) => {
            commit('loadFollowers', {
              data: res.data,
              offset,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    loadFollowings({ commit, state }, payload) {
      let offset = state.followingList.length;
      if (payload && payload.offset === 0) {
        state.hasMoreFollowing = true;
        offset = 0;
      }
      if (state.hasMoreFollowing) {
        return AxiosService.instance
          .get(`/user/${state.me?.id}/followings?limit=3&offset=${offset}`, {
            withCredentials: true,
          })
          .then((res) => {
            commit('loadFollowings', {
              data: res.data,
              offset,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    follow({ commit }, payload) {
      AxiosService.instance
        .post(
          `/user/${payload.userId}/follow`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          commit('addfollowing', {
            userId: res.data,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    unFollow({ commit }, payload) {
      AxiosService.instance
        .delete(`/user/${payload.userId}/following`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          commit('cancleFollowing', {
            userId: res.data,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};

export default new Vuex.Store(store);

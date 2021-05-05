import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import users from '~/store/users';
// import posts from '~/store/posts';

Vue.use(Vuex);

interface RootState {
  data: string;
}

const store: StoreOptions<RootState> = {
  state: {
    data: 'root',
  },
  actions: {
    nuxtServerInit({ dispatch }) {
      // 화면 그려지기 전에 실행
      return dispatch('users/loadUser'); // return 을 해서 Promise종료를 알려야된다.
    },
  },
  modules: {
    users,
    // posts,
  },
};

export default new Vuex.Store(store);

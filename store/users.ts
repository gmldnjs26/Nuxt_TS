import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { $axios } from '~/utils/api';
import { bUser, User } from '~/store/store.interface';

const limit = 3;

@Module({
  name: 'users',
  stateFactory: true,
  namespaced: true,
})
/*
 * TODO:
 * setOther, loadOther fix
 */
export default class Users extends VuexModule {
  public me?: User = undefined;
  public hasMoreFollower: boolean = true;
  public hasMoreFollowing: boolean = true;
  public followerList: Array<bUser> = [];
  public followingList: Array<bUser> = [];

  @Mutation
  setMe(payload: any) {
    (this.me as User) = payload;
  }

  // setOther(state, payload) {
  //   state.other = payload;
  // },
  @Mutation
  setNickname(payload: any) {
    (this.me as User).nickname = payload.nickname;
  }

  @Mutation
  removeFollower(payload: any) {
    let index = this.followerList.findIndex((v) => v.id === payload.userId);
    this.followerList.splice(index, 1); // 팔로워 삭제
    index = (this.me as User).followers.findIndex(
      (v) => v.id === payload.userId
    );
    (this.me as User).followers.splice(index, 1); // 팔로워 삭제
  }

  @Mutation
  removeFollowing(payload: any) {
    let index = this.followingList.findIndex((v) => v.id === payload.userId);
    this.followingList.splice(index, 1); // 팔로잉 취소
    index = ((this.me as User) as User).followings.findIndex(
      (v) => v.id === payload.userId
    );
    ((this.me as User) as User).followings.splice(index, 1); // 팔로잉 취소
  }

  @Mutation
  loadFollowers(payload: any) {
    if (payload.offset === 0) {
      this.followerList = payload.data;
    } else {
      this.followerList = this.followerList.concat(payload.data);
    }
    this.hasMoreFollower = payload.data.length === limit;
  }

  @Mutation
  loadFollowings(payload: any) {
    if (payload.offset === 0) {
      this.followingList = payload.data;
    } else {
      this.followingList = this.followingList.concat(payload.data);
    }
    this.hasMoreFollowing = payload.data.length === limit;
  }

  @Mutation
  addFollowing(payload: any) {
    ((this.me as User) as User).followings.push({
      id: payload.userId,
    });
  }

  @Action({ rawError: true })
  loadUser() {
    $axios
      .get('/user/', {
        withCredentials: true,
      })
      .then((res) => {
        this.setMe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // FIXME:
  // async loadOther({ commit }, payload) {
  //   try {
  //     const res = await $axios.get(
  //       `/user/${payload.userId}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     commit('setOther', res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  @Action({ rawError: true })
  signUp(payload: any) {
    $axios
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
        this.setMe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Action({ rawError: true })
  logIn(payload: any) {
    $axios
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
        this.setMe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Action({ rawError: true })
  logOut() {
    $axios
      .post('/user/logout', {}, { withCredentials: true })
      .then(() => {
        this.setMe(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Action({ rawError: true })
  changeNickname(payload: any) {
    $axios
      .patch(
        `/user/nickname`,
        { nickname: payload.nickname },
        { withCredentials: true }
      )
      .then((res) => {
        this.setNickname(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  @Action({ rawError: true })
  deleteFollower(payload: any) {
    return $axios
      .delete(`/user/${payload.userId}/follower`, {
        withCredentials: true,
      })
      .then(() => {
        this.removeFollower({
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  @Action({ rawError: true })
  fetchFollowers(payload: any) {
    let offset = this.followerList.length;
    if (payload && payload.offset === 0) {
      offset = 0;
    }
    if (this.hasMoreFollower) {
      return $axios
        .get(
          `/user/${(this.me as User)?.id}/followers?limit=3&offset=${offset}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.loadFollowers({
            data: res.data,
            offset,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  @Action({ rawError: true })
  fetchFollowings(payload: any) {
    let offset = this.followingList.length;
    if (payload && payload.offset === 0) {
      this.hasMoreFollowing = true;
      offset = 0;
    }
    if (this.hasMoreFollowing) {
      return $axios
        .get(
          `/user/${(this.me as User)?.id}/followings?limit=3&offset=${offset}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.loadFollowings({
            data: res.data,
            offset,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  @Action({ rawError: true })
  follow(payload: any) {
    $axios
      .post(
        `/user/${payload.userId}/follow`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        this.addFollowing({
          userId: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  @Action({ rawError: true })
  deleteFollowing(payload: any) {
    $axios
      .delete(`/user/${payload.userId}/following`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        this.removeFollowing({
          userId: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

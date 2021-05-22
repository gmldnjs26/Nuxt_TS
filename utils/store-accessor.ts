/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Users from '~/store/users'; // module을 가져와서
import Posts from '~/store/posts';

let UserStore: Users;
let PostStore: Posts;

function initialiseStores(store: Store<any>): void {
	console.log('@@@@@@@@@@@@--InitialiseStores--@@@@@@@@@@@@@@');
	UserStore = getModule(Users, store); // 추가
	PostStore = getModule(Posts, store);
}

export { initialiseStores, UserStore, PostStore };

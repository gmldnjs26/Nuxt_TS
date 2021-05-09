/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Users from '~/store/users'; // module을 가져와서

let UserStore: Users;
function initialiseStores(store: Store<any>): void {
  UserStore = getModule(Users, store); // 추가
}

export { initialiseStores, UserStore };

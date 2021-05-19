
import { ActionTree, Store } from 'vuex';
import { ActionContext } from "vuex/types";
import { Context } from "@nuxt/types";
import { initialiseStores } from '~/utils/store-accessor';

export const state = () => ({});
export type RootState = ReturnType<typeof state>

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ dispatch }) {
    return await dispatch('users/loadUser');
  }
}

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from '~/utils/store-accessor';

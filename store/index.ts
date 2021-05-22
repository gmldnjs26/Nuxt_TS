import { ActionTree, Store } from 'vuex';
import { ActionContext } from 'vuex/types';
// import { Context } from '@nuxt/types';
import { initialiseStores } from '~/utils/store-accessor';

export const state = () => ({});
export type RootState = ReturnType<typeof state>;

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
	nuxtServerInit: async (context: ActionContext<RootState, RootState>) => {
		await context.dispatch('users/loadUser');
	},
};

export * from '~/utils/store-accessor';

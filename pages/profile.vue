<template>
	<div>
		<v-container>
			<v-card style="margin: 10px 0">
				<v-container>
					<v-container>
						<v-subheader>My Profile</v-subheader>
					</v-container>
					<v-form ref="form" v-model="valid" @submit.prevent="onChangeNickname">
						<v-text-field v-model="nickname" label="닉네임" :rules="nicknameRules" required />
						<v-btn color="blue" type="submit">수정</v-btn>
					</v-form>
				</v-container>
			</v-card>
			<v-card style="margin: 10px 0">
				<v-container>
					<v-subheader>팔로잉</v-subheader>
					<follow-list :peoples="following" :remove="removeFollowing" />
					<v-btn
						v-if="hasMoreFollowing"
						dark
						color="green"
						style="width: 100%"
						@click="loadMoreFollowings"
						>더보기</v-btn
					>
				</v-container>
			</v-card>
			<v-card style="margin: 10px 0">
				<v-container>
					<v-subheader>팔로워</v-subheader>
					<follow-list :peoples="follower" :remove="removeFollower" />
					<v-btn
						v-if="hasMoreFollower"
						dark
						color="green"
						style="width: 100%"
						@click="loadMoreFollowers"
						>더보기</v-btn
					>
				</v-container>
			</v-card>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { UserStore } from '~/store';
import FollowList from '~/components/FollowList.vue';
Component.registerHooks(['fetch']);

@Component({
	components: {
		FollowList,
	},
	middleware: ['authenticated'],
})
export default class Profile extends Vue {
	// middleware: 'authenticated',
	valid: boolean = false;
	nickname: string = '';
	nicknameRules: Function[] = [(v: string) => !!v || '닉네임을 입력해주세요.'];

	get following() {
		return UserStore.getFollowingList;
	}

	get follower() {
		return UserStore.getFollowerList;
	}

	get hasMoreFollowing() {
		return UserStore.getHasMoreFollowing;
	}

	get hasMoreFollower() {
		return UserStore.getHasMoreFollower;
	}

	async fetch() {
		await UserStore.fetchFollowers({ offset: 0 });
		await UserStore.fetchFollowings({ offset: 0 });
	}

	onChangeNickname() {
		UserStore.changeNickname({
			nickname: this.nickname,
		});
	}

	removeFollower(userId: string) {
		UserStore.deleteFollower({
			userId,
		});
	}

	removeFollowing(userId: string) {
		UserStore.deleteFollowing({
			userId,
		});
	}

	loadMoreFollowers() {
		UserStore.loadFollowers({ offset: 0 });
	}

	loadMoreFollowings() {
		UserStore.loadFollowings({ offset: 0 });
	}
}
</script>

<style></style>

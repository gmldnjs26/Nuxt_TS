<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt-link to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }}로그인되었습니다.
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <v-row>
          <v-col cols="4"> 팔로잉: {{ me.Followings.length }}</v-col>
          <v-col cols="4"> 팔로워: {{ me.Followers.length }}</v-col>
          <v-col cols="4"> 게시글: {{ me.Posts.length }}</v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({})
export default class LoginForm extends Vue {
  email: string = '';
  password: string = '';
  valid: boolean = false;
  emailRules: Function[] = [
    (v: string) => !!v || '이메일을 입력해주세요.',
    (v: string) => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
  ];

  get me(): boolean {
    // return this.$store.state.users.me;
    return false;
  }

  passwordRules: Function[] = [
    (v: string) => !!v || 'Password를 입력해주세요.',
  ];

  onSubmitForm(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.$store.dispatch('users/logIn', {
        email: this.email,
        password: this.password,
      });
    }
  }

  onLogOut(): void {
    this.$store.dispatch('users/logOut');
  }
}
</script>
<style></style>

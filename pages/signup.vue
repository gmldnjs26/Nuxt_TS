<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-text-field
            v-model="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="패스워드"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="passwordCheck"
            label="패스워드 확인"
            type="password"
            :rules="passwordCheckRules"
            required
          />
          <v-text-field
            v-model="nickname"
            label="닉네임"
            type="nickname"
            :rules="nicknameRules"
            required
          />
          <v-checkbox
            v-model="terms"
            label="동의합니꽈?"
            :rules="[(v) => !!v || '약관에 동의해야 합니다.']"
            required
          />
          <v-btn color="green" type="submit">가입하기</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { UserStore } from '~/store';

@Component({})
export default class SignUp extends Vue {
  valid: boolean = false;
  email: string = '';
  password: string = '';
  passwordCheck: string = '';
  nickname: string = '';
  terms: boolean = false;

  get me() {
    return UserStore.me;
  }

  emailRules: Function[] = [
    (v: string) => !!v || '이메일은 필수입니다.',
    (v: string) => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
  ];

  nicknameRules: Function[] = [(v: string) => !!v || '닉네임은 필수입니다.'];
  passwordRules: Function[] = [(v: string) => !!v || '패스워드는 필수입니다.'];
  passwordCheckRules: Function[] = [
    (v: string) => !!v || '패스워드확인은 필수입니다.',
    (v: string) => v === this.password || '비밀번호가 일치하지 않습니다.',
  ];

  @Watch('me')
  meUpdate(value: boolean) {
    // 값의 변경이 있을경우 value에 값이 들어온다.
    if (value) {
      this.$router.push({
        path: '/',
      });
    }
  }

  onSubmitForm(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.$store
        .dispatch('users/signUp', {
          // dispatch 자체가 Promise
          email: this.email,
          nickname: this.nickname,
          password: this.password,
        })
        .then(() => {
          this.$router.push({
            // nuxt도 내부적으로 router를 쓰기때문에 가능
            path: '/',
          });
        })
        .catch(() => console.log('Failed'));
    } else {
      alert('폼이 유효하지 않습니다.');
    }
  }
}
</script>

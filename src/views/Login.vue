<template>
  <div class="loginPage position-relative">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 loginBg"></div>
        <div class="col-md-6 justify-content-center align-items-center d-flex vh-100 me-auto ms-auto">
          <div class="loginForm">
            <h1 class="text-center py-3">LOG IN</h1>
            <form @submit.prevent="signIn">
              <div class="form-floating py-2">
                <input v-model="user.username" class="form-control" type="email" id="inputEmail" placeholder="name@example.com" />
                <label class="py-4" for="inputEmail">Email Address</label>
              </div>
              <div class="form-floating position-relative py-2">
                <input v-model="user.password" class="form-control" :type="canSeePw ? 'text' : 'password'" id="inputPassword" placeholder="password" />
                <button @click="canSeePw = !canSeePw" class="btn watchPw position-absolute" type="button">
                  <i class="fas fa-eye-slash" v-if="!canSeePw"></i>
                  <i class="fas fa-eye" v-else></i>
                </button>
                <label class="py-4" for="inputPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2 mt-3">
                <i class="fas fa-spinner fa-pulse me-2" v-if="loadingState === 'loging'"></i>
                <template v-if="loadingState === 'loging'">登入中</template>
                <template v-else>登入</template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loadingState: '',
      canSeePw: false,
    };
  },
  methods: {
    signIn() {
      if (!this.user.username || !this.user.password) {
        this.$swal.fire({ icon: 'warning', title: '請勿空白' });
        return;
      }
      this.loadingState = 'loging';
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const { success, message, token, expired } = res.data;
          if (success) {
            document.cookie = `token=${token}; expires=${new Date(expired)}; path=/`;
            const name = this.user.username.split('@')[0];
            // console.log(name);
            sessionStorage.setItem('userId', name);
            this.$router.push('/admin');
          } else {
            this.user.password = '';
            this.loadingState = '';
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/style/all';
.loginBg {
  background: url('../assets/images/loginbg.jpeg') center 80% / cover no-repeat;
  height: 100vh;
  position: absolute;
  z-index: -1;
  background-position: 50% 100%;
}
.loginForm {
  max-width: 500px;
  width: 100%;
  padding: 1rem;
  background-color: rgba(0, 100, 0, 0.2);
}

.watchPw {
  right: 5px;
  top: 20px;
  i {
    font-size: 20px;
  }
}

body.swal2-toast-shown .swal2-container.swal2-center {
  top: 90%;
}
</style>

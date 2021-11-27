<template>
  <div class="container-fluid gx-0">
    <div class="row gx-0">
      <div :class="{ 'close-sidebar': isCollapse }" class="col-md-3 col-lg-2 sidebar text-center bg-primary text-white d-flex flex-column vh-100 position-sticky">
        <div class="sidebarList">
          <h1 class="title my-4 d-none d-md-block fs-28">DashBoard</h1>
          <ul class="list-unstyled">
            <li>
              <router-link to="/admin/products" @click="isCollapse = true" class="link d-flex align-items-center fs-20 text-white justify-content-md-start justify-content-center ps-md-4 ps-0 py-4">
                <i class="fas fa-store d-none d-md-flex"></i>
                <span class="ps-md-3 ps-0">商品管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/orders" @click="isCollapse = true" class="link d-flex align-items-center fs-20 text-white justify-content-md-start justify-content-center ps-md-4 ps-0 py-4">
                <i class="fas fa-list-ul d-none d-md-flex"></i>
                <span class="ps-md-3 ps-0">訂單管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/articles" @click="isCollapse = true" class="link d-flex align-items-center fs-20 text-white justify-content-md-start justify-content-center ps-md-4 ps-0 py-4">
                <i class="far fa-newspaper d-none d-md-flex"></i>
                <span class="ps-md-3 ps-0">文章管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/orders" @click="isCollapse = true" class="link d-flex align-items-center fs-20 text-white justify-content-md-start justify-content-center ps-md-4 ps-0 py-4">
                <i class="fas fa-tag d-none d-md-flex"></i>
                <span class="ps-md-3 ps-0">優惠券管理</span>
              </router-link>
            </li>
            <li class="d-md-none border-top border-1">
              <a href="#" class="link d-flex fs-20 text-white justify-content-center py-4">回到前台</a>
            </li>
            <li class="d-md-none">
              <a href="#" @click.prevent="logout" class="link d-flex fs-20 text-white justify-content-center py-4">登出</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9 col-lg-10">
        <!-- 上方帳號管理 -->
        <div class="bg-light d-flex justify-content-end shadow-sm sticky-top px-4 py-3">
          <div @click="isCollapse = !isCollapse" class="hamburger-wrapper d-md-none position-relative me-auto">
            <div :class="{ active: !isCollapse }" class="hamburger"></div>
          </div>
          <button
            @click="
              {
                isMenuDropdown = !isMenuDropdown;
              }
            "
            type="button"
            class="text-gray d-flex align-items-center"
          >
            <img src="@/assets/images/login.svg" width="35" alt="avatar" />
            <div class="mx-2">{{ user }}</div>
            <span><i :class="{ rotated: isMenuDropdown }" class="far fa-caret-square-down arrowIcon"></i></span>
          </button>
          <ul v-if="isMenuDropdown" class="menu-dropdown list-unstyled shadow-sm">
            <li class="p-2">
              <a href="#" class="small"> <i class="fas fa-home me-1"></i> 回到前台 </a>
            </li>
            <li class="p-2">
              <a href="#" @click.prevent="logout" class="small"> <i class="fas fa-sign-out-alt fa-fw me-1"></i> 登出 </a>
            </li>
          </ul>
        </div>
        <!-- 下方主要內容 -->
        <div class="position-relative py-5 px-4" style="min-height: calc(100vh - 70px)">
          <router-view :user="user" v-if="isLogin"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: '',
      isLogin: false,
      isCollapse: true,
      isMenuDropdown: false,
    };
  },
  methods: {
    checkLoginStatus() {
      this.user = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : 'User';
      const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (mytoken) {
        this.$http.defaults.headers.common.Authorization = mytoken;

        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(api)
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.isLogin = true;
              this.$httpMsgState(res.data, '登入');
            } else {
              this.$httpMsgState(res.data, '登入');
              this.$router.push('login');
            }
          })
          .catch((err) => {
            this.$swal.fire({ icon: 'error', title: err.message });
          });
      } else {
        this.$router.push('login');
      }
    },
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          sessionStorage.removeItem('userId');
          this.$router.push('/');
        }
      });
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style lang="scss">
@import '@/assets/style/all';
</style>

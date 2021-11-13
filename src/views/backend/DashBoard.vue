<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-2 sidebar text-center bg-primary text-white d-flex flex-column vh-100 position-sticky">
        <div class="sidebarList">
          <h1 class="py-3">DashBoard</h1>
          <ul class="list-unstyled">
            <router-link to="/admin/products">
              <li class="link text-white text-center text-md-start py-4 opacity-75">
                <i class="fas fa-store ps-4"></i>
                <span class="ps-3">商品管理</span>
              </li>
            </router-link>
            <router-link to="/admin/orders">
              <li class="link text-white text-center text-md-start py-4">
                <i class="fas fa-list-ul ps-4"></i>
                <span class="ps-3">訂單管理</span>
              </li>
            </router-link>
            <router-link to="/admin/articles">
              <li class="link text-white text-center text-md-start py-4">
                <i class="far fa-newspaper ps-4"></i>
                <span class="ps-3">文章管理</span>
              </li>
            </router-link>
            <router-link to="/admin/orders">
              <li class="link text-white text-center text-md-start py-4">
                <i class="fas fa-tag ps-4"></i>
                <span class="ps-3">優惠券管理</span>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="col-md-9 col-lg-10">
        <div class="bg-light d-flex justify-content-end shadow-sm sticky-top px-4 py-3"></div>
      </div>
      <router-view />
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
    };
  },
  methods: {
    checkLoginStatus() {
      const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (mytoken) {
        this.$http.defaults.headers.common.Authorization = mytoken;

        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(api)
          .then((res) => {
            console.log(res);
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
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style lang="scss">
@import '@/assets/style/all';
.sidebar {
  padding-left: 0;
  padding-right: 0;
  .sidebarList {
    .active {
      opacity: 1;
      color: white;
      background-color: darken($primary, 20%);
    }
    .link:not(.active):hover {
      background-color: darken($primary, 20%);
    }
  }
}
</style>

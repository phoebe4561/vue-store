<template>
  <div class="loginPage position-relative">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 loginBg"></div>
        <div class="col-md-6 justify-content-center align-items-center d-flex vh-100 me-auto ms-auto">
          <div class="loginForm">
            <h1 class="text-center py-3">Login</h1>
            <form>
              <div class="form-floating py-2">
                <input class="form-control" type="email" id="inputEmail" placeholder="name@example.com" />
                <label class="py-4" for="inputEmail">Email Address</label>
              </div>
              <div class="form-floating py-2">
                <input class="form-control" type="password" id="inputPassword" placeholder="password" />
                <label class="py-4" for="inputPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2 mt-3">登入</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.loginBg {
  background: url('../assets/images/temp.jpg') center 80% / cover no-repeat;
  height: 100vh;
  position: absolute;
  z-index: -1;
}
.loginForm {
  max-width: 500px;
  width: 100%;
  padding: 1rem;
  background-color: rgba(0, 100, 0, 0.2);
}
</style>

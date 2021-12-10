import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import httpMsgState from './assets/js/alertMsgState';
import 'bootstrap';

// 加入規則
defineRule('required', required);
defineRule('email', email);
// 設定語系檔案
configure({
  validateOnInput: true, // 調整為輸入字元立即進行驗證
  generateMessage: localize({ zh_TW: zhTW }), // 切換成中文版
});
// 啟用語系
setLocale('zh_TW');

// sweetalert
const options = {
  toast: true,
  padding: '0.5rem',
  //   position: 'top',
  showConfirmButton: false,
  //   confirmButtonColor: 'btn btn-primary',
  //   cancelButtonColor: '#aaa',
  //   cancelButtonText: '取消',
  timer: 2000,
};

const app = createApp(App);
app.use(VueAxios, axios);
app.use(VueSweetalert2, options);
app.use(router);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.config.globalProperties.$httpMsgState = httpMsgState;
app.mount('#app');

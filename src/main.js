import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import router from './router';

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
app.mount('#app');

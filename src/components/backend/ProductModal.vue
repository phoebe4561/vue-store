<template>
  <!-- Modal -->
  <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content backendForm">
        <div class="modal-header bg-primary text-white border-0">
          <h5 class="modal-title fs-28" id="exampleModalLabel">新增商品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <div>
              <div class="mb-3">
                <label for="title" class="form-label text-white">*商品名稱:</label>
                <input v-model="tempProduct.title" type="text" class="backendForm form-control text-secondary" id="title" name="title" placeholder="請輸入商品名稱" />
              </div>
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="category" class="form-label text-white">*分類:</label>

                  <!-- tempProduct.category 沒有值的狀態 -->
                  <select v-if="!tempProduct.category" class="backendForm form-select text-secondary" id="category" @input="categorySelect($event.target.value)">
                    <option value="" disabled selected>請選擇種類</option>
                    <option :value="item" v-for="item in categories" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <!-- tempProduct.category 有值的狀態 -->
                  <select v-else v-model="tempProduct.category" class="backendForm form-select text-secondary" id="category">
                    <option :value="item" v-for="item in categories" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label text-white">*單位:</label>
                  <input type="text" v-model="tempProduct.unit" class="backendForm form-control text-secondary" id="unit" name="unit" placeholder="請輸入單位" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="origin-price" class="form-label text-white">*原價:</label>
                  <input type="number" v-model="tempProduct.origin_price" class="backendForm form-control text-secondary" id="origin-price" name="origin-price" placeholder="請輸入商品原價" />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label text-white">*售價:</label>
                  <input type="number" v-model="tempProduct.price" class="backendForm form-control text-secondary" id="price" name="price" placeholder="請輸入商品售價" />
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label text-white">*商品簡介:</label>
                <textarea type="text" v-model="tempProduct.description" class="backendForm form-control text-secondary" id="description" name="description" placeholder="請輸入商品簡介"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label text-white">*商品內容:</label>
                <textarea type="text" v-model="tempProduct.content" class="backendForm form-control text-secondary" id="content" name="content" placeholder="請輸入商品內容"></textarea>
              </div>
              <div class="mb-3">
                <div class="col-md-6">
                  <label for="inStock" class="form-label text-white">*庫存數量:</label>
                  <input type="number" v-model="tempProduct.inStock" class="backendForm form-control text-secondary" id="inStock" name="inStock" placeholder="請輸入商品庫存數量" />
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label for="is_onSale" class="form-check-label text-white">*是否上架</label>
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled" class="backendForm form-check-input" id="is_onSale" name="is_onSale" />
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-white">*照片上傳:</div>
                <div class="d-flex justify-content-center align-items-center text-white">
                  <div>上傳方法</div>
                  <div>
                    <a @click.prevent="uploadMethod('cloud')" href="#" class="icon-link mx-2"><i class="fas fa-cloud-upload-alt"></i></a>
                    <a @click.prevent="uploadMethod('link')" href="#" class="icon-link"><i class="fas fa-link"></i></a>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <!-- main image -->
                <div class="productModal col-md-3 col-sm-6 mb-3">
                  <label for="mainImg" class="form-label position-relative w-100 mb-0">
                    <div class="mask-fill cursor-pointer border border-1 border-primary">
                      <div class="position-absolute badge bg-secondary">MAIN</div>
                      <img :src="tempProduct.imageUrl" onerror="(this.src = 'https://i.imgur.com/xmiTQFW.png')" class="productModal__img d-inline-block" />
                    </div>
                  </label>

                  <div class="input-group">
                    <!-- 本地上傳 -->
                    <div class="flex-grow-1" v-if="uploadState.cloud">
                      <label for="mainImg" class="text-secondary form-label btn btn-outline-primary w-100 mb-0">上傳圖片</label>
                      <input @change="uploadFile($event.target)" type="file" class="form-control d-none" id="mainImg" name="file-to-upload" />
                    </div>
                    <!-- 輸入網址 -->
                    <input v-if="uploadState.link" type="text" id="mainImg" class="form-control backendForm" placeholder="請輸入圖片url" v-model.trim="tempProduct.imageUrl" />
                    <a
                      href="#"
                      @click.prevent="delImage()"
                      :class="{
                        disabled: tempProduct.imageUrl === '',
                      }"
                      class="btn btn-outline-primary"
                      ><i class="fas fa-trash"></i
                    ></a>
                  </div>
                </div>

                <!-- other images -->
                <div class="productModal col-md-3 col-sm-6 mb-3" v-for="(item, index) in tempProduct.imagesUrl" :key="item.id">
                  <label :for="`otherImg${index}`" class="form-label w-100 mb-0">
                    <div class="mask-fill cursor-pointer border border-1 border-primary">
                      <img :src="item" onerror="(this.src = 'https://i.imgur.com/xmiTQFW.png')" class="productModal__img d-inline-block" />
                    </div>
                  </label>

                  <div class="input-group">
                    <!-- 本地上傳 -->
                    <div class="flex-grow-1" v-if="uploadState.cloud">
                      <label :for="`otherImg${index}`" class="text-secondary form-label btn btn-outline-primary w-100 mb-0">上傳圖片</label>
                      <input @change="uploadFile($event.target, index)" type="file" class="form-control d-none" :id="`otherImg${index}`" name="file-to-upload" />
                    </div>
                    <!-- 輸入網址 -->
                    <input v-if="uploadState.link" type="text" :id="`otherImg${index}`" class="form-control backendForm" placeholder="請輸入圖片url" v-model.trim="tempProduct.imagesUrl[index]" />
                    <a
                      href="#"
                      @click.prevent="delImage(index)"
                      :class="{
                        disabled: tempProduct.imagesUrl[index] === '',
                      }"
                      class="btn btn-outline-primary"
                      ><i class="fas fa-trash"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
          <button type="button" @click="$emit('update-products', tempProduct)" class="btn btn-primary text-white">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = ['', '', '', '', ''];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {}, // 單向數據流 不可直接更動外層data
      categories: ['室內植物', '栽培介質', '組合盆栽'],
      uploadState: {
        cloud: true,
        link: false,
      },
    };
  },
  methods: {
    uploadFile(target, index) {
      const file = target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          if (index === undefined) {
            this.tempProduct.imageUrl = res.data.imageUrl;
          } else {
            this.tempProduct.imagesUrl[index] = res.data.imageUrl;
          }
        }
      });
    },
    uploadMethod(state) {
      // 切換上傳方式
      if (state === 'cloud') {
        this.uploadState.cloud = true;
        this.uploadState.link = false;
      } else {
        this.uploadState.cloud = false;
        this.uploadState.link = true;
      }
    },
    delImage(index) {
      // 刪除 imagesUrl 陣列最後一筆資料
      this.tempProduct.imagesUrl[index] = '';
      if (index === undefined) {
        this.tempProduct.imageUrl = '';
      }
    },
    hideModal() {
      this.modal.hide();
    },
    showModal() {
      this.modal.show();
    },
    categorySelect(value) {
      this.tempProduct.category = value;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

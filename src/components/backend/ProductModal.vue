<template>
  <!-- Modal -->
  <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content backendForm">
        <div class="modal-header bg-primary text-white border-0">
          <h5 class="modal-title fs-28" id="exampleModalLabel">新增商品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <ul class="nav nav-pills mt-3 justify-content-center" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              @click="showNext = false"
              class="nav-link active"
              id="content-tab"
              data-bs-toggle="pill"
              data-bs-target="#content"
              type="button"
              role="tab"
              aria-controls="content"
              aria-selected="true"
            >
              商品資訊
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="showNext = true" class="nav-link" id="image-tab" data-bs-toggle="pill" data-bs-target="#image" type="button" role="tab" aria-controls="image" aria-selected="false">
              照片上傳
            </button>
          </li>
        </ul>
        <div class="modal-body">
          <div class="tab-content" id="myTabContent">
            <Form ref="form" v-slot="{ errors }" @submit="$emit('update-products', tempProduct)">
              <div :class="{ 'd-none': showNext }" class="tab-pane fade show active" id="content" role="tabpanel" aria-labelledby="content-tab">
                <div class="mb-3">
                  <label for="title" class="form-label text-white">*商品名稱:</label>
                  <Field
                    v-model="tempProduct.title"
                    type="text"
                    class="backendForm form-control text-secondary"
                    id="title"
                    name="商品名稱"
                    :class="{ 'is-invalid': errors['商品名稱'] }"
                    rules="required"
                    placeholder="請輸入商品名稱"
                  />
                  <error-message name="商品名稱" class="invalid-feedback"></error-message>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="category" class="form-label text-white">*分類:</label>
                    <!-- tempProduct.category 沒有值的狀態 -->
                    <template v-if="!tempProduct.category">
                      <Field
                        as="select"
                        name="分類"
                        :class="{ 'is-invalid': errors['分類'] }"
                        rules="required"
                        class="backendForm form-select text-secondary"
                        id="category"
                        @input="categorySelect($event.target.value)"
                      >
                        <option value="" disabled selected>請選擇分類</option>
                        <option :value="item" v-for="item in categories" :key="item">
                          {{ item }}
                        </option>
                      </Field>
                      <error-message name="分類" class="invalid-feedback"></error-message>
                    </template>
                    <!-- tempProduct.category 有值的狀態 -->
                    <Field
                      v-else
                      as="select"
                      name="分類"
                      :class="{ 'is-invalid': errors['分類'] }"
                      rules="required"
                      v-model="tempProduct.category"
                      class="backendForm form-select text-secondary"
                      id="category"
                    >
                      <option :value="item" v-for="item in categories" :key="item">
                        {{ item }}
                      </option>
                    </Field>
                  </div>
                  <div class="col-md-6">
                    <label for="unit" class="form-label text-white">*單位:</label>
                    <Field
                      type="text"
                      v-model="tempProduct.unit"
                      :class="{ 'is-invalid': errors['單位'] }"
                      rules="required"
                      class="backendForm form-control text-secondary"
                      id="unit"
                      name="單位"
                      placeholder="請輸入單位"
                    />
                    <error-message name="單位" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="origin-price" class="form-label text-white">*原價:</label>
                    <Field
                      type="number"
                      v-model="tempProduct.origin_price"
                      :class="{ 'is-invalid': errors['原價'] }"
                      rules="required"
                      class="backendForm form-control text-secondary"
                      id="origin-price"
                      name="原價"
                      placeholder="請輸入商品原價"
                    />
                    <error-message name="原價" class="invalid-feedback"></error-message>
                  </div>
                  <div class="col-md-6">
                    <label for="price" class="form-label text-white">*售價:</label>
                    <Field
                      type="number"
                      v-model="tempProduct.price"
                      :class="{ 'is-invalid': errors['售價'] }"
                      rules="required"
                      class="backendForm form-control text-secondary"
                      id="price"
                      name="售價"
                      placeholder="請輸入商品售價"
                    />
                    <error-message name="售價" class="invalid-feedback"></error-message>
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
                    <Field
                      type="number"
                      v-model="tempProduct.inStock"
                      :class="{ 'is-invalid': errors['庫存數量'] }"
                      rules="required"
                      class="backendForm form-control text-secondary"
                      id="inStock"
                      name="庫存數量"
                      placeholder="請輸入商品庫存數量"
                    />
                    <error-message name="庫存數量" class="invalid-feedback"></error-message>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="is_onSale" class="form-check-label text-white">*是否上架</label>
                  <div class="form-check checkbox-btn">
                    <input type="checkbox" class="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled" id="is_onSale" name="is_onSale" />
                    <div class="mytoggler" data-label-checked="Yes" data-label-unchecked="No"></div>
                  </div>
                </div>
              </div>

              <div :class="{ 'd-none': !showNext }" class="tab-pane fade" id="image" role="tabpanel" aria-labelledby="image-tab">
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

              <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary text-white">送出</button>
              </div>
            </Form>
          </div>
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
      showNext: false,
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.resetForm();
      // 這裡 reset 是避免暫存已被刪除的資料
    },
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

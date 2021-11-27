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
                  <select v-model="tempProduct.category" type="text" class="backendForm form-select text-secondary" id="category" name="category">
                    <option value="" disabled>請選擇分類</option>
                    <!--why 無法帶出預設值 -->
                    <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label text-white">*單位:</label>
                  <input type="number" v-model="tempProduct.unit" class="backendForm form-control text-secondary" id="unit" name="unit" placeholder="請輸入單位" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="origin-price" class="form-label text-white">*原價:</label>
                  <input type="number" v-model="tempProduct.origin_price" class="backendForm form-control text-secondary" id="origin-price" name="origin-price" placeholder="請輸入商品原價" />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label text-white">*售價:</label>
                  <input type="text" v-model="tempProduct.origin" class="backendForm form-control text-secondary" id="price" name="price" placeholder="請輸入商品售價" />
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
                  <label for="num" class="form-label text-white">*庫存數量:</label>
                  <input type="number" v-model="tempProduct.num" class="backendForm form-control text-secondary" id="num" name="num" placeholder="請輸入商品庫存數量" />
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label for="is_onSale" class="form-check-label text-white">*是否上架</label>
                  <input type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled" class="backendForm form-check-input" id="is_onSale" name="is_onSale" />
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
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {}, // 單向數據流 不可直接更動外層data
      categories: ['室內植栽', '栽培介質', '組合盆栽'],
    };
  },
  methods: {
    hideModal() {
      this.modal.hide();
    },
    showModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

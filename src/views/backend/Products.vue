<template>
  <button type="button" @click="openModal('CREATE')" class="addItem-fixed rounded-circle shadow d-md-none">
    <i class="fas fa-plus"></i>
  </button>
  <div class="p-1">
    <div class="d-flex justify-content-md-between align-items-center mb-4 justify-content-center">
      <h2>商品管理列表</h2>
      <button @click="openModal('CREATE')" type="button" class="btn btn-primary text-white d-none d-md-block">新增商品</button>
    </div>
    <div class="p-2 shadow rounded-4">
      <div class="table-responsive text-nowrap scroll-inner">
        <table class="table table-hover align-middle">
          <thead>
            <tr class="bg-white">
              <!-- <th scope="col" width="50" class="d-none d-md-table-cell">編號</th> -->
              <th scope="col" width="50">編號</th>
              <th scope="col" width="130">類別</th>
              <th scope="col" width="250">商品名稱</th>
              <th scope="col" width="120">原價</th>
              <th scope="col" width="120">售價</th>
              <th scope="col" width="120">庫存</th>
              <th scope="col" width="100" class="text-center">是否啟用</th>
              <th scope="col" width="80"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <!-- <th scope="row" class="d-none d-md-table-cell">1</th> -->
              <td>{{ item.num }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.inStock }}/{{ item.unit }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <input type="checkbox" :id="item.id" :true-value="1" :false-value="0" :checked="item.is_enabled" v-model="item.is_enabled" />
                </div>
              </td>
              <td class="text-end">
                <div class="btn-group">
                  <button type="button" @click="openModal('EDIT', item)" class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-edit fa-fw"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-trash-alt fa-fw"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ProductModal :product="tempProduct" @update-products="updateProducts" ref="productModal"></ProductModal>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      status: '',
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.$http
        .get(api)
        .then((res) => {
          const { success, products, pagination } = res.data;
          if (success) {
            this.products = products;
            this.pagination = pagination;
            // console.log(products);
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    openModal(status, item) {
      if (status === 'CREATE') {
        this.tempProduct = {};
      } else if (status === 'EDIT') {
        this.tempProduct = { ...item };
        // console.log(this.tempProduct);
      }
      this.status = status;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProducts(item) {
      // console.log(item);
      this.tempProduct = item;
      let api;
      let httpMethod;
      // 新增品項
      if (this.status === 'CREATE') {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        httpMethod = 'post';
      } else if (this.status === 'EDIT') {
        // 編輯品項
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        productComponent.hideModal();
        this.getProducts();
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

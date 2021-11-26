<template>
  <button type="button" class="addItem-fixed rounded-circle shadow d-md-none">
    <i class="fas fa-plus"></i>
  </button>
  <div class="p-1">
    <div class="d-flex justify-content-md-between align-items-center mb-4 justify-content-center">
      <h2>商品管理列表</h2>
      <button type="button" class="btn btn-primary text-white d-none d-md-block">新增商品</button>
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
              <td>
                <div class="d-flex justify-content-center">
                  <input type="checkbox" :id="item.id" :true-value="1" :false-value="0" :checked="item.is_enabled" v-model="item.is_enabled" />
                </div>
              </td>
              <td class="text-end">
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm">
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
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
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
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
@import '@/assets/style/all';

.addItem-fixed {
  width: 48px;
  height: 48px;
  right: 24px;
  bottom: 24px;
  background: darken($primary, 30%);
  color: #eee;
  position: fixed;
  z-index: 100;
  transition: 0.5s;
}

@include media-breakpoint-down(md) {
  .table-responsive,
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  .table > :not(:first-child) {
    border-top: none;
  }

  .table {
    margin-bottom: 0;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr:nth-child(even) {
    border: 2px solid lighten($primary, 30%);
  }

  tr:nth-child(odd) {
    background: lighten($primary, 30%);
  }

  td {
    border: none;
    border-bottom: 2px solid #eee;
    position: relative;
    padding-left: 30% !important;
    text-align: left !important;
  }

  td:before {
    position: absolute;
    left: 1rem;
    font-weight: bold;
  }
  td:nth-of-type(1):before {
    content: '編號';
    color: $primary;
  }
  td:nth-of-type(2):before {
    content: '類別';
    color: $primary;
  }
  td:nth-of-type(3):before {
    content: '名稱';
    color: $primary;
  }
  td:nth-of-type(4):before {
    content: '售價';
    color: $primary;
  }
  td:nth-of-type(5):before {
    content: '原價';
    color: $primary;
  }
  td:nth-of-type(6):before {
    content: '是否啟用';
    color: $primary;
  }
}

.scroll-inner {
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparentize(#ccc, 0.7);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: $primary;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
}
</style>

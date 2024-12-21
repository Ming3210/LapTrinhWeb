import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "HomePage" */ "@/views/client/HomePage.vue"),
    alias: ["/home-page"],
    children: [
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "ProductDetail" */ "@/views/client/Main.vue"
          ),
      },
      {
        path: "product-detail/:id",
        component: () =>
          import(
            /* webpackChunkName: "ProductDetail" */ "@/views/client/ProductDetail.vue"
          ),
      },
      {
        path: "category",
        component: () =>
          import(
            /* webpackChunkName: "Category" */ "@/views/client/Category.vue"
          ),
      },
      {
        path: "cart",
        component: () =>
          import(/* webpackChunkName: "Cart" */ "@/views/client/Cart.vue"),
      },
    ],
  },
  {
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "@/views/auth/Register.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/auth/Login.vue"),
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "Admin" */ "@/views/admin/Admin.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/admin/Dashboard.vue"
          ),
        alias: ["dashboard"],
        children: [
          {
            path: "all-category",
            component: () =>
              import(
                /* webpackChunkName: "AllCategory" */ "@/views/admin/AllCategory.vue"
              ),
          },
          {
            path: "check-product",
            component: () =>
              import(
                /* webpackChunkName: "AllProduct" */ "@/views/admin/AllProduct.vue"
              ),
          },
          {
            path: "cart",
            component: () =>
              import(
                /* webpackChunkName: "CartAdmin" */ "@/views/admin/CartAdmin.vue"
              ),
          },
          {
            path: "add-product",
            component: () =>
              import(
                /* webpackChunkName: "AddProduct" */ "@/views/admin/AddProduct.vue"
              ),
          },
          {
            path: "check-user",
            component: () =>
              import(
                /* webpackChunkName: "AllCustomer" */ "@/views/admin/AllCustomer.vue"
              ),
          },
          // {
          //   path: "add-user",
          //   component: () =>
          //     import(
          //       /* webpackChunkName: "AddCustomer" */ "@/views/AddCustomer.vue"
          //     ),
          // },
          {
            path: "add-category",
            component: () =>
              import(
                /* webpackChunkName: "AddCategory" */ "@/views/admin/AddCategory.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

<template>
  <a-layout>
    <a-layout-sider
      :collapsible="true"
      :collapsed="collapsed"
      @collapse="setCollapsed"
    >
      <div class="flex justify-center my-6">
        <div
          class="demo-logo-vertical rounded-md flex justify-center items-center bg-white h-12 w-4/5"
        >
          <div class="flex justify-center items-center">
            <CarOutlined style="font-size: 25px" />
            <p v-if="!collapsed">
              <span class="font-bold text-red-600">RESCUE</span>
              <span class="font-bold text-sky-400">-ACE</span>
            </p>
          </div>
        </div>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['']"
        @click="handleMenuClick"
      >
        <a-menu-item key="">
          <DashboardOutlined />
          <span>Dashboard</span>
        </a-menu-item>

        <a-sub-menu key="customer">
          <template #title>
            <span>
              <UserOutlined />
              <span>Customer Management</span>
            </span>
          </template>
          <a-menu-item key="check-user">
            <TeamOutlined />
            <span>All customer</span>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="product">
          <template #title>
            <span>
              <ShoppingOutlined />
              <span>Product Management</span>
            </span>
          </template>
          <a-menu-item key="add-product">
            <PlusSquareOutlined />
            <span>Add new product</span>
          </a-menu-item>
          <a-menu-item key="check-product">
            <UnorderedListOutlined />
            <span>All product</span>
          </a-menu-item>
          <a-menu-item key="add-category">
            <FolderAddOutlined />
            <span>Add new category</span>
          </a-menu-item>
          <a-menu-item key="all-category">
            <FolderOutlined />
            <span>All category</span>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="cart">
          <ShoppingCartOutlined />
          <span>Cart Management</span>
        </a-menu-item>

        <a-menu-item key="logout">
          <LogoutOutlined />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header :style="{ background: colorBgContainer }" class="p-0">
        <a-button
          type="text"
          @click="setCollapsed(!collapsed)"
          style="font-size: 16px; width: 64px; height: 64px"
          class="text-[16px] w-[64px] h-[64px]"
        >
          <template v-if="collapsed">
            <MenuUnfoldOutlined />
          </template>
          <template v-else>
            <MenuFoldOutlined />
          </template>
        </a-button>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import {
  CarOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
  FolderAddOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const collapsed = ref(false);
const colorBgContainer = "#f0f2f5";
const borderRadiusLG = "8px";

const setCollapsed = (value) => {
  collapsed.value = value;
};
const router = useRouter();

const handleMenuClick = ({ key }) => {
  if (key === "logout") {
    message.success("Logging out...");
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } else if (key === "") {
    router.push("/admin");
  } else {
    router.push(`/admin/${key}`);
  }
};

const contentStyle = {
  margin: "24px 16px",
  padding: "24px",
  minHeight: "280px",
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
};
</script>

<style scoped>
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.items-center {
  align-items: center;
}
.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.demo-logo-vertical {
  text-align: center;
}
.bg-white {
  background-color: white;
}
.rounded-md {
  border-radius: 0.375rem;
}
.font-bold {
  font-weight: bold;
}
.text-red-600 {
  color: #dc2626;
}
.text-sky-400 {
  color: #38bdf8;
}
.ant-layout {
  min-height: 100vh;
}
.ant-layout-sider {
  min-width: 350px !important;
  max-width: 350px !important;
  width: 350px !important;
  flex: 0 0 350px !important;
  background-color: rgb(64, 35, 232) !important;
}
.ant-layout-sider-collapsed {
  flex: 0 0 80px !important;
  min-width: 80px !important;
  max-width: 80px !important;
  width: 80px !important;
  background-color: rgb(64, 35, 232) !important;
}
.ant-menu {
  background-color: rgb(64, 35, 232) !important;
}
</style>
<style>
.ant-layout-sider-trigger {
  display: none !important;
}
</style>

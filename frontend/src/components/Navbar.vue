<template>
  <nav class="bg-white w-full fixed z-20 top-0 left-0 drop-shadow-lg py-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center flex-1">
        <!-- KMITL Logo Image -->
        <div class="w-[10rem] ml-3">
          <a href="/">
            <img src="../assets/images/it-logo.png" alt="IT logo" />
          </a>
        </div>
        <!-- KMITL Logo Image -->

        <!-- Nav Items -->
        <div class="ml-6">
          <a
            v-for="item in navItems"
            :key="item.tabName"
            :class="$route.path == item.path ? 'text-primary' : 'text-gray-400'"
            class="durarion-300 hover:text-primary ml-4 items-center inline-flex"
            :href="item.path"
          >
            <span>{{ item.tabName }}</span>
          </a>
        </div>
        <!-- Nav Items -->
      </div>

      <!-- User Information -->
      <div v-if="!loggedIn">
        <button v-if="!loggedIn" @click="login" class="login-btn">
          เข้าสู่ระบบด้วย Google
        </button>
      </div>
      <div v-else class="mr-3 text-primary">
        <span>{{ name }}</span>
        <span> | </span>
        <a
          class="text-rose-700 hover:text-rose-300 cursor-pointer"
          @click="logout"
          >ออกจากระบบ</a
        >
      </div>
      <!-- User Information -->
    </div>
  </nav>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      loggedIn: localStorage.getItem("loggedIn"),
      name: localStorage.getItem("name"),
      // Add New Tab Navigation here
      navItems: [
        {
          tabName: "ตารางเรียน",
          path: "/table",
        },
        {
          tabName: "ภาคเรียน",
          path: "/semester",
        },
        {
          tabName: "หลักสูตร",
          path: "/curriculum",
        },
        {
          tabName: "วิชา",
          path: "/subject",
        },
        {
          tabName: "อาจารย์",
          path: "/lecturer",
        },
        {
          tabName: "ห้องเรียน",
          path: "/room",
        },
      ],
    };
  },
  methods: {
    login() {
      window.location.href = "/auth/google";
      localStorage.loggedIn = true;
    },
    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("loggedIn");
      window.location.reload();
    },
  },
  mounted() {
    if (Object.keys(this.$route.query).length != 0) {
      localStorage.name = this.$route.query.name;
    }
  },
});
</script>
<style scoped>
.login-btn {
  @apply mr-3 
  p-2 
  rounded-lg 
  duration-300 
  text-sm 
  bg-primary 
  text-white 
  hover:bg-white 
  hover:text-primary 
  hover:border-primary border;
}
</style>

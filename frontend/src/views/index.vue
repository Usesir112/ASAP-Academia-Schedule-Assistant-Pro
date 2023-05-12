<template>
  <div class="flex justify-center min-h-screen items-center">
    <div class="flex flex-col">
      <img src="../assets/images/SVG/Asset 1.svg" alt="logo" />
      <p class="text-3xl text-gray-400 mt-2">
        <span class="text-primary">A</span>cademia
        <span class="text-primary">S</span>chedule
        <span class="text-primary">A</span>ssistant
        <span class="text-primary">P</span>ro
      </p>
      <p class="text-2xl text-gray-400 mt-2 typing-demo">
        เว็บแอพพลิเคชันช่วยจัดการตารางสอน
      </p>
      <div class="mt-5 text-center">
        <button
          v-if="!loggedIn"
          @click="login"
          class="button border border-primary text-primary hover:bg-primary hover:text-white"
        >
          เข้าสู่ระบบด้วย Google
        </button>
        <button v-else @click="logout" class="button-danger-outlined">
          ออกจากระบบ
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loggedIn: localStorage.getItem("loggedIn"),
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    login() {
      window.location.href = "/auth/google";
      localStorage.loggedIn = true;
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      window.location.reload();
    },
  },
  mounted() {
    if (Object.keys(this.$route.query).length != 0) {
      localStorage.name = this.$route.query.name;
    }
  },
};
</script>
<style scoped>
.typing-demo {
  width: 24ch;
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>

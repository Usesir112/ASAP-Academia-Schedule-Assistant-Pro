<template>
  <div
    class="duration-300 flex items-center justify-center absolute w-full h-full z-10"
  >
    <div
      class="border border-rose-500 bg-white w-[80%] h-[80%] rounded-lg shadow-lg flex flex-col justify-center"
    >
      <div>
        <p class="text-4xl ml-5 text-rose-500">ระวัง !</p>
        <p class="ml-5 text-gray-400">
          คุณกำลังจะลบ
          <span class="text-rose-500 font-bold"><slot /></span>
          สิ่งนี้จะหายไปถาวรนะ...
        </p>
      </div>
      <div class="mx-5 mt-5 flex justify-end">
        <button
          data-te-ripple-init
          data-te-ripple-color="light"
          @click="cancelHandle"
          class="border button text-gray-400 hover:shadow hover:bg-gray-100"
        >
          ยกเลิก
        </button>
        <button
          data-te-ripple-init
          data-te-ripple-color="light"
          @click="confirmHandle"
          class="ml-3 button bg-rose-500 text-white hover:bg-rose-400 hover:shadow"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    cancelHandle() {
      this.$emit("cancel");
    },
    confirmHandle() {
      this.$emit("confirm");
    },
  },
});
</script>

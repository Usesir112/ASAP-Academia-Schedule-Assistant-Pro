<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <div>
    <div class="flex justify-between">
      <!-- Header Topic -->
      <div>
        <h1 class="text-5xl text-primary font-bold">{{ props.title }}</h1>
        <p class="mt-3 text-gray-400">จัดการข้อมูลของ{{ props.title }}ต่างๆที่มีอยู่</p>
      </div>
      <!-- Header Topic -->

      <!-- Right Header -->
      <div class="flex items-center">

        <!-- Search -->
        <div class="relative m-5">
          <input
            type="text"
            id="search"
            v-model="inputValue"
            @input="emitInputChange"
            class="input text-md text-primary border-1 peer border-[#4669B4] focus:border-primary"
            placeholder=" "
          />
          <label
            for="search"
            class="input-label text-md peer-focus:text-primary"
            >รายชื่อ{{ props.title }}</label
          >
        </div>
        <!-- Search -->

        <!-- Button -->
        <div>
          <button
            data-te-ripple-init
            data-te-ripple-color="light"
            data-te-toggle="modal"
            data-te-target="#addObject"
            class="button shadow-md hover:shadow-xl hover:bg-primary-100 text-white bg-primary"
          >
            <span class="mr-3"> เพิ่มข้อมูล{{ props.title }} </span>
            <!-- <font-awesome-icon icon="fa-solid fa-plus" /> -->
          </button>
        </div>
        <!-- Button -->
      </div>
      <!-- Right Header -->
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  data() {
    return {
      inputValue: "",
    }
  },
  methods: {
    emitInputChange() {
      this.$emit('input-change', this.inputValue);
    }
  },
});
</script>

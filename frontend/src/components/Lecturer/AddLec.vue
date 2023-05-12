<template>
  <ModalTemplete id="addObject" name="เพิ่มข้อมูลของอาจารย์ผู้สอน">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">

        <!-- Lecturer name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          id="name"
          class="w-1/2"
          >ชื่ออาจารย์</InputTemplete
        >
        <!-- Lecturer name -->

        <!-- Lecturer Email -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="email"
          id="email"
          class="w-1/2"
        >
          อีเมล</InputTemplete
        >
        <!-- Lecturer Email -->
      </div>
      <!-- Button Group -->
      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
      >
        <button
          type="button"
          @click="addEmit"
          data-te-ripple-init
          data-te-modal-dismiss
          data-te-ripple-color="light"
          class="button mr-3 bg-teal-500 text-white hover:bg-teal-400"
        >
          เพิ่มข้อมูลอาจารย์
        </button>
      </div>

      <!-- Button Group -->
    </div>
  </ModalTemplete>
</template>
<script>
import { defineComponent } from "vue";

import InputTemplete from "../InputTemplete.vue";
import ModalTemplete from "../Modal/Templete.vue";

export default defineComponent({
  components: {
    InputTemplete,
    ModalTemplete,
  },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    // Send data to the View page
    addEmit() {
      this.$emit("addObject", {
        name: this.name,
        email: this.email,
      });
    },

    // To Check the value that return from `InputTemplete` component
    valueChangeHandle(data) {
      switch (data.key) {
        // Name
        case "name":
          this.name = data.value;
          break;

        //email
        case "email":
          this.email = data.value;
          break;
      }
    },
  },
});
</script>

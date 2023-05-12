<template>
  <ModalTemplete id="addObject" name="เพิ่มหลักสูตร">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">
        <!-- Curriculum code -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="code"
          id="code"
          class="w-[15rem]"
          >รหัสหลักสูตร</InputTemplete
        >
        <!-- Curriculum code -->

        <!-- Curriculum name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          id="name"
          class="w-full"
          >ชื่อหลักสูตร</InputTemplete
        >
        <!-- Curriculum name -->

        <!-- Curriculum Year -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="calYear"
          id="calYear"
          class="w-auto"
        >
          ปีการศึกษา</InputTemplete
        >
        <!-- Curriculum Year -->
      </div>
      <!-- Subject Description -->
      <div class="border-t border-gray-100">
        <div class="relative m-5">
          <textarea
            id="description"
            placeholder=" "
            class="w-full input peer text-primary disabled:text-primary-500 border-none shadow"
            v-model="descr"
            :disabled="disabledStatus"
          />
          <label
            class="input-label text-md peer-focus:text-primary"
            for="description"
            >รายละเอียด</label
          >
        </div>
      </div>
      <!-- Subject Description -->
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
          เพิ่มหลักสูตร
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
      code: "",
      name: "",
      calYear: "",
      descr: "",
    };
  },
  methods: {
    // Send data to the View page
    addEmit() {
      this.$emit("addObject", {
        code: this.code,
        name: this.name,
        calYear: this.calYear,
        descr: this.descr,
      });
    },

    // To Check the value that return from `InputTemplete` component
    valueChangeHandle(data) {
      switch (data.key) {
        // Code
        case "code":
          this.code = data.value;
          break;

        // Name
        case "name":
          this.name = data.value;
          break;

        //calYear
        case "calYear":
          this.calYear = data.value;
          break;
      }
    },
  },
});
</script>

<template>
  <ModalTemplete id="addObject" name="เพิ่มภาคเรียน">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">

        <!-- Semester name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          id="name"
          class="w-1/2"
          >ภาคเรียน</InputTemplete
        >
        <!-- Semester name -->

        <!-- Semester year -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="year"
          id="year"
          class="w-1/2"
        >
          ปีการศึกษา</InputTemplete
        >
        <!-- Semester year -->
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
          เพิ่มข้อมูลภาคเรียน
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
      year: "",
    };
  },
  methods: {
    // Send data to the View page
    addEmit() {
      this.$emit("addObject", {
        name: this.name,
        year: this.year,
      });
    },

    // To Check the value that return from `InputTemplete` component
    valueChangeHandle(data) {
      switch (data.key) {
        // Name
        case "name":
          this.name = data.value;
          break;

        // Year
        case "year":
          this.year = data.value;
          break;
      }
    },
  },
});
</script>

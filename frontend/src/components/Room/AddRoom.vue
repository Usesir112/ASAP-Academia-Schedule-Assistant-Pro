<template>
  <ModalTemplete id="addObject" name="เพิ่มห้องเรียน">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">
        <!-- Room name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          id="name"
          class="w-1/3"
          >ห้องเรียน</InputTemplete
        >
        <!-- Room name -->

        <!-- Room Amount -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="amount"
          id="amount"
          class="w-1/3"
        >
          จำนวน</InputTemplete
        >
        <!-- Room Amount -->

        <!-- Room type -->
        <div class="relative mr-3 w-[25%]">
          <select
            id="type"
            name="type"
            v-model="type"
            class="input text-primary peer"
          >
            <option v-for="typeItem in types" :key="typeItem" :value="typeItem">
              {{ typeItem }}
            </option>
          </select>
          <label for="type" class="input-label text-md peer-focus:text-primary">
            ประเภท
          </label>
        </div>
        <!-- Room type -->
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
          เพิ่มข้อมูลห้องเรียน
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
      amount: "",
      type: "",
      types: ["บรรยาย", "แลป"],
    };
  },
  methods: {
    // Send data to the View page
    addEmit() {
      this.$emit("addObject", {
        name: this.name,
        amount: this.amount,
        type: this.type,
      });
    },

    // To Check the value that return from `InputTemplete` component
    valueChangeHandle(data) {
      switch (data.key) {
        // Name
        case "name":
          this.name = data.value;
          break;

        // amount
        case "amount":
          this.amount = data.value;
          break;
      }
    },
  },
});
</script>

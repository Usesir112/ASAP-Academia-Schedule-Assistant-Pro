<template>
  <ModalTemplete id="addObject" name="เพิ่มวิชา">
    <div class="items-center px-4 border border-t border-gray-50">
      <!-- Colum One -->
      <div class="flex m-5">
        <!-- Subject code -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="code"
          id="code"
          class="w-[15rem]"
          >รหัสวิชา</InputTemplete
        >
        <!-- Subject code -->
        <!-- Subject name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          id="name"
          class="w-full"
          >ชื่อวิชา</InputTemplete
        >
        <!-- Subject name -->

        <!-- Subject Study Year -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="stuYear"
          id="stuYear"
          class="w-auto"
        >
          ชั้นปี</InputTemplete
        >
        <!-- Subject Study Year -->
      </div>
      <!-- Colum One -->
      <!-- Column Two -->
      <div class="flex m-5">
        <!-- Subject Curriculum -->
        <div class="relative mr-3 w-[25%]">
          <select
            id="selectCur"
            name="selectCur"
            v-model="curID"
            class="input text-primary peer"
          >
            <option v-for="item in curriculums" :key="item.id" :value="item.id">
              {{ item.code }} / {{ item.calYear }}
            </option>
          </select>
          <label
            for="selectCur"
            class="input-label text-md peer-focus:text-primary"
          >
            หลักสูตร / หลักสูตรปี
          </label>
        </div>
        <!-- Subject Curriculum -->

        <!-- Subject Unit -->
        <div class="relative mr-3 w-[25%]">
          <select
            id="unit"
            name="unit"
            v-model="unit"
            class="input text-primary peer"
          >
            <option v-for="unitItem in units" :key="unitItem" :value="unitItem">
              {{ unitItem }}
            </option>
          </select>
          <label for="unit" class="input-label text-md peer-focus:text-primary">
            หน่วยกิต
          </label>
        </div>
        <!-- Subject Unit -->

        <!-- Subject Cetagory -->
        <div class="relative mr-3 w-[25%]">
          <select
            id="cetagory"
            name="cetagory"
            v-model="category"
            class="input text-primary peer"
          >
            <option
              v-for="catItem in categories"
              :key="catItem"
              :value="catItem"
            >
              {{ catItem }}
            </option>
          </select>
          <label
            for="cetagory"
            class="input-label text-md peer-focus:text-primary"
          >
            ประเภทวิชา
          </label>
        </div>
        <!-- Subject Cetagory -->

        <!-- Subject Branch -->
        <div class="relative mr-3 w-[25%]">
          <select
            id="branch"
            name="branch"
            v-model="branch"
            class="input text-primary peer"
          >
            <option
              v-for="branchItem in branches"
              :key="branchItem"
              :value="branchItem"
            >
              {{ branchItem }}
            </option>
          </select>
          <label
            for="branch"
            class="input-label text-md peer-focus:text-primary"
          >
            สาขา
          </label>
        </div>
        <!-- Subject Branch -->
      </div>
      <!-- Column Two -->

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
          เพิ่มวิชา
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
  props: {
    curriculums: Object,
  },
  components: {
    InputTemplete,
    ModalTemplete,
  },
  data() {
    return {
      code: "",
      name: "",
      curID: "",
      unit: "",
      category: "",
      branch: "",
      stuYear: "",
      descr: "",
      units: [
        "3(3-0-6)", // Theory
        "3(2-2-5)", // Lab
        "1(0-2-1)", // Statistical
        "1(1-0-0)", // Seminar
        "3(0-9-0)", // Project
        "6(0-35-0)", // Cooperative
      ],
      categories: [
        "กลุ่มวิชาพื้นฐาน",
        "กลุ่มวิชาด้านภาษาและการสื่อสาร",
        "วิชาเฉพาะ",
        "กลุ่มวิชาตามเกณฑ์ของคณะ",
        "Project_Software",
        "Project_Network",
        "Project_Software",
      ],
      branches: ["IT", "DSBA", "BIT", "AI"],
    };
  },
  methods: {
    addEmit() {
      this.$emit("addObject", {
        code: this.code,
        name: this.name,
        curID: this.curID,
        unit: this.unit,
        category: this.category,
        branch: this.branch,
        descr: this.descr,
        stuYear: this.stuYear,
      });
    },
    // To Check the value that return from `InputTemplete` component
    valueChangeHandle(data) {
      switch (data.key) {
        // Code Variable
        case "code":
          this.code = data.value;
          break;

        // Name Variable
        case "name":
          this.name = data.value;
          break;

        // Study Year Variable
        case "stuYear":
          this.stuYear = data.value;
          break;
      }
    },
  },
});
</script>

<template>
  <ModalTemplete :name="name" id="data">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">
        <!-- Curriculumn code -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="code"
          :disabledStatus="disabledStatus"
          id="code"
          class="w-[15rem]"
          >รหัสหลักสูตร</InputTemplete
        >
        <!-- Curriculumn code -->

        <!-- Curriculumn name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          :disabledStatus="disabledStatus"
          id="name"
          class="w-full"
          >ชื่อหลักสูตร</InputTemplete
        >
        <!-- Curriculumn name -->

        <!-- Curriculum Year -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="calYear"
          :disabledStatus="disabledStatus"
          id="calYear"
          class="w-auto"
        >
          ปีการศึกษา</InputTemplete
        >
        <!-- Curriculum Year -->
      </div>
      <!-- Curriculum Description -->
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
      <!-- Curriculum Description -->

      <!-- Button Group -->
      <ModalButtonGroup
        :disabledStatus="disabledStatus"
        topic="หลักสูตร"
        @change="toggleDisabledStatus"
        @save="saveHandler"
        @delete="openDangerModal"
      />
      <!-- Button Group -->
    </div>
    <!-- Delete Modal -->
    <DangerModal
      v-show="deleteModal"
      @cancel="closeDangerModal"
      @confirm="confirmDelHandle"
      >หลักสูตร {{ name }}
    </DangerModal>
    <!-- Delete Modal -->
  </ModalTemplete>
</template>
<script>
import { defineComponent } from "vue";
import InputTemplete from "../InputTemplete.vue";
import ModalButtonGroup from "../Modal/ButtonGroup.vue";
import ModalTemplete from "../Modal/Templete.vue";
import DangerModal from "../Modal/DangerModal.vue";

export default defineComponent({
  props: {
    curriculums: Object,
    data: Object,
    index: Number,
  },
  components: {
    InputTemplete,
    ModalButtonGroup,
    ModalTemplete,
    DangerModal,
  },
  data() {
    return {
      deleteModal: false,
      disabledStatus: true,
      id: this.data.id,
      code: this.data.code,
      name: this.data.name,
      calYear: this.data.calYear,
      descr: this.data.descr,
    };
  },
  methods: {
    // Emit the value in variable to the View Page
    saveHandler() {
      this.$emit(
        "update",
        {
          id: this.id,
          code: this.code,
          name: this.name,
          calYear: this.calYear,
          descr: this.descr,
        },
        this.index //Send the index value to change user visibility
      );
    },

    // Open DangerModal
    openDangerModal() {
      this.deleteModal = true;
    },

    // Close DangerModal
    closeDangerModal() {
      this.deleteModal = false;
    },

    // Confirm the delete object and emit to view page
    confirmDelHandle() {
      this.deleteModal = false;
      console.log(this.id);
      this.$emit("delete", { id: this.id });
    },

    // To toggle disabled state to true
    changeDisabledStatusToTrue() {
      this.disabledStatus = true;
    },

    // To change the toggle state disabledStatus
    toggleDisabledStatus() {
      this.disabledStatus = !this.disabledStatus;
    },

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
        case "calYear":
          this.calYear = data.value;
          break;
      }
    },
  },
  // To get the value fetching fix that when first enter the page and data do not load
  watch: {
    "data.id": function (newValue) {
      this.id = newValue;
    },
    "data.code": function (newValue) {
      this.code = newValue;
    },
    "data.name": function (newValue) {
      this.name = newValue;
    },
    "data.calYear": function (newValue) {
      this.calYear = newValue;
    },
    "data.descr": function (newValue) {
      this.descr = newValue;
    },
  },
});
</script>

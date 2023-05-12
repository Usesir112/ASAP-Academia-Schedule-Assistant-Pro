<template>
  <ModalTemplete :name="name" id="data">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">
        <!-- Lecturer name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          :disabledStatus="disabledStatus"
          id="name"
          class="w-1/2"
          >ชื่ออาจารย์</InputTemplete
        >
        <!-- Lecturer name -->

        <!-- Lecturer email -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="email"
          :disabledStatus="disabledStatus"
          id="email"
          class="w-1/2"
        >
          อีเมล</InputTemplete
        >
        <!-- Lecturer email -->
      </div>

      <!-- Button Group -->
      <ModalButtonGroup
        :disabledStatus="disabledStatus"
        topic="ข้อมูลอาจารย์"
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
      >ข้อมูลของอาจารย์ {{ name }}
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
      name: this.data.name,
      email: this.data.email,
    };
  },
  methods: {
    // Emit the value in variable to the View Page
    saveHandler() {
      this.$emit(
        "update",
        {
          id: this.id,
          name: this.name,
          email: this.email,
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
        // Name Variable
        case "name":
          this.name = data.value;
          break;

        // Study Year Variable
        case "email":
          this.email = data.value;
          break;
      }
    },
  },
  // To get the value fetching fix that when first enter the page and data do not load
  watch: {
    "data.id": function (newValue) {
      this.id = newValue;
    },
    "data.name": function (newValue) {
      this.name = newValue;
    },
    "data.email": function (newValue) {
      this.email = newValue;
    },
  },
});
</script>

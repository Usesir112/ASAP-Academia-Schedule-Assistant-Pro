<template>
  <ModalTemplete :name="name" id="data">
    <div class="items-center px-4 border border-t border-gray-50">
      <div class="flex m-5">
        <!-- Room name -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="name"
          :disabledStatus="disabledStatus"
          id="name"
          class="w-1/3"
          >ห้องเรียน</InputTemplete
        >
        <!-- Room name -->

        <!-- Room Amount -->
        <InputTemplete
          @input-change="valueChangeHandle"
          :data="amount"
          :disabledStatus="disabledStatus"
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
            :disabled="disabledStatus"
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
      <ModalButtonGroup
        :disabledStatus="disabledStatus"
        topic="ห้องเรียน"
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
      >ข้อมูลของห้องเรียน {{ name }}
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
      amount: this.data.amount,
      type: this.data.type,
      types: ["บรรยาย", "แลป"],
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
          amount: this.amount,
          type: this.type,
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

        // Study amount Variable
        case "amount":
          this.amount = data.value;
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
    "data.amount": function (newValue) {
      this.amount = newValue;
    },
    "data.type": function (newValue) {
      this.type = newValue;
    },
  },
});
</script>

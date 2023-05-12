<template src="./html/SubjectModal.html" />
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
      curID: this.data.curID,
      unit: this.data.unit,
      category: this.data.category,
      branch: this.data.branch,
      stuYear: this.data.stuYear,
      descr: this.data.descr,
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

    // Emit the value in variable to the View Page
    saveHandler() {
      this.$emit(
        "update",
        {
          id: this.id,
          code: this.code,
          name: this.name,
          curID: this.curID,
          unit: this.unit,
          category: this.category,
          branch: this.branch,
          descr: this.descr,
          stuYear: this.stuYear,
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
        case "stuYear":
          this.stuYear = data.value;
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
    "data.curID": function (newValue) {
      this.curID = newValue;
    },
    "data.unit": function (newValue) {
      this.unit = newValue;
    },
    "data.category": function (newValue) {
      this.category = newValue;
    },
    "data.branch": function (newValue) {
      this.branch = newValue;
    },
    "data.descr": function (newValue) {
      this.descr = newValue;
    },
    "data.stuYear": function (newValue) {
      this.stuYear = newValue;
    },
  },
});
</script>

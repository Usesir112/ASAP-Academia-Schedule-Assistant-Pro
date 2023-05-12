<template>
  <div class="flex">
    <SubjectOptions ref="subjectId" class="w-1/2" />
    <LecturerOptions ref="lecturerId" class="w-1/4" />
    <SemesterOptions ref="semesterId" />
    <RoomOptions ref="roomId" />
    <DOWOptions ref="dayOfWeek" />
    <StratTimeOption ref="startTime" />
    <EndTimeOprions ref="endTime" />
    <InputTemplete id="section" @input-change="sectionChange"
      >กลุ่มเรียนที่</InputTemplete
    >
    <TypeOptions ref="type" />

    <!-- Free Space -->
    <div class="bg-white py-3 px-16 text-white cursor-default">area</div>
    <!-- Free Space -->

    <button
      @click="cancelHandler"
      class="button mr-3 bg-rose-400 text-white hover:bg-rose-300"
    >
      ยกเลิก
    </button>
    <button
      @click="addHandler"
      class="button shadow-md hover:bg-teal-400 text-white bg-teal-500 mr-7"
    >
      บันทึก
    </button>
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";

import SubjectOptions from "../Table/SubjectOptions.vue";
import LecturerOptions from "./LecturerOptions.vue";
import SemesterOptions from "./SemesterOption.vue";
import RoomOptions from "./RoomOptions.vue";
import DOWOptions from "./DOWOptions.vue";
import StratTimeOption from "./StratTimeOption.vue";
import EndTimeOprions from "./EndTimeOptions.vue";
import TypeOptions from "./TypeOptions.vue";

export default {
  components: {
    InputTemplete,
    SubjectOptions,
    LecturerOptions,
    SemesterOptions,
    RoomOptions,
    DOWOptions,
    StratTimeOption,
    EndTimeOprions,
    TypeOptions,
  },

  methods: {
    // To change the toggle state disabledStatus
    toggleDisabledStatus() {
      this.disabledStatus = !this.disabledStatus;
    },

    sectionChange(data) {
      this.section = data.value;
    },
    addHandler() {
      this.$emit("addObject", {
        subjectId: this.$refs.subjectId.subjectId,
        lecturerId: this.$refs.lecturerId.lecturerId,
        semesterId: this.$refs.semesterId.semesterId,
        roomId: this.$refs.roomId.roomId,
        dayOfWeek: this.$refs.dayOfWeek.dayOfWeek,
        startTime: this.$refs.startTime.startTime,
        endTime: this.$refs.endTime.endTime,
        section: parseInt(this.section),
        type: this.$refs.type.type,
      });

      window.location.reload();
    },
    cancelHandler() {
      this.$emit("cancel");
    },
  },
};
</script>

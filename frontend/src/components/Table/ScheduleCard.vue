<template>
  <SubjectOptions
    :prop-subject-id="subjectId"
    ref="subjectId"
    :disabledStatus="disabledStatus"
    class="w-1/2"
  />
  <LecturerOptions
    :prop-lecturer-id="lecturerId"
    ref="lecturerId"
    :disabledStatus="disabledStatus"
    class="w-1/4"
  />
  <SemesterOptions
    :prop-semester-id="semesterId"
    ref="semesterId"
    :disabledStatus="disabledStatus"
  />
  <RoomOptions
    :prop-room-id="roomId"
    ref="roomId"
    :disabledStatus="disabledStatus"
  />
  <DOWOptions
    :propday-of-week="dayOfWeek"
    ref="dayOfWeek"
    :disabledStatus="disabledStatus"
  />
  <StratTimeOption
    :prop-start-time="startTime"
    ref="startTime"
    :disabledStatus="disabledStatus"
  />
  <EndTimeOprions
    :prop-end-time="endTime"
    ref="endTime"
    :disabledStatus="disabledStatus"
  />
  <InputTemplete
    :data="section"
    :disabledStatus="disabledStatus"
    id="section"
    @input-change="sectionChange"
    >กลุ่มเรียนที่</InputTemplete
  >
  <TypeOptions :prop-type="type" ref="type" :disabledStatus="disabledStatus" />

  <ModalButtonGroup
    @change="toggleDisabledStatus"
    @save="saveHandler"
    @cancel="toggleDisabledStatus"
    :disabledStatus="disabledStatus"
  />

  <!-- Modal -->
  <!-- <Warning @confirm-cancel="toggleDisabledStatus" /> -->
  <!-- ! Bug when passing the value -->
  <!-- <ConformSave @confirm-save="saveHandler"/> -->
  <!-- <DeleteModal @confirm-delete="deleteHandler" /> -->
  <!-- Modal -->
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

import ModalButtonGroup from "../Modal/ButtonGroup.vue";

import Warning from "../Modal/Warning.vue";
import ConformSave from "../Modal/ConfirmSave.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  props: {
    data: Object,
    index: Number,
  },
  emits: ["update", "delete"],

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
    ModalButtonGroup,
    Warning,
    ConformSave,
    DeleteModal,
  },
  data() {
    return {
      id: this.data.id,
      subjectId: this.data.subjectId,
      lecturerId: this.data.lecturerId,
      semesterId: this.data.semesterId,
      roomId: this.data.roomId,
      dayOfWeek: this.data.dayOfWeek,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      section: this.data.section,
      type: this.data.type,

      disabledStatus: true,
    };
  },
  methods: {
    // To change the toggle state disabledStatus
    toggleDisabledStatus() {
      this.disabledStatus = !this.disabledStatus;
    },

    // Emit the change
    saveHandler() {
      // Send data
      this.$emit(
        "update",
        {
          id: this.id,
          subjectId: this.$refs.subjectId.subjectId,
          lecturerId: this.$refs.lecturerId.lecturerId,
          semesterId: this.$refs.semesterId.semesterId,
          roomId: this.$refs.roomId.roomId,
          dayOfWeek: this.$refs.dayOfWeek.dayOfWeek,
          startTime: this.$refs.startTime.startTime,
          endTime: this.$refs.endTime.endTime,
          section: parseInt(this.section),
          type: this.$refs.type.type,
        },

        // Send index
        this.index
      );
      console.log(this.id);
    },

    // Emit the delete command
    deleteHandler() {
      this.$emit("delete", { id: this.id });
    },

    sectionChange(data) {
      this.section = data.value;
    },
  },
};
</script>

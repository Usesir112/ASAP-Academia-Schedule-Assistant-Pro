<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="getLecturerNameFromId(lecturerId).name"
      :disabledStatus="disabledStatus"
      id="lecturerName"
      :readonly="true"
      >ชื่ออาจาร์ย</InputTemplete
    >
    <!-- Button -->

    <!-- Popover -->
    <div
      class="shadow-md mt-2 absolute bg-white z-20 h-[50%] overflow-scroll"
      v-if="popover && !disabledStatus"
    >
      <div class="sticky top-0 bg-white p-3">
        <InputTemplete
          @input-change="searchValueIncoming"
          :disabledStatus="disabledStatus"
          id="lecturerName"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Lecturer -->
      <ul>
        <li
          v-for="lecturer in filteredLecturer"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(lecturer.id)"
        >
          {{ lecturer.name }}
        </li>
      </ul>
      <!-- List of Lecturer -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import axios from "axios";
import InputTemplete from "../InputTemplete.vue";

export default {
  props: {
    propLecturerId: Number,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      lecturerId: this.propLecturerId,
      lecturers: [], //All lecturer(s) in database
      filteredLecturer: [], //All lecturer(s) that result of search
    };
  },
  methods: {
    selectHandle(id) {
      this.lecturerId = id;
      this.popover = false;
    },
    togglePopover() {
      if (!this.popover) {
        this.popover = true;
        document.addEventListener("click", this.hidePopoverOnClickOutside);
      } else {
        this.popover = false;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    hidePopoverOnClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.popover = false;
        this.filteredLecturer = this.lecturers;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.lecturerId = this.propLecturerId;
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },

    // Fetch lecturer(s) from database
    async fetchLecturer() {
      try {
        const response = await axios.get("/api/lecturer");
        this.lecturers = response.data;
        this.filteredLecturer = this.lecturers;
      } catch (error) {
        console.error(error);
      }
    },
    getLecturerNameFromId(lecturerId) {
      const lecturer = this.lecturers.find((s) => s.id === lecturerId);
      return lecturer ? lecturer : "";
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredLecturer = this.lecturers.filter((item) => {
          return item.name.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredLecturer = this.lecturers;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
  created() {
    this.fetchLecturer();
  },
};
</script>

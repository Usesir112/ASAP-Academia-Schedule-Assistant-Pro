<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="getSemesterNameFromId(semesterId).name"
      :disabledStatus="disabledStatus"
      id="semesterName"
      :readonly="true"
    >
      ภาคเรียน
    </InputTemplete>

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
          id="semesterName"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Semester -->
      <ul>
        <li
          v-for="semester in filteredSemester"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(semester.id)"
        >
          {{ semester.name }}
        </li>
      </ul>
      <!-- List of Semester -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import axios from "axios";
import InputTemplete from "../InputTemplete.vue";

export default {
  props: {
    propSemesterId: Number,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      semesterId: this.propSemesterId,
      semesters: [], //All semester(s) in database
      filteredSemester: [], //All semester(s) that result of search
    };
  },
  methods: {
    selectHandle(id) {
      this.semesterId = id;
      this.popover = false;
      this.$emit("select", this.semesterId);
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
        this.filteredSemester = this.semesters;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.semesterId = this.propSemesterId;
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },

    // Fetch semester(s) from database
    async fetchSemester() {
      try {
        const response = await axios.get("/api/semester");
        this.semesters = response.data;
        this.filteredSemester = this.semesters;
      } catch (error) {
        console.error(error);
      }
    },
    getSemesterNameFromId(semesterId) {
      const semester = this.semesters.find((s) => s.id === semesterId);
      return semester ? semester : "";
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredSemester = this.semesters.filter((item) => {
          return item.name.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredSemester = this.semesters;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
  created() {
    this.fetchSemester();
  },
};
</script>

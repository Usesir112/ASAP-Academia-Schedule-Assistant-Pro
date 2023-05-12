<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="getSubjectNameFromId(subjectId).name"
      :disabledStatus="disabledStatus"
      id="subjectName"
      :readonly="true"
      >ชื่อวิชา</InputTemplete
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
          id="subjectName"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Subject -->
      <ul>
        <li
          v-for="subject in filteredSubjects"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(subject.id)"
        >
          {{ subject.name }} / {{ subject.branch }}
        </li>
      </ul>
      <!-- List of Subject -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import axios from "axios";
import InputTemplete from "../InputTemplete.vue";

export default {
  props: {
    propSubjectId: Number,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      subjectId: this.propSubjectId,
      subjects: [], //All subject(s) in database
      filteredSubjects: [], //All subject(s) that result of search
    };
  },
  methods: {
    selectHandle(id) {
      this.subjectId = id;
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
        this.filteredSubjects = this.subjects;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.subjectId = this.propSubjectId;
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },

    // Fetch subject(s) from database
    async fetchSubjects() {
      try {
        const response = await axios.get("/api/subject");
        this.subjects = response.data;
        this.filteredSubjects = this.subjects;
      } catch (error) {
        console.error(error);
      }
    },
    getSubjectNameFromId(subjectId) {
      const subject = this.subjects.find((s) => s.id === subjectId);
      return subject ? subject : "";
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredSubjects = this.subjects.filter((item) => {
          return item.name.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredSubjects = this.subjects;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
  created() {
    this.fetchSubjects();
  },
};
</script>

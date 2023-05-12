<template>
  <div class="flex my-10">
    <!-- Schedule Box -->
    <div class="bg-white shadow-md rounded-lg p-3 w-full">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <p class="text-primary text-2xl">จัดการรายการสอน</p>
        <div class="flex">
          <SemesterOption @select="selectSemesterHandle" />

          <InputTemplete
            @input-change="searchValueIncoming"
            :data="search"
            id="search"
            >ค้นหารายการสอน</InputTemplete
          >
          <button
            data-te-ripple-init
            data-te-ripple-color="light"
            class="button shadow-md hover:bg-teal-400 text-white bg-teal-500"
            @click="toggleAddCardVisible"
          >
            เพิ่มรายการ
          </button>
        </div>
      </div>
      <!-- Header -->
      <div
        class="flex items-center"
        v-for="(item, index) in fillteredSchedules"
        :key="item.id"
      >
        <ScheduleCard
          :data="item"
          :index="index"
          @update="updateHandle"
          @delete="deleteHandle"
        />
      </div>

      <AddSchedule
        v-if="addScheduleVisible"
        @cancel="toggleAddCardVisible"
        @addObject="addObject"
      />
    </div>
    <!-- Schedule Box -->
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";
import ScheduleCard from "./ScheduleCard.vue";
import AddSchedule from "./AddSchedule.vue";
import SemesterOption from "./SemesterOption.vue";
import axios from "axios";

export default {
  components: { InputTemplete, ScheduleCard, AddSchedule, SemesterOption },
  data() {
    return {
      search: "", // Search Feature
      schedules: [], // All Schedule(s) in database
      subjects: [],
      lecturers: [],
      semesters: [],
      fillteredSchedules: [], // All Schedule(s) search result
      addScheduleVisible: false,
      semesterID: Number,
    };
  },
  methods: {
    // Create the schedule Data
    async addObject(data) {
      try {
        await axios.post("/api/schedule", data);
      } catch (error) {
        console.log(error);
      }
    },
    selectSemesterHandle(data) {
      this.semesterID = data;
    },
    // Add Schedule
    toggleAddCardVisible() {
      this.addScheduleVisible = !this.addScheduleVisible;
    },

    // Update Schedule data
    async updateHandle(data, index) {
      // Update database data
      await axios.put(`/api/schedule/${data.id}`, data);

      // Reload the page
      window.location.reload();
    },

    // Delete the schedule
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/schedule/${data.id}`);

        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error(error.response.data);
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },

    // Fetch Schedule
    async fetchSchedule() {
      try {
        const response = await axios.get("/api/schedule");
        this.schedules = response.data;
        this.fillteredSchedules = this.schedules;
      } catch (error) {
        console.error(error);
      }
    },

    // Semester
    async fetchSemester() {
      try {
        const response = await axios.get("/api/semester");
        this.semesters = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    getSemesterNameFromId(semesterId) {
      const semester = this.semesters.find((s) => s.id === semesterId);
      return semester ? semester.name : "";
    },
    // Semester

    // Subjects
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
      return subject ? subject.name : "";
    },
    // Subjects

    // Lecturer
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
      return lecturer ? lecturer.name : "";
    },
    // Lecturer
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.fillteredSchedules = this.schedules.filter((item) => {
          return (
            // Search by Subject Name
            this.getSubjectNameFromId(item.subjectId)
              .toLowerCase()
              .includes(newVal.toLowerCase()) ||
            // Search by Lecturer Name
            this.getLecturerNameFromId(item.lecturerId)
              .toLowerCase()
              .includes(newVal.toLowerCase()) ||
            // Search by Semester
            this.getSemesterNameFromId(item.semesterId)
              .toLowerCase()
              .includes(newVal.toLowerCase()) ||
            // Search by Day Of Week
            item.dayOfWeek.toLowerCase().includes(newVal.toLowerCase()) ||
            // Search by Time
            item.startTime.toLowerCase().includes(newVal.toLowerCase()) ||
            item.endTime.toLowerCase().includes(newVal.toLowerCase()) ||
            // Search by Type
            item.type.toLowerCase().includes(newVal.toLowerCase())
          );
        });
      } else {
        this.fillteredSchedules = this.schedules;
      }
    },
    semesterID: function (newVal, oldVal) {
      this.fillteredSchedules = this.schedules.filter(
        (item) => item.semesterId === newVal
      );
    },
  },
  created() {
    this.fetchSchedule();
    this.fetchSubjects();
    this.fetchLecturer();
    this.fetchSemester();
  },
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between my-3">
      <div>
        <SemesterOption @select="selectSemesterHandle"/>
        
      </div>
    </div>
    <!-- Header -->
    <table class="w-full shadow-md rounded-xl font-semibold text-primary">
      <thead>
        <tr>
          <th colspan="2">วัน / ห้องเรียน</th>
          <th
            class="p-3 bg-primary-50 border-white border-8 rounded-full"
            colspan="2"
            v-for="time in displaytimes"
            :key="time"
          >
            {{ time }}
          </th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <template v-for="(day, dayIndex) in dayofweek" :key="day">
          <tr>
            <td
              :rowspan="rooms.length + 1"
              class="p-5 bg-primary-50 border-white border-8"
            >
              {{ day }}
            </td>
          </tr>
          <tr v-for="(room, roomIndex) in rooms" :key="room">
            <!-- Room -->
            <td
              class="px-5 py-3 bg-fuchsia-50 text-fuchsia-700 border-white border-8 rounded-full"
            >
              {{ room.name }}
            </td>
            <!-- Room -->

            <template v-for="(time, timeIndex) in slotTimes">
              <td
                v-if="isFirstCell(day, room.id, time)"
                :key="time"
                :colspan="calculateColspan(day, room.id, time)"
                class="px-5 shadow rounded-xl max-w-[1rem] font-semibold hover:scale-105 duration-300"
              >
                <div
                  class="truncate"
                  v-html="getSubject(day, room.id, time)"
                ></div>
              </td>
              <td
                v-else-if="!getSubject(day, room.id, time)"
                class="border-l border-b"
              ></td>
            </template>
          </tr>
        </template>
      </tbody>
      <!-- Table body -->

    </table>
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";
import SemesterOption from "./SemesterOption.vue";
import { dayOfWeek, displayTimes, slotTimes } from "../Table/Data.js";

// Import Axios
import axios from "axios";

export default {
  components: {
    InputTemplete,
    SemesterOption,
  },
  data() {
    return {
      name: "",
      displaytimes: displayTimes,
      slotTimes: slotTimes,
      dayofweek: dayOfWeek,
      subjects: [],
      lecturers: [],
      rooms: [],
      schedules: [],
      fillteredSchedules: [],
      semesters: [],
      semesterID: Number
    };
  },
  methods: {
    selectSemesterHandle(data) {
      this.semesterID = data
    },
    timeToMinutes(time) {
      const [hours, minutes] = time.split(":");
      return parseInt(hours) * 60 + parseInt(minutes);
    },

    getSubject(day, roomId, timeRange) {
      const [startTime, endTime] = timeRange.split(" - ");
      const scheduledClass = this.fillteredSchedules.find(
        (item) =>
          item.dayOfWeek === day &&
          item.roomId === roomId &&
          this.timeToMinutes(startTime) >= this.timeToMinutes(item.startTime) &&
          this.timeToMinutes(endTime) <= this.timeToMinutes(item.endTime)
      );
      if (scheduledClass) {
        const scheduledClassDetail =
          this.getSubjectNameFromId(scheduledClass.subjectId) +
          " (" +
          scheduledClass.startTime +
          "-" +
          scheduledClass.endTime +
          ")" +
          "<br>" +
          this.getLecturerNameFromId(scheduledClass.lecturerId) +
          " (" +
          scheduledClass.type +
          ")";
        return scheduledClassDetail;
      } else {
        return "";
      }
    },
    isFirstCell(day, roomId, timeRange) {
      const scheduledClass = this.getSubject(day, roomId, timeRange);
      const currentIndex = this.slotTimes.indexOf(timeRange);
      const prevTimeRange = this.slotTimes[currentIndex - 1];
      const prevScheduledClass = prevTimeRange
        ? this.getSubject(day, roomId, prevTimeRange)
        : null;
      return scheduledClass && scheduledClass !== prevScheduledClass;
    },

    calculateColspan(day, roomId, timeRange) {
      const scheduledClass = this.fillteredSchedules.find(
        (item) =>
          item.dayOfWeek === day &&
          item.roomId === roomId &&
          this.timeToMinutes(timeRange.split(" - ")[0]) >=
            this.timeToMinutes(item.startTime) &&
          this.timeToMinutes(timeRange.split(" - ")[1]) <=
            this.timeToMinutes(item.endTime)
      );
      if (scheduledClass) {
        const startIndex = this.slotTimes.findIndex(
          (time) =>
            this.timeToMinutes(time.split(" - ")[1]) ===
            this.timeToMinutes(scheduledClass.startTime)
        );
        const endIndex = this.slotTimes.findIndex(
          (time) =>
            this.timeToMinutes(time.split(" - ")[0]) ===
            this.timeToMinutes(scheduledClass.endTime)
        );
        return endIndex - startIndex - 1;
      }
      return 1;
    },

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

    // Fetch Schedule
    async fetchSchedule() {
      try {
        const response = await axios.get("/api/schedule");
        this.schedules = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Fetch the room(s) data
    async fetchRoom() {
      try {
        const response = await axios.get("/api/room");
        this.rooms = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Fetch Semester(s) data
    async fetchSemester() {
      try {
        const response = await axios.get("/api/semester");
        this.semesters = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    semesterID: function (newVal, oldVal) {
      this.fillteredSchedules = this.schedules.filter(item => item.semesterId === newVal)
    }
  },
  created() {
    this.fetchRoom();
    this.fetchSchedule();
    this.fetchSubjects();
    this.fetchLecturer();
    this.fetchSemester();
  },
};
</script>

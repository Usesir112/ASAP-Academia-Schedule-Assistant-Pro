<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header title="ภาคเรียน" @input-change="searchValueIncoming" />
    <!-- Header -->

    <!-- Body -->
    <div class="mt-3">
      <table class="min-w-full text-left border shadow-md table-auto">
        <thead class="border-b font-medium text-white bg-primary">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3">ภาคเรียน</th>
            <th class="p-3">ปีการศึกษา</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(semester, index) in filteredSemester"
            :key="semester.id"
            data-te-toggle="modal"
            data-te-target="#data"
            @click="sendDataToModal(semester, index)"
            class="cursor-pointer transition duration-300 ease-in-out text-primary hover:bg-primary-100"
          >
            <td class="p-3 text-center">{{ semester.id }}</td>
            <td class="p-3">{{ semester.name }}</td>
            <td class="p-3">{{ semester.year }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Body -->

    <!-- Modal -->
    <SemModal
      :data="semester"
      :index="index"
      ref="toggle"
      @update="updateHandle"
      @delete="deleteHandle"
    />
    <AddSem @addObject="addObject" />
    <!-- Modal -->
  </div>
</template>
<script>
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";
import AddSem from "../components/Semester/AddSem.vue";
import SemModal from "../components/Semester/SemModal.vue";

// Import Axios
import axios from "axios";

export default defineComponent({
  components: {
    Header,
    AddSem,
    SemModal,
  },
  data() {
    return {
      search: "", //Search the curriculum

      semesters: [], // All Semesters data
      semester: {}, // semester data
      filteredSemester: [], // All semester search
    };
  },
  methods: {
    // Create the semester Data
    async addObject(data) {
      try {
        await axios.post("/api/semester", data);
      } catch (error) {
        console.log(error);
      }
    },

    // Fetch the semester(s) data
    async fetchSemester() {
      try {
        const response = await axios.get("/api/semester");
        this.semesters = response.data;
        this.filteredSemester = this.semesters;
      } catch (error) {
        console.error(error);
      }
    },

    // Update semester data
    async updateHandle(data, i) {
      // Update data for the user
      const semester = this.filteredSemester;
      semester[i].id = data.id;
      semester[i].name = data.name;
      semester[i].year = data.year;

      // Update the data to Database
      await axios.put(`/api/semester/${data.id}`, data);
    },

    // Delete the curiculum
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/semester/${data.id}`);
        alert("ลบภาคเรียนเรียบร้อยแล้ว");
        location.reload();
      } catch (error) {
        console.error(error.response.data);
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data;
    },

    // Send semester data to the semesterModal.vue
    sendDataToModal(semester, index) {
      this.semester = semester;
      this.index = index;
      this.$refs.toggle.changeDisabledStatusToTrue();
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
  },
  created() {
    this.fetchSemester();
  },
});
</script>

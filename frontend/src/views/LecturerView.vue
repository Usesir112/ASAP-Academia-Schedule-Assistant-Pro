<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header title="อาจารย์" @input-change="searchValueIncoming" />
    <!-- Header -->

    <!-- Body -->
    <div class="mt-3">
      <table class="min-w-full text-left border shadow-md table-auto">
        <thead class="border-b font-medium text-white bg-primary">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3">ชื่ออาจารย์</th>
            <th class="p-3">อีเมล</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lecturer, index) in filteredLecturer"
            :key="lecturer.id"
            data-te-toggle="modal"
            data-te-target="#data"
            @click="sendDataToModal(lecturer, index)"
            class="cursor-pointer transition duration-300 ease-in-out text-primary hover:bg-primary-100"
          >
            <td class="p-3 text-center">{{ lecturer.id }}</td>
            <td class="p-3">{{ lecturer.name }}</td>
            <td class="p-3">{{ lecturer.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Body -->

    <!-- Modal -->
    <LecModal
      :data="lecturer"
      :index="index"
      ref="toggle"
      @update="updateHandle"
      @delete="deleteHandle"
    />
    <AddLec @addObject="addObject" />
    <!-- Modal -->
  </div>
</template>
<script>
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";
import AddLec from "../components/Lecturer/AddLec.vue";
import LecModal from "../components/Lecturer/LecModal.vue";

// Import Axios
import axios from "axios";

export default defineComponent({
  components: {
    Header,
    AddLec,
    LecModal,
  },
  data() {
    return {
      search: "", //Search the curriculum

      lecturers: [], // All Lecturers data
      lecturer: {}, // Lecturer data
      filteredLecturer: [], // All lecturer search
    };
  },
  methods: {
    // Create the lecturer Data
    async addObject(data) {
      try {
        await axios.post("/api/lecturer", data);
      } catch (error) {
        console.log(error);
      }
    },

    // Fetch the lecturer(s) data
    async fetchLecturers() {
      try {
        const response = await axios.get("/api/lecturer");
        this.lecturers = response.data;
        this.filteredLecturer = this.lecturers;
      } catch (error) {
        console.error(error);
      }
    },

    // Update lecturer data
    async updateHandle(data, i) {
      // Update data for the user
      const lecturer = this.filteredLecturer;
      lecturer[i].id = data.id;
      lecturer[i].name = data.name;
      lecturer[i].email = data.email;

      // Update the data to Database
      await axios.put(`/api/lecturer/${data.id}`, data);
    },

    // Delete the curiculum
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/lecturer/${data.id}`);
        alert("ลบหลักสูตรเรียบร้อยแล้ว");
        location.reload();
      } catch (error) {
        console.error(error.response.data);
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data;
    },

    // Send lecturer data to the lecturerModal.vue
    sendDataToModal(lecturer, index) {
      this.lecturer = lecturer;
      this.index = index;
      this.$refs.toggle.changeDisabledStatusToTrue();
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
  },
  created() {
    this.fetchLecturers();
  },
});
</script>

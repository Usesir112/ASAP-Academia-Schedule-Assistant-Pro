<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header title="หลักสูตร" @input-change="searchValueIncoming" />
    <!-- Header -->

    <!-- Body -->
    <div class="mt-3">
      <table class="min-w-full text-left border shadow-md table-auto">
        <thead class="border-b font-medium text-white bg-primary">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3 text-center">รหัสหลักสูตร</th>
            <th class="p-3 w-1/2">ชื่อหลักสูตร</th>
            <th class="p-3">ปีของหลักสูตร</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(curriculum, index) in filteredCurriculums"
            :key="curriculum.id"
            data-te-toggle="modal"
            data-te-target="#data"
            @click="sendDataToModal(curriculum, index)"
            class="cursor-pointer transition duration-300 ease-in-out text-primary hover:bg-primary-100"
          >
            <td class="p-3 text-center">{{ curriculum.id }}</td>
            <td class="p-3 text-center">{{ curriculum.code }}</td>
            <td class="p-3">{{ curriculum.name }}</td>
            <td class="p-3">{{ curriculum.calYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Body -->

    <!-- Modal -->
    <CurModal
      :data="curriculum"
      :index="index"
      @update="updateHandle"
      @delete="deleteHandle"
      ref="toggle"
    />
    <AddCur @addObject="addObject" />
    <!-- Modal -->
  </div>
</template>
<script>
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";
import AddCur from "../components/Curriculum/AddCur.vue";
import CurModal from "../components/Curriculum/CurModal.vue";
// Import Axios
import axios from "axios";

export default defineComponent({
  components: {
    Header,
    AddCur,
    CurModal,
  },
  data() {
    return {
      search: "", //Search the curriculum
      curriculums: [], //All Curriculum data in the database
      curriculum: {}, //One Curriculum data -> to Modal
      filteredCurriculums: [],
    };
  },
  methods: {
    // Create the curriculum Data
    async addObject(data) {
      try {
        await axios.post("/api/curriculum", data);
      } catch (error) {
        console.log(error);
      }
    },

    // Fetch the curriculum(s) Data
    async fetchCurriculums() {
      try {
        const response = await axios.get("/api/curriculum");
        this.curriculums = response.data;
        this.filteredCurriculums = this.curriculums;
      } catch (error) {
        console.error(error);
      }
    },

    // Update curriculum data
    async updateHandle(data, i) {
      // Update data for the user
      const curriculum = this.filteredCurriculums;

      curriculum[i].code = data.code;
      curriculum[i].name = data.name;
      curriculum[i].calYear = data.calYear;
      curriculum[i].descr = data.descr;

      // Update the data to Database
      await axios.put(`/api/curriculum/${data.id}`, data);
    },

    // Delete the curiculum
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/curriculum/${data.id}`);
        alert("ลบหลักสูตรเรียบร้อยแล้ว");
        location.reload();
      } catch (error) {
        console.error(error.response.data);
        alert("ไม่สามารถลบหลักสูตรได้เนื่องจากมีวิชาที่อยู่ในหลักสูตรนี้");
        location.reload();
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data;
    },

    // Send curriculum data to the curriculumModal.vue
    sendDataToModal(curriculum, index) {
      this.curriculum = curriculum;
      this.index = index;
      this.$refs.toggle.changeDisabledStatusToTrue();
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredCurriculums = this.curriculums.filter((item) => {
          return (
            item.id.toString().toLowerCase().includes(newVal.toLowerCase()) ||
            item.code.toLowerCase().includes(newVal.toLowerCase()) ||
            item.name.toLowerCase().includes(newVal.toLowerCase()) ||
            item.calYear.toString().toLowerCase().includes(newVal.toLowerCase())
          );
        });
      } else {
        this.filteredCurriculums = this.curriculums;
      }
    },
  },

  created() {
    this.fetchCurriculums();
  },
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header title="วิชา" @input-change="searchValueIncoming" />
    <!-- Header -->

    <!-- Body -->
    <div class="mt-3">
      <table class="min-w-full text-left border shadow-md table-auto">
        <thead class="border-b font-medium text-white bg-primary">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3 w-1/6">รหัสวิชา</th>
            <th class="p-3 w-1/3">ชื่อวิชา</th>
            <th class="p-3 text-center">หลักสูตร</th>
            <th class="p-3 text-center">ชั้นปี</th>
            <th class="p-3 text-center">หน่วยกิต</th>
            <th class="p-3 text-center">ประเภทวิชา</th>
            <th class="p-3 text-center">สาขา</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(subject, index) in filteredSubjects"
            :key="subject.id"
            data-te-toggle="modal"
            data-te-target="#data"
            @click="sendDataToModal(subject, index)"
            class="cursor-pointer  border-primary transition duration-300 ease-in-out text-primary hover:bg-primary-100"
          >
            <td class="p-3 text-center">{{ subject.id }}</td>
            <td class="p-3">{{ subject.code }}</td>
            <td class="p-3">{{ subject.name }}</td>
            <td class="p-3 text-center">
              {{ getCurriculumId(subject.curID).code }}
            </td>
            <td class="p-3 text-center">
              {{ subject.stuYear }}
            </td>
            <td class="p-3 text-center">{{ subject.unit }}</td>
            <td class="p-3 text-center">{{ subject.category }}</td>
            <td class="p-3 text-center">{{ subject.branch }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Body -->

    <!-- Modal -->
    <SubjectModal
      :data="subject"
      :index="index"
      :curriculums="curriculums"
      ref="toggle"
      @update="updateHandle"
      @delete="deleteHandle"
    />
    <AddSubject :curriculums="curriculums" @addObject="addObject" />
    <!-- Modal -->
  </div>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";
import SubjectModal from "../components/Subject/SubjectModal.vue";
import AddSubject from "../components/Subject/AddSubject.vue";

export default defineComponent({
  components: { Header, SubjectModal, AddSubject },
  data() {
    return {
      search: "", //Search Feature
      curriculums: [], // All Curriculum(s) in database
      subjects: [], //All subject(s) in database
      subject: {}, //One subject data -> to Modal
      filteredSubjects: [], //All subject(s) that result of search
    };
  },
  methods: {
    //Create the Subject
    async addObject(data) {
      try {
        await axios.post("/api/subject", data);
      } catch (error) {
        console.log(error);
      }
    },
    // Fetch Curriculum(s) from database
    async fetchCurriculums() {
      try {
        const response = await axios.get("/api/curriculum");
        this.curriculums = response.data;
        console.log(this.curriculums);
      } catch (error) {
        console.error(error);
      }
    },

    // Find Curriculum Name from curID foreign key in subject
    getCurriculumId(curID) {
      // Find the curriculum with the matching ID
      const curriculum = this.curriculums.find((c) => c.id === curID);
      // Return the curriculum's ID or an empty string if not found
      return curriculum ? curriculum : "";
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

    // Update Subject data
    async updateHandle(data, i) {
      // Update data for the user
      const subject = this.filteredSubjects;

      subject[i].code = data.code;
      subject[i].name = data.name;
      subject[i].curID = data.curID;
      subject[i].unit = data.unit;
      subject[i].category = data.category;
      subject[i].descr = data.descr;
      subject[i].branch = data.branch;
      subject[i].stuYear = data.stuYear;

      // Update the data to Database
      await axios.put(`/api/subject/${data.id}`, data);
    },

    // Delete the curiculum
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/subject/${data.id}`);
        alert("ลบวิชาเรียบร้อยแล้ว");
        location.reload();
      } catch (error) {
        console.error(error.response.data);
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data;
    },

    // Send subject data to the subjectModal.vue
    sendDataToModal(subject, index) {
      this.subject = subject;
      this.index = index;
      this.$refs.toggle.changeDisabledStatusToTrue();
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
  },
  created() {
    this.fetchCurriculums();
    this.fetchSubjects();
  },
});
</script>

# Page Structure

To provide create the same layout

# View

### Templete Part

```html
<div class="min-h-screen">
  <!-- Header -->
  <header title="วิชา" @input-change="searchValueIncoming" />
  <!-- Header -->

  <!-- Body -->
  <div class="mt-3">
    <table class="min-w-full text-left border shadow-md table-auto">
      <!-- Table Head -->
      <thead class="border-b font-medium text-white bg-primary">
        <tr>
          <!-- Your Table Head goes here! -->
        </tr>
      </thead>
      <!-- Table Head -->

      <!-- Table Body -->
      <tbody>
        <tr
          v-for="[YOURDATA], index in [YOURDATA]"
          :key="[YOURDATA]"
          data-te-toggle="modal"
          data-te-target="#modal"
          @click="sendDataToModal(subject, index)"
          class="cursor-pointer border-b border-primary transition duration-300 ease-in-out text-primary hover:bg-primary-100"
        >
          <td class="p-3">[YOURDATA]</td>
        </tr>
      </tbody>
      <!-- Table Body -->
    </table>
  </div>
  <!-- Body -->

  <!-- Modal -->
  <SubjectModal
    (DONT
    FORGOT
    TO
    CHANGE)
    :data="subject"
    :index="index"
    :curriculums="curriculums"
    ref="toggle"
    @update="updateHandle"
    @delete="deleteHandle"
  />
  <!-- Modal -->
</div>
```

### Script Part

```js
import axios from "axios";
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";

export default defineComponent({
  components: { Header },
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
    // Fetch Curriculum(s) from database
    async fetchCurriculums() {
      try {
        const response = await axios.get("/api/curriculum");
        this.curriculums = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Find Curriculum Name from curID foreign key in subject
    getCurriculumId(curId) {
      // Find the curriculum with the matching ID
      const curriculum = this.curriculums.find((c) => c.id === curId);
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
      subject[i].curId = data.curId;
      subject[i].unit = data.unit;
      subject[i].category = data.category;
      subject[i].descr = data.descr;
      subject[i].branch = data.branch;

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
```

# Modal

### Templete Part
```html
<DetailModalTemplete :name="name">
  <div class="items-center px-4 border border-t border-gray-50">
    <!-- Colum One -->
    <div class="flex m-5">
      <!-- Subject code -->
      <InputTemplete
        @input-change="valueChangeHandle"
        :data="code"
        :disabledStatus="disabledStatus"
        id="code"
        class="w-[15rem]"
        >รหัสวิชา</InputTemplete
      >
      <!-- Subject code -->
    </div>
    <!-- Colum One -->

    <!-- Column Two -->
    <div class="flex m-5">
      <!-- Subject Branch -->
      <div class="relative mr-3 w-[25%]">
        <select
          :disabled="disabledStatus"
          id="branch"
          name="branch"
          v-model="branch"
          class="input text-primary peer"
        >
          <option
            v-for="branchItem in branches"
            :key="branchItem"
            :value="branchItem"
          >
            {{ branchItem }}
          </option>
        </select>
        <label for="branch" class="input-label text-md peer-focus:text-primary">
          สาขา
        </label>
      </div>
      <!-- Subject Branch -->
    </div>
    <!-- Column Two -->

    <!-- Subject Description -->
    <div class="border-t border-gray-100">
      <div class="relative m-5">
        <textarea
          id="description"
          placeholder=" "
          class="w-full input peer text-primary disabled:text-primary-500 border-none shadow"
          v-model="descr"
          :disabled="disabledStatus"
        />
        <label
          class="input-label text-md peer-focus:text-primary"
          for="description"
          >รายละเอียด</label
        >
      </div>
    </div>
    <!-- Subject Description -->

    <!-- Button Group -->
    <ModalButtonGroup
      :disabledStatus="disabledStatus"
      topic="วิชา"
      @change="toggleDisabledStatus"
      @save="saveHandler"
      @delete="openDangerModal"
    />
    <!-- Button Group -->
  </div>

  <!-- Delete Modal -->
  <DangerModal
    v-show="deleteModal"
    @cancel="closeDangerModal"
    @confirm="confirmDelHandle"
    >หลักสูตร {{ name }}
  </DangerModal>
  <!-- Delete Modal -->
</DetailModalTemplete>
```

### Script Part

``` js 
import { defineComponent } from "vue";
import InputTemplete from "./InputTemplete.vue";
import ModalButtonGroup from "./ModalButtonGroup.vue";
import DetailModalTemplete from "./DetailModalTemplete.vue";
import DangerModal from "./DangerModal.vue";

export default defineComponent({
  props: {
    curriculums: Object,
    data: Object,
    index: Number,
  },
  components: {
    InputTemplete,
    ModalButtonGroup,
    DetailModalTemplete,
    DangerModal,
  },
  data() {
    return {
      deleteModal: false,
      disabledStatus: true,
      id: this.data.id,
      name: this.data.name,
    };
  },
  methods: {

    // Emit the value in variable to the View Page
    saveHandler() {
      this.$emit(
        "update",
        {
          id: this.id,
          code: this.code,
          name: this.name,
        },
        this.index //Send the index value to change user visibility
      );
    },

    // Open DangerModal
    openDangerModal() {
      this.deleteModal = true;
    },

    // Close DangerModal
    closeDangerModal() {
      this.deleteModal = false;
    },

    // Confirm the delete object and emit to view page
    confirmDelHandle() {
      this.deleteModal = false;
      console.log(this.id);
      this.$emit("delete", { id: this.id });
    },

    // To tgggle disabled state to true
    changeDisabledStatusToTrue() {
      this.disabledStatus = true;
    },

    // To change the toggle state disabledStatus
    toggleDisabledStatus() {
      this.disabledStatus = !this.disabledStatus;
    },

    valueChangeHandle(data) {
      switch (data.key) {
        // Code Variable
        case "code":
          this.code = data.value;
          break;
      }
    },
  },
  watch: {
    "data.id": function (newValue) {
      this.id = newValue;
    },
  },
});

```
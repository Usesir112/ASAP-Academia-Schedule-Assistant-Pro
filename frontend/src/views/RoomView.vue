<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header title="ห้องเรียน" @input-change="searchValueIncoming" />
    <!-- Header -->

    <!-- Body -->
    <div class="mt-3">
      <table class="min-w-full text-left border shadow-md table-auto">
        <thead class="border-b font-medium text-white bg-primary">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3">ห้องเรียน</th>
            <th class="p-3">จำนวน</th>
            <th class="p-3">ประเภท</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(room, index) in filteredRoom"
            :key="room.id"
            data-te-toggle="modal"
            data-te-target="#data"
            @click="sendDataToModal(room, index)"
            class="cursor-pointer transition duration-300 ease-in-out text-primary hover:bg-primary-100"
          >
            <td class="p-3 text-center">{{ room.id }}</td>
            <td class="p-3">{{ room.name }}</td>
            <td class="p-3">{{ room.amount }}</td>
            <td class="p-3">{{ room.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Body -->

    <!-- Modal -->
    <RoomModal
      :data="room"
      :index="index"
      ref="toggle"
      @update="updateHandle"
      @delete="deleteHandle"
    />
    <AddRoom @addObject="addObject" />
    <!-- Modal -->
  </div>
</template>
<script>
import { defineComponent } from "vue";

// Import Component
import Header from "../components/Header.vue";
import AddRoom from "../components/Room/AddRoom.vue";
import RoomModal from "../components/Room/RoomModal.vue";

// Import Axios
import axios from "axios";

export default defineComponent({
  components: {
    Header,
    AddRoom,
    RoomModal,
  },
  data() {
    return {
      search: "", //Search the curriculum

      rooms: [], // All rooms data
      room: {}, // room data
      filteredRoom: [], // All room search
    };
  },
  methods: {
    // Create the room Data
    async addObject(data) {
      try {
        await axios.post("/api/room", data);
      } catch (error) {
        console.log(error);
      }
    },

    // Fetch the room(s) data
    async fetchRoom() {
      try {
        const response = await axios.get("/api/room");
        this.rooms = response.data;
        this.filteredRoom = this.rooms;
      } catch (error) {
        console.error(error);
      }
    },

    // Update room data
    async updateHandle(data, i) {
      // Update data for the user
      const room = this.filteredRoom;
      room[i].id = data.id;
      room[i].name = data.name;
      room[i].amount = data.amount;
      room[i].type = data.type;

      // Update the data to Database
      await axios.put(`/api/room/${data.id}`, data);
    },

    // Delete the curiculum
    async deleteHandle(data) {
      try {
        await axios.delete(`/api/room/${data.id}`);
        alert("ลบห้องเรียนเรียบร้อยแล้ว");
        location.reload();
      } catch (error) {
        console.error(error.response.data);
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data;
    },

    // Send room data to the roomModal.vue
    sendDataToModal(room, index) {
      this.room = room;
      this.index = index;
      this.$refs.toggle.changeDisabledStatusToTrue();
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredRoom = this.rooms.filter((item) => {
          return item.name.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredRoom = this.rooms;
      }
    },
  },
  created() {
    this.fetchRoom();
  },
});
</script>

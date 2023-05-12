<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="getRoomNameFromId(roomId).name"
      :disabledStatus="disabledStatus"
      id="roomName"
      :readonly="true"
      >ห้อง</InputTemplete
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
          id="roomName"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Room -->
      <ul>
        <li
          v-for="room in filteredRoom"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(room.id)"
        >
          {{ room.name }}
        </li>
      </ul>
      <!-- List of Room -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import axios from "axios";
import InputTemplete from "../InputTemplete.vue";

export default {
  props: {
    propRoomId: Number,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      roomId: this.propRoomId,
      rooms: [], //All room(s) in database
      filteredRoom: [], //All room(s) that result of search
    };
  },
  methods: {
    selectHandle(id) {
      this.roomId = id;
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
        this.filteredRoom = this.rooms;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.roomId = this.propRoomId;
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },

    // Fetch room(s) from database
    async fetchRoom() {
      try {
        const response = await axios.get("/api/room");
        this.rooms = response.data;
        this.filteredRoom = this.rooms;
      } catch (error) {
        console.error(error);
      }
    },
    getRoomNameFromId(roomId) {
      const room = this.rooms.find((s) => s.id === roomId);
      return room ? room : "";
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
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
  created() {
    this.fetchRoom();
  },
};
</script>

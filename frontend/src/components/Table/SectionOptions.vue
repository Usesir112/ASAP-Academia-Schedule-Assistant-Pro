<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="section"
      :disabledStatus="disabledStatus"
      id="section"
      :readonly="true"
      >กลุ่มเรียน</InputTemplete
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
          id="section"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Room -->
      <ul>
        <li
          v-for="time in filteredTimes"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(time)"
        >
          {{ time }}
        </li>
      </ul>
      <!-- List of Room -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";
import { times } from "./Data.js";

export default {
  props: {
    propEndTime: String,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      endTime: this.propEndTime,
      endTimes: times, //All endTime(s) in database
      filteredTimes: times, //All endTime(s) that result of search
    };
  },
  methods: {
    selectHandle(data) {
      this.endTime = data;
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
        this.filteredTimes = this.endTimes;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.endTimes = this.propEndTime;
      }
    },

    // Search Feature
    searchValueIncoming(data) {
      this.search = data.value;
    },
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        this.filteredTimes = this.endTimes.filter((item) => {
          return item.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredTimes = this.endTimes;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
};
</script>

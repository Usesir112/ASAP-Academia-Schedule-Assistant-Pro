<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="dayOfWeek"
      :disabledStatus="disabledStatus"
      id="dayOfWeek"
      :readonly="true"
      >วัน</InputTemplete
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
          id="dayOfWeek"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Room -->
      <ul>
        <li
          v-for="day in filteredDayOfWeek"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(day)"
        >
          {{ day }}
        </li>
      </ul>
      <!-- List of Room -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";
import { dayOfWeek } from "./Data.js";

export default {
  props: {
    propdayOfWeek: String,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      dayOfWeek: this.propdayOfWeek,
      daysOfWeek: dayOfWeek, //All dayOfWeek(s) in database
      filteredDayOfWeek: dayOfWeek, //All dayOfWeek(s) that result of search
    };
  },
  methods: {
    selectHandle(data) {
      this.dayOfWeek = data;
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
        this.filteredDayOfWeek = this.daysOfWeek;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.dayOfWeek = this.propdayOfWeek;
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
        this.filteredDayOfWeek = this.daysOfWeek.filter((item) => {
          return item.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredDayOfWeek = this.daysOfWeek;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
};
</script>

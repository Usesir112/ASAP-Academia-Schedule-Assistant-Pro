<template>
  <div>
    <!-- Button -->
    <InputTemplete
      @click="togglePopover"
      :data="type"
      :disabledStatus="disabledStatus"
      id="type"
      :readonly="true"
      >ประเภท</InputTemplete
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
          id="type"
          >ค้นหา</InputTemplete
        >
      </div>

      <!-- List of Room -->
      <ul>
        <li
          v-for="item in filteredTypes"
          class="p-3 m-2 durarion-300 hover:bg-primary-200 cursor-pointer"
          @click="selectHandle(item)"
        >
          {{ item }}
        </li>
      </ul>
      <!-- List of Room -->
    </div>
    <!-- Popover -->
  </div>
</template>
<script>
import InputTemplete from "../InputTemplete.vue";
import { types } from "./Data.js";

export default {
  props: {
    propType: String,
    disabledStatus: Boolean,
  },
  components: { InputTemplete },
  data() {
    return {
      search: "", //Search Feature
      popover: false,
      type: this.propType,
      types: types, //All type(s) in database
      filteredTypes: types, //All type(s) that result of search
    };
  },
  methods: {
    selectHandle(data) {
      this.type = data;
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
        this.filteredTypes = this.types;
        document.removeEventListener("click", this.hidePopoverOnClickOutside);
      }
    },
    changeTheValueBackIfNotSave() {
      if (this.disabledStatus == true) {
        this.types = this.propType;
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
        this.filteredTypes = this.types.filter((item) => {
          return item.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredTypes = this.types;
      }
    },
    disabledStatus(newValue, oldValue) {
      this.changeTheValueBackIfNotSave();
    },
  },
};
</script>

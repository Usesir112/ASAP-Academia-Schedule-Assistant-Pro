<template>
  <div class="relative mr-3">
    <input
      class="input peer text-primary disabled:text-primary-500"
      type="text"
      :id="id"
      placeholder=" "
      :disabled="disabledStatus"
      :readonly="readonly"
      v-model="inputValue"
      @input="emitInputChange"
    />
    <label :for="id" class="input-label text-md peer-focus:text-primary">
      <slot />
    </label>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: String,
    disabledStatus: Boolean,
    id: String,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: this.data,
    };
  },
  methods: {
    emitInputChange() {
      this.$emit("input-change", { value: this.inputValue, key: this.id });
    },
  },
  watch: {
    data: function (newValue) {
      this.inputValue = newValue;
    },
  },
});
</script>

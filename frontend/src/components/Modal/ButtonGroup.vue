<template>
  <div
    class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4"
  >
    <button
      type="button"
      @click="deleteEmit"
      data-te-toggle="modal"
      data-te-target="#delete"
      data-te-ripple-init
      data-te-ripple-color="light"
      class="button mr-3 text-rose-400 border border-rose-400 hover:bg-rose-400 hover:text-white"
    >
      ลบ{{ topic }}
    </button>
    <button
      type="button"
      @click="changeEmit"
      :disabled="!disabledStatus"
      data-te-ripple-init
      data-te-ripple-color="light"
      class="button mr-3 text-white bg-[#FFD966] hover:bg-[#FFF2CC]"
    >
      แก้ไข
    </button>
    <button
      type="button"
      @click="cancelEmit"
      data-te-ripple-init
      data-te-ripple-color="light"
      data-te-modal-dismiss
      data-te-toggle="modal"
      data-te-target="#warning"
      :disabled="disabledStatus"
      class="button mr-3 bg-rose-400 text-white hover:bg-rose-300"
    >
      ยกเลิก
    </button>
    <button
      type="button"
      @click="saveEmit"
      data-te-ripple-init
      data-te-modal-dismiss
      data-te-toggle="modal"
      data-te-target="#save"
      data-te-ripple-color="light"
      :disabled="disabledStatus"
      class="button mr-3 bg-teal-500 text-white hover:bg-teal-400"
    >
      บันทึก
    </button>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    disabledStatus: Boolean,
    topic: String,
  },
  methods: {
    deleteEmit() {
      this.$emit("delete");
    },
    changeEmit() {
      this.$emit("change");
    },
    saveEmit() {
      this.$emit("save");
    },
    cancelEmit() {
      this.$emit("cancel");
    },
  },
});
</script>

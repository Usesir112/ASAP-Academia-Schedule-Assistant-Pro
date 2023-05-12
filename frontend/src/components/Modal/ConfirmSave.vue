<template>
  <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="save"
    data-te-backdrop="static"
    data-te-keyboard="false"
    tabindex="-1"
    aria-labelledby="saveLabel"
    aria-hidden="true"
  >
    <div
      data-te-modal-dialog-ref
      class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
    >
      <div
        class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
      >
        <!--Modal body-->
        <div data-te-modal-body-ref class="relative p-4">
          <p class="text-2xl p-5 text-teal-500">
            ยืนยันการเปลี่ยนแปลง
          </p>
        </div>

        <!--Modal footer-->
        <div
          class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4"
        >
          <!-- Cancel Button -->
          <button
            type="button"
            class="bg-danger"
            data-te-ripple-init
            data-te-modal-dismiss
            data-te-ripple-color="light"
          >
            ยกเลิก
          </button>
          <!-- Cancel Button -->

          <!-- Confirm Button -->
          <button
            type="button"
            class="bg-success"
            data-te-modal-dismiss
            data-te-ripple-init
            data-te-ripple-color="light"
            @click="emitConfirm"
          >
            ยืนยัน
          </button>
          <!-- Confirm Button -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    emitConfirm() {
      this.$emit("confirm-save");
    },
  },
};
</script>
<style scoped>
.bg-danger {
  @apply button 
  mr-3 
  bg-rose-400 
  text-white 
  hover:bg-rose-300;
}

.bg-success {
    @apply
    button 
    mr-3 
    bg-teal-500 
    text-white 
    hover:bg-teal-400
}

</style>

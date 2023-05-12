<template>
  <div
    data-te-modal-init
    class="modal-init"
    :id="id"
    tabindex="-1"
    aria-labelledby="header"
    aria-hidden="true"
  >
    <div data-te-modal-dialog-ref class="modal-dialog max-w-[80%]">
      <div
        class="modal-card-body min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)]"
      >
        <!-- Header -->
        <div class="text-primary p-5 text-2xl flex">
          <!-- TODO: Header name -->
          <span> {{ name }} </span>

          <button
            type="button"
            class="modal-close-modal-button"
            data-te-modal-dismiss
            aria-label="Close"
          >
            <span class="modal-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
        <!-- Header -->

        <!-- Modal Body -->
        <slot />
        <!-- Modal Body -->
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    id: String,
  },
});
</script>

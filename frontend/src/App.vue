<template>
  <div class="mt-[5rem]">
    <component :is="selectedLayout">
      <router-view />
    </component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Layout from "./layouts/default.vue";
import Table from "./layouts/table.vue"

export default defineComponent({
  components: { Layout, Table },
  computed: {
    selectedLayout() {
      if (this.$route.meta.title == "ตารางเรียน") {
        return "Table"
      } else {
        return "Layout"
      }
    }
  },
  setup() {},
});
</script>

<template>
    <navbar />
    <div class="mx-[2rem]">
      <slot />
    </div>
    <Footer />
</template>
<script>
import { defineComponent } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue';

export default defineComponent({
  components: { Navbar, Footer },
})
</script>
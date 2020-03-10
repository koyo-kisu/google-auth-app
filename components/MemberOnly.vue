<template>
  <div v-if="loaded">
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated'])
  },

  async mounted() {
    setTimeout(() => {
      if(!this.isAuthenticated) {
        this.$router.push('/')
      }
      this.loaded = true
    }, 0)
  }
}
</script>

<style>

</style>
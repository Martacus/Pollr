<template>
  <div id="app">
      <NavComponent></NavComponent>
      <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavComponent from '@/components/Nav.vue'

export default {
  name: 'App',
  components: {
    NavComponent
  }
}
</script>

<style lang="scss">

</style>

<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="sass">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html, body
  font-size: 16px
  height: 100%
  width: 100%

#app
  width: 100%
  height: 100%
  font-size: 100%

.search-bar
  width: 100%
  .form-group
    width: 100%
    .bv-no-focus-ring
        display: flex
        flex-flow: row nowrap
        align-items: center
        justify-content: center
        width: 100%
</style>

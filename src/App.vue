<template>
  <div id="app">
    <h1 Heading</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;*/
  color: #2c3e50;
  margin-top: 0px;
}
.md-theme-blue.md-toolbar {
    background-color: #2196f3;
    color: rgba(255, 255, 255, .87);
}

</style>

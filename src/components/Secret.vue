<template>
  <div>
    <div class="cell" :class="[color]">
    </div>
  </div>
</template>

<script>
// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
export default {
  name: 'secret',
  props: [ 'colno', 'color' ],
  data () {
    return {
      // col: '',
      // bld: '',
      // up: false,
      // dopop: false
    }
  },
  computed: {
  },
  created: function () {
    this.col = this.value
  },
  methods: {
  }
}
</script>

<style>
.card {
  padding: 5px;
  font-family: sans-serif;
  list-style: none;
  margin-bottom: 7px;
}
.space-below {
  margin-bottom: 10px;
}
.blue {
  padding: 0 3px;
  color: dodgerblue;
}
/*div {
  border: 1px solid #999;
}*/
div.cell {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #ccc;
  text-align: center;
  vertical-align: middle;
  border-radius: 23px;
}
div.bld {
  border: 2px solid #333;
  width: 46px;
  height: 46px;
}
td.eq {
  width: 33%;
  height: 48px;
  /*border: 1px solid #ccc;*/
  text-align: center;
  vertical-align: middle;
  border-radius: 23px;
  /*background-color: #000;*/
}
table.abs {
  position: absolute;
  width: 150px;
  height: 100px;
}
table {
  border-collapse: collapse;
}
.g {
  background-color: #0e0;
  content: "_";
}
.r {
  background-color: #e00;
  color: white;
  content: "_";
}
.b {
  background-color: #00e;
  color: white;
  content: "_";
}
.y {
  background-color: #ee0;
  content: "_";
}
.p {
  background-color: #e0e;
  color: white;
  content: "_";
}
.c {
  background-color: #0ee;
  content: "_";
}
.w {
  color: #333;
  background-color: #ccc;
  content: "?";
}
</style>

<template>
  <div>
    <div class="res" >
      <table id="res">
        <tr>
          <td :class="pcol1"></td><td :class="pcol2"></td>
        </tr>
        <tr>
          <td :class="pcol3"></td><td :class="pcol4"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
export default {
  name: 'result',
  props: ['rno', 'inPlace', 'inColor'],
  data () {
    return {
      pcol1: '',
      pcol2: '',
      pcol3: '',
      pcol4: ''
    }
  },
  computed: {
  },
  created: function () {
    let i
    let j = 0
    for (i = 0; i < this.inPlace; i++) {
      j++
      this['pcol' + j] = 'b'
    }
    for (i = 0; i < this.inColor; i++) {
      j++
      this['pcol' + j] = 'w'
    }
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
div.res {
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin: 0 5px;
  background-color: #ccc;
  /* border: 1px solid #ccc;*/
}
td.eq {
  width: 33%;
  height: 48px;
  border: 1px solid #ccc;
  text-align: center;
  vertical-align: middle;
  /*border-radius: 23px;*/
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
}
.r {
  background-color: #e00;
}
.b {
  background-color: #00e;
}
.y {
  background-color: #ee0;
}
.p {
  background-color: #e0e;
}
.c {
  background-color: #0ee;
}
table#res  {
  background-color: #ccc;
}
table#res td {
  background-color: #ccc;
  width: 22px;
  height: 22px;
}
table#res td.b {
  background-color: #000;
  border-radius: 12px;
}
table#res td.w {
  background-color: #fff;
  border-radius: 10px;
}
</style>

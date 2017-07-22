<template>
  <div>
    <div @click="popup" :class="[acell, color, bld]">
    </div>
    <div v-if="dopop" class="side">
      <table class="abs">
      <tr>
        <td class="eq g" @click="setcolor('g')"></td>
        <td class="eq r" @click="setcolor('r')"></td>
        <td class="eq b" @click="setcolor('b')"></td>
      </tr>
      <tr>
        <td class="eq y" @click="setcolor('y')"></td>
        <td class="eq p" @click="setcolor('p')"></td>
        <td class="eq c" @click="setcolor('c')"></td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script>
// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
export default {
  name: 'cell',
  props: ['rno', 'cno', 'dopop', 'color', 'active'],
  data () {
    return {
      acell: 'cell',
      // col: '',
      bld: this.dopop ? 'bld' : ''
    }
  },
  computed: {
  },
  created: function () {
    // console.log('Created: ', new Date(), this.rno, this.cno, this.dopop, this.active)
    self.bld = self.dopop ? 'bld' : ''
    console.log(this.color)
  },
  watch: {
    // dopop: function () {
    //   console.log('Cell: dopop changed', this.dopop)
    // }
  },
  methods: {
    popup: function () {
      if (!this.active) {
        return
      }
      if (this.dopop) {
        console.log('was on')
        // turning off
        // this.$set(this.$parent.$data.rowsdopop = false
        this.bld = ''
        // this.up = false
        this.$emit('setDopop', this.rno, this.cno, false)
      } else {
        console.log('was off')
        this.$emit('rowClear')
        this.$emit('setDopop', this.rno, this.cno, true)
        // this.dopop = true
        this.bld = 'bld'
        // this.up = true
      }
    },
    setcolor: function (col) {
      console.log('In setcolor: ', col)
      // this.col = col
      // this.dopop = false
      this.$emit('setDopop', this.rno, this.cno, false)
      this.$emit('setcol', this.rno, this.cno, col)
      // this.bld = ''
    }
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
div.side {
  /*width:150px;
  height: 100px;*/
  position: relative;
  left: 50px;
  top: -82px;
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
  color: white;
}
.b {
  background-color: #00e;
  color: white;
}
.y {
  background-color: #ee0;
}
.p {
  background-color: #e0e;
  color: white;
}
.c {
  background-color: #0ee;
}
</style>

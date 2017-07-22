<template>
  <div style="height: 100vh; ">
    <div style="width: 500px;margin: 30px auto;">
      <h1>Master Mind</h1>
      <table id="main">
        <tr><td colspan=5>
          <table width="100%"><tr style="height: 25px;">
            <td width="33%"><button class="new" @click="renew">New</button></td>
            <td width="33%"><button class="next" @click="nextTurn">Next</button></td>
            <td><button class="show" @click="showSecret">Show</button></td>
          </tr></table>
        </td></tr>
        <tr>
          <td v-if="showIt" v-for="j in [0, 1, 2, 3]">
            <secret 
              :colno="j" 
              :color="secret[j]"
            >
            </secret></td>
          <td v-if="!showIt" v-for="j in [0, 1, 2, 3]">
            <secret 
              :colno="j" 
              color="w"
            >
            </secret></td>
          <td v-if="showIt">Secret</td>
          <td v-if="!showIt">Secret<br/>Hidden</td>
        </tr>
        <tr v-if="showCells" v-for="i in rseq">
          <td v-for="j in seq">
            <cell 
              :rno="i" :cno="j" 
              :dopop="rows[i][j].dopop"
              :color="rows[i][j].color"
              :active="rows[i][j].active" 
              @rowClear="clearRow"
              @setDopop="setDopop"
              @setcol="setcol">
            </cell>
          </td>
          <td>
            <result
              :rno="i"
              :inPlace="results[i].inPlace"
              :inColor="results[i].inColor"
            >
            </result> 
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
import Cell from './Cell'
import Secret from './Secret'
import Result from './Result'
export default {
  name: 'row',
  data () {
    return {
      // scol: '',
      showCells: true,
      showIt: false,
      colorMap: {
        0: 'r',
        1: 'g',
        2: 'b',
        3: 'y',
        4: 'p',
        5: 'c'
      },
      secret: ['', '', '', ''],
      pos: 0,
      rows: [
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}]
      ],
      results: [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
      ],
      rseq: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      seq: [ 0, 1, 2, 3 ]
    }
  },
  components: {
    Cell, Result, Secret
  },
  computed: {
  },
  created: function () {
    this.renew()
  },
  methods: {
    // this should help to rerender the tree properly
    rerender: function () {
      this.showCells = false
      this.$nextTick(() => {
        this.showCells = true
        console.log('re-render start')
        this.$nextTick(() => {
          console.log('re-render end')
        })
      })
    },
    setDopop: function (i, j, val) {
      console.log('in setDopop', i, j, val)
      this.$set(this.rows[i][j], 'dopop', val)
      this.rerender()
    },
    clearRow: function () {
      console.log('In clearRow', this.pos)
      // clear the dopop setting on all items of this row
      const that = this
      this.seq.forEach(function (i) {
        that.$set(that.rows[that.pos][i], 'dopop', false)
      })
      this.rerender()
    },
    setcol: function (i, j, col) {
      console.log('setting color: ', i, j, col)
      this.$set(this.rows[i][j], 'color', col)
      this.rerender()
    },
    getRandomInt: function (min, max) { // getRandomInt
      min = Math.ceil(min)
      max = Math.floor(max)
      // The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min
    },
    renew: function () {
      const that = this
      console.log('Resetting game ...')
      this.seq.forEach(function (i) {
        let newcol = that.colorMap[that.getRandomInt(0, 6)]
        while (that.secret.indexOf(newcol) !== -1) {
          newcol = that.colorMap[that.getRandomInt(0, 6)]
        }
        that.secret[i] = newcol
      })
      this.rows.forEach(function (row, i) {
        row.forEach(function (cell, j) {
          cell.rno = i
          cell.cno = j
          cell.up = false
          cell.dopop = false
          cell.bld = ''
          cell.id = i * 4 + j
          // cell.active = false
          cell.up = false
          cell.color = ''
          if (i === 0) {
            cell.active = true
          } else {
            cell.active = false
          }
        })
      })
      this.results.forEach(function (res, i) {
        res.inPlace = 0
        res.inColor = 0
      })
      this.showIt = false
      this.rerender()
      console.log('State: ', this.$data)
    },
    nextTurn: function () {
      // now evalualte the play
      console.log('Next turn')
      const that = this
      let colors = ['', '', '', '']
      console.log('this pos: ', this.pos)
      let ct = 0
      this.seq.forEach(function (i) {
        colors[i] = that.rows[that.pos][i].color
        if (colors[i] !== '') {
          ct++
        }
      })
      if (ct !== 4) {
        return
      }
      this.seq.forEach(function (i) {
        let c = colors[i]
        if (that.secret[i] === c) {
          that.results[that.pos].inPlace++
        } else {
          if (that.secret.indexOf(c) !== -1) {
            that.results[that.pos].inColor++
          }
        }
      })
      console.log('Selected colors: ', colors, this.secret)
      console.log('Result: ', this.results[this.pos])
      this.pos++
      this.seq.forEach(function (i) {
        that.rows[that.pos - 1][i].active = false
        that.rows[that.pos][i].active = true
      })
      console.log('pos: ', this.pos)
      this.rerender()
    },
    showSecret: function () {
      // showSecret
      this.showIt = true
    }
  }
}
</script>

<style>
table#ain {
  border-collapse: collapse;
}
table#main tr {
  border-botom: 2px solid #333;
}
button {
  width: 100%;
  height: 35px;
  background-color: #ccc;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
}
button.new {
  background-color: #dfd;
}
button.next {
  background-color: #ddf;
}
button.show {
  background-color: #fdd;
}
</style>

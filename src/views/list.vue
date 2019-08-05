<template>
  <div class="container">
    <div class="content list"
    v-infinite-scroll="loadMore">
      <div class="list-block infinite-list">
        <ul>
          <li class="item-content" v-for="(item,index) in items" :track-by="index">
            <div class="item-media"><i class="icon icon-dianji"></i></div>
            <div class="item-inner">
              <div class="item-title">商品名称</div>
              <div class="item-after">{{item.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as base from '../assets/js/base'
export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  data () {
    return {
      items: [
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
        {"id":0,"name":"123"},
      ],
      loading: false
    }
  },
  computed: {
    length () {
      return this.items.length
    }
  },
  methods: {
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.list');
      base.showLodding();
      setTimeout(() => {
        let i = this.length
        this.items.push({
          id: i,
          name: `demo${i + 1}`
        })
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        base.hideLodding();
      }, 1500)
    }
  }
}
</script>

<style scoped>
</style>

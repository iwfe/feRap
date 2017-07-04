<template>
  <header id="header">
    <div class="header-wrap clearfix">
      <div class="menu">
        <a v-for="(item, index) in menus" class="item" :class="{active: active == index}" v-bind:key="index" :href="item.url"> {{item.text}} </a>
        <div class="right">
          <a class="item msg-span" href="/message">消息 (<span class="msg-count">3</span>)</a>
          <div class="item" tabindex="0">
            <span>lancui <i class="dropdown icon"></i></span>
            <div tabindex="-1" class="drop-items">
              <a class="item" href="/user/profile">个人设置</a>
              <a class="item" href="/logout">退出</a> </div>
          </div>
        </div>
      </div>
    </div>
</header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      menus: [
        {url: '/index', text: '首页'},
        {url: '/teams/index?prdId=m3tnaO', text: '团队'},
        {url: '/api/index', text: 'API'},
        {url: '/calendar', text: '日历'}
      ],
      active: 0
    }
  },
  beforeMount () {
    this.urlAnalyze()
  },
  methods: {
    urlAnalyze () {
      const pathname = location.pathname
      const pathArr = ['/index', '/teams', '/api', '/calendar']
      for (let i = 0; i < pathArr.length; i++) {
        const exp = new RegExp('^' + pathArr[i] + '\\b')
        if (exp.test(pathname)) {
          this.active = i
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#header {
  background-color: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
  box-shadow: 0 1px 6px rgba(99,99,99,.2);
  font-size: 14px;
}
.header-wrap {
  width: 100%;
  margin: 0 auto;
  padding: 0 5%;
}
.menu {
  display: flex;
  font-family: Lato,Helvetica Neue,Arial,Helvetica,sans-serif;
  background: #fff;
  font-weight: 400;
}
.item {
  box-sizing: border-box;
  min-width: 72px;
  border-bottom-color: transparent;
  border-bottom-style: solid;
  border-radius: 0;
  height: 64px;
  line-height: 64px;
  align-items: end;
  padding-left: 20px;
  padding-right: 20px;
  align-self: flex-end;
  margin: 0 0 -2px;
  border-bottom-width: 2px;
  -webkit-transition: color,border-bottom-color .2s ease;
  transition: color,border-bottom-color .2s ease;
  &:hover{
    border-bottom-color: #20a0ff;
    color: #20a0ff;
  }
  &.active{
    border-bottom-color: #20a0ff;
    color: #20a0ff;
    font-weight: 700;
  }
}
.right {
  display: flex;
  margin-left: auto;
  margin-right: 10px;
}
.drop-items {
  display: none;
}
</style>

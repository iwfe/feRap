<template>
  <header id="header">
  <div class="header-wrap clearfix">
    <div class="menu">
      <a v-for="item in menus" class="item" :href="item.url"> {{item.text}} </a>
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
        {url: '/', text: '首页'},
        {url: '/teams', text: '团队'},
        {url: '/api/all', text: 'API'},
        {url: '/calendar', text: '日历'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  box-shadow: 0 1px 6px rgba(99,99,99,.2);
}
.header-wrap {
  width: 75pc;
  margin: 0 auto;
}
.menu {
  display: flex;
  font-family: Lato,Helvetica Neue,Arial,Helvetica,sans-serif;
  background: #fff;
  font-weight: 400;
  border-bottom: 1px solid rgba(34,36,38,.15);
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
}
.item {
  border-bottom-color: transparent;
  border-bottom-style: solid;
  border-radius: 0;
  item-align: end;
  padding: 10px 20px;
  align-self: flex-end;
  margin: 0 0 -2px;
  border-bottom-width: 2px;
  -webkit-transition: color .1s ease;
  transition: color .1s ease;
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

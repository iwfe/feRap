<template>
  <header id="header">
  <div class="header-wrap clearfix">
    <div class="menu">
      <router-link v-for="item in menus" class="item" :to="item.url">{{item.text}}</router-link>

      <div class="right">
        <div class="item" tabindex="0" v-if="username">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="item" v-else="username">
          <router-link :to="{path:'/login', query: {redirect: currentPath}}">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</header>
</template>

<script>
import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
export default {
  name: 'header',
  components: {
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
  },
  data () {
    return {
      menus: [
        {url: '/index', text: '首页'},
        {url: '/teams/index?prdId=m3tnaO', text: '团队'},
        {url: '/api/index', text: 'API'},
        {url: '/calendar', text: '日历'}
      ]
    }
  },
  computed: {
    username () {
      return this.$store.getters['login/getLoginUserName']
    },
    currentPath () {
      console.log(this.$route)
      return this.$route.fullPath
    }
  },
  methods: {
    logout () {
      console.log('logout')
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('login/setLoginStatus', false)
          this.$router.push('/login')
          break
        case 'profile':
          console.log('profile')
          break
        default:
          console.log('default')
      }
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

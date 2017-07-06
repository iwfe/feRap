<template>
  <section id="login-panel">
    <div class="mod-login" data-reactroot="" >
      <h1 class="title">{{title}}</h1>
      <div class="form">
        <div class="form-item">
          <label for="username" class="form-item-label form-item-required">用户名 : </label>
          <div class="col-14">
            <div class="form-item-control has-success"><span class="input-wrapper"><input v-model="username" type="text" name="username" id="username" value="" placeholder="请输入用户名" class="input input-lg"></span></div>
          </div>
        </div>
        <div class="form-item">
          <label for="password" class="form-item-label form-item-required">密码 : </label>
          <div class="col-14">
            <div class="form-item-control "><span class="input-wrapper"><input v-model="password" type="password" name="password" id="password" value="" placeholder="请输入密码" class="input input-lg"></span></div>
          </div>
        </div>

        <div class="register clearfix">
          <span class="error-info" v-if="error">{{error}}</span>
          <a v-if="isLogin" class="pull-right" href="/regist">没有帐号?</a>
          <a v-else class="pull-right" href="/login">已有帐号?</a>
        </div>
        <div class="form-item" style="margin-top:24px;">
          <div class="col-16 col-offset-6">
            <div class="form-item-control ">
              <button @click="submit" type="submit" class="btn btn-primary btn-lg"><span>{{title}}</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      error: window.pageConfig.error,
      username: '',
      password: ''
    }
  },
  mounted () {
  },
  computed: {
    isLogin () {
      return this.$route.path.indexOf('regist') === -1
    },
    title () {
      return this.isLogin ? '登 录' : '注 册'
    },
    formAction () {
      return this.isLogin ? '/login' : '/regist'
    }
  },
  methods: {
    submit () {
      let self = this

      axios({
        method: 'POST',
        url: this.formAction,
        data: {
          username: this.username,
          password: this.password
        }
      }).then(function (result) {
        if (result && result.data && result.data.isLogin) {
          self.$store.dispatch('login/setLoginStatus', result.data.isLogin)
          self.$store.dispatch('login/setLoginUserName', result.data.userName)

          let redirect = self.$route.query.redirect

          if (redirect) {
            self.$router.replace({
              path: self.$route.query.redirect
            })
          } else {
            self.$router.replace({
              path: '/'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
  #login-panel {
    width: 435px;
    min-height: 400px;
    margin: 10px auto;
    padding: 16px;
    background-color: #fff;
    color: #666;
    font-size: 12px;
    .mod-login {
      margin: 40px auto;
    }
    .title {
      font-size: 24px;
    }
    .form-item {
      display: flex;
      justify-content: center;
      margin: 25px auto;
    }
    .form-item-label {
      width: 70px;
      margin-right: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .form-item-required:before {
      display: inline-block;
      margin-right: 4px;
      content: "*";
      font-family: SimSun;
      font-size: 12px;
      color: #f50;
    }
    .input {
      position: relative;
      display: inline-block;
      padding: 6px 7px;
      width: 100%;
      height: 32px;
      cursor: text;
      font-size: 12px;
      line-height: 1.5;
      color: #666;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      border-color: #d9d9d9;
      box-shadow: none;
      // background-color: rgb(250, 255, 189);
      background-image: none;
      color: rgb(0, 0, 0);
      outline: none;
      -webkit-transition: border 0.2s cubic-bezier(0.645,0.045,0.355,1),background 0.2s cubic-bezier(0.645,0.045,0.355,1),box-shadow 0.2s cubic-bezier(0.645,0.045,0.355,1);
      transition: border 0.2s cubic-bezier(0.645,0.045,0.355,1),background 0.2s cubic-bezier(0.645,0.045,0.355,1),box-shadow 0.2s cubic-bezier(0.645,0.045,0.355,1);
    }
    .col-14 {
      display: block;
      width: 60%;
    }
    .register {
      text-align: right;
      padding: 0 10px;
    }
    a {
      color: #2db7f5;
      background: transparent;
      text-decoration: none;
      outline: 0;
      cursor: pointer;
      -webkit-transition: color .3s ease;
      transition: color .3s ease;
    }
    .btn-primary {
      padding: 6px 15px;
      font-size: 14px;
      border-radius: 6px;
      color: #fff;
      background-color: #2db7f5;
      outline: none;
      border: 1px solid #2db7f5;
      cursor: pointer;
    }
  }
</style>

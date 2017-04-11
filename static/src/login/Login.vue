<template>
  <section id="main">
  <div class="mod-login" data-reactroot="" data-reactid="1">
    <h1 class="title" data-reactid="2">登录</h1>
    <form class="ant-form-horizontal form" method="post" form="[object Object]" data-reactid="3">
      <div class="ant-form-item" data-reactid="4">
        <label for="username" class="ant-col-6 ant-form-item-required" data-reactid="5">用户名 </label>
        <div class="ant-col-14" data-reactid="6">
          <div class="ant-form-item-control has-success" data-reactid="7"><span class="ant-input-wrapper" data-reactid="8"><input type="text" name="username" id="username" value="" placeholder="请输入用户名" class="ant-input ant-input-lg" data-reactid="9"></span></div>
        </div>
      </div>
      <div class="ant-form-item" data-reactid="10">
        <label for="password" class="ant-col-6 ant-form-item-required" data-reactid="11">密码 </label>
        <div class="ant-col-14" data-reactid="12">
          <div class="ant-form-item-control " data-reactid="13"><span class="ant-input-wrapper" data-reactid="14"><input type="password" name="password" id="password" value="" placeholder="请输入密码" class="ant-input ant-input-lg" data-reactid="15"></span></div>
        </div>
      </div>
      <!-- react-text: 16 -->
      <!-- /react-text -->
      <div class="register clearfix" data-reactid="17"><a class="pull-right" href="/register" data-reactid="18">没有帐号?</a></div>
      <div class="ant-form-item" style="margin-top:24px;" data-reactid="19">
        <div class="ant-col-16 ant-col-offset-6" data-reactid="20">
          <div class="ant-form-item-control " data-reactid="21">
            <button type="submit" class="ant-btn ant-btn-primary ant-btn-lg" data-reactid="22"><span data-reactid="23">登 录</span></button>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #main {
    width: 435px;
    min-height: 400px;
    margin: 10px auto;
    padding: 16px;
    background-color: #fff;
  }
</style>

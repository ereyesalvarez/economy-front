<template>
  <div class="row">
    <div class="col-sm col-md-4 col-md-offset-4" style="align-content: center; text-align: center">
      <p class="sign">Sign in</p>
      <div class="input-group fluid">
        <label for="username" style="width: 80px;">Username</label>
        <input id="username" v-model="username" placeholder="username" type="email">
      </div>
      <div class="input-group fluid">
        <label for="pwd" style="width: 80px;">Password</label>
        <input id="pwd" v-model="password" placeholder="password" type="password">
      </div>
      <div class="input-group fluid">
        <button class="button" @click="doLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore()
let username = ref("");
let password = ref("");

let doLogin = () => {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.dispatch('login', payload);
}
</script>


<style scoped>

.sign {
  padding-top: 40px;
  color: #8C55AA;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.button {
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #9C27B0, #E040FB);
  border: 0;
  padding: 10px 40px;
  font-family: 'Ubuntu', sans-serif;
  font-size: 13px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}
</style>

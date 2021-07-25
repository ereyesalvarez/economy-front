<template>
  <div class="container">
    <login v-if="!isLogged"></login>
    <home v-if="isLogged"></home>
    <span class="toast" :class="{red: alertMessage.type===1}" v-if="alertMessage.show">{{ alertMessage.message }}</span>

  </div>
</template>
<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const store = useStore()
let alertMessage = computed(() => store.state.alertMessage)
let isLogged = computed(() => store.getters.isLogged)
</script>

<style>

</style>

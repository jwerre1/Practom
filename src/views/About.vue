<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="email" placeholder="email" />
    <input type="text" v-model="password" placeholder="password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { handleSignup } from "@/services/DatabaseService.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      msg: "",
    };
  },
  methods: {
    onSubmit() {
      const obj = handleSignup(this.email, this.password);
      console.log(obj);
    },
  },
};
</script>

<template>
  <div class="signup">
    <h1>This is a sign up page</h1>
  </div>
  <form @submit.prevent="onSubmit">
    <p>
      <input type="text" v-model="email" placeholder="email" />
    </p>
    <p>
      <input type="text" v-model="password" placeholder="password" />
    </p>
    <p>
      <button type="submit">Submit</button>
    </p>
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
    async onSubmit() {
      try {
        const obj = await handleSignup(this.email, this.password);
        console.log(obj);
      } catch (err) {
        console.log("catch err", err);
      }
    },
  },
};
</script>

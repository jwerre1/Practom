<template>
  <div class="signin">
    <h1>This is a sign in page</h1>
  </div>
  <form @submit.prevent="onSubmit">
    <p>
      <input type="text" v-model="email" placeholder="email" />
    </p>
    <p>
      <input type="password" v-model="password" placeholder="password" />
    </p>
    <p>
      <button type="submit">Submit</button>
    </p>
    <p>
      <button @click.prevent="resetPassword">Reset Password</button>
    </p>
  </form>
</template>

<script>
import {
  handleLogin,
  handlePasswordReset,
} from "@/services/DatabaseService.js";

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
        const obj = await handleLogin(this.email, this.password);
        console.log(obj);
        if (!obj.error) this.$router.push("Main");
      } catch (err) {
        console.log("catch err", err);
      }
    },
    resetPassword() {
      const obj = handlePasswordReset(this.email);
      console.log(obj);
    },
  },
};
</script>

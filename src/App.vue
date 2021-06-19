<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/signup">Sign Up</router-link> |
    <router-link to="/signin">Sign In</router-link> |
    <a href="#" @click.prevent="signout">Sign Out</a>
  </div>
  <router-view />
</template>

<script>
import { handleSignOut } from "@/services/DatabaseService.js";

export default {
  methods: {
    async signout() {
      try {
        const obj = await handleSignOut();
        console.log(obj);
        if (!obj.error) this.$router.push("/");
      } catch (err) {
        console.log("catch err", err);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

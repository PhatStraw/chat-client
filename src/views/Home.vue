<template>
  <div class="home">
    <Layout>
      <template v-slot:default="slotProps">
        <div class="default">
          <h1>Welcome Back {{slotProps.curUsr.user.name}}, Lets Chat Around!</h1>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "../components/LayOut";

export default {
  name: "App",
  components: {
    Layout
  }
};
</script>

<style scoped>
.default {
  height: 100vh;
  width: 100%;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>

<style>
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

html {
  height: 100%;
  width: 100%;
}
</style>
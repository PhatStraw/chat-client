<template>
  <Layout>
    <div id="message-id">
      <div class="messages">
        <ul>
          <li v-for="message in messages" :key="message._id">{{message.message}}</li>
        </ul>
      </div>
      <div class="message-box-container">
        <div class="message-box">
          <input id="m" autocomplete="off" />
          <button>Send</button>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
// const wait = (time) => new Promise((res) => setTimeout(() => res(), time))
export default {
  beforeRouteEnter(to, from, next) {
    // TODO: make call for server to get messages for room by id
    next(async vm => {
      vm.id = vm.$route.params.id;
      await vm.getMessages();
    });
  },
  data() {
    return {
      id: "",
      messages: []
    };
  },
  methods: {
    async getMessages() {
      const resp = await window.fetch(
        `http://localhost:3000/messages/${this.id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: window.localStorage.getItem("Auth"),
            "Content-Type": "application/json"
          }
        }
      );
      const { messages } = await resp.json();
      this.messages = messages;
    }
  }
};
</script>
<style scoped>
.message-id {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

ul {
}

.message-box-container {
  display: flex;
  justify-content: center;
}

.message-box {
  position: fixed;
  bottom: 0;
  width: calc(100vw - 300px);
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-radius: 25px;
  border: 2px solid black;
  padding: 10px;
  width: 600px;
  height: 20px;
  background: #609;
}
.message-box input {
  border: 0;
  padding: 10px;
  width: 80%
}
.message-box button {
  background: #609;
  border: 0;
  padding: 10px
}

.message-box button:hover {
  background: black;
  color: #609;
  cursor: pointer;
}
.messages {
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 20px;
}

.messages li {
  padding: 5px 10px;
}
/* 
    .messages li:nth-child(odd) { 
        background: #eee; 
    } */
</style>
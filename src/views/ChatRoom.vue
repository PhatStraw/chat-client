<template>
  <Layout>
    <template>
    <div id="message-id">
      <div class="messages">
        <ul>
          <li v-for="message in prevMessages" :key="message._id">{{prevMessage.message}}</li>
        </ul>
        <ul>
          <li v-for="(msg, index) in messages" :key="index">{{msg.message}}</li>
        </ul>
      </div>
      <div class="message-box-container">
        <form class="message-box" @submit.prevent="sendMessage">
          <input type="text" v-model="message" class="form-control" />
          <button type="submit" class="btn btn-success" >Send</button>
        </form>
      </div>
    </div>
    </template>
  </Layout>
</template>
<script>
import io from "socket.io-client";

export default {
  beforeRouteEnter(to, from, next) {
    // TODO: make call for server to get messages for room by id
    next(async vm => {
      vm.id = vm.$route.params.id;
      await vm.getMessages();
      await vm.getUser();
    });
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
    
  },

  data() {
    return {
      id: "",
      curUsr: {},
      message: "",
      prevMessages: [],
      messages: [],
      socket: io("http://localhost:3000/")
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        from: this.curUsr.user._id,
        room: this.id,
        message: this.message
      });
      this.message = "";
    },
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
    },
    
    getUser: async function() {
      var token = window.localStorage.getItem('Auth')
      if (token) {
      var response = await window.fetch("http://localhost:3000/user", {
        headers: { authorization: token },
        mode: "cors",
        method: "GET"
      });
      var cur = await response.json();
      console.log(cur)
      this.curUsr = cur;
      }
    }
  }
};
</script>
<style scoped>
#message-id {
  width: calc(100vw - 300px);
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
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-radius: 25px;
  border: 2px solid black;
  padding: 10px;
  min-width: 500px;
  height: 20px;
  background: #609;
}
.message-box input {
  border: 0;
  padding: 10px;
  width: 80%;
}
.message-box button {
  background: #609;
  border: 0;
  padding: 10px;
}

.message-box button:hover {
  background: black;
  color: #609;
  cursor: pointer;
}
.messages {
  width: 100%;
  margin: 0;
  padding: 20px;
}

li {
  padding: 5px 10px;
  list-style-type: none;
}
/* 
    .messages li:nth-child(odd) { 
        background: #eee; 
    } */
</style>
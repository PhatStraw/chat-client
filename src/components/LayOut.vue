<template>
  <div class="layout">
    <nav class="sidenav">
      <div class="toolbar">{{curUsr.user.name}}</div>
        <router-link :to="{name: 'ChatRoom', params: {id: room._id}}" class="room" v-for="room in curUsr.rooms" :key="room.id" active-class="active">
          {{room.name}}
        </router-link>
      
    </nav>
    <main>
      <slot :curUsr="curUsr" />
    </main>
  </div>
</template>
<script>
export default {
  name: "Layout",

  async created() {

    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get("token") || window.localStorage.getItem('Auth')
    window.localStorage.setItem("Auth", token);

    if (token) {
      var response = await window.fetch("http://localhost:3000/user", {
        headers: { authorization: token },
        mode: "cors",
        method: "GET"
      });
      var cur = await response.json();
      this.curUsr = cur;
    }
  },

  data() {
    return {
      curUsr: {}
    };
  },

  methods: {
    async openChat(e) {
      e.preventDefault();
      var token = window.localStorage.getItem("Auth")
      var response = await window.fetch("http://localhost:3000/user", {
        headers: { authorization: token },
        mode: "cors",
        method: "GET"
      });

      console.log(response)

    }
  }
};
</script>

<style scoped>
.layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
}

/* Chat rooms */
.room {
  padding: 15px;
  color: darkgray;
  transition: color .07s ease-in;
  will-change: color;
}

.room:hover {
  color: red !important;
}

.room.active {
  color: black;
}


h3 {
  color: black;
}

.sidenav {
  height: 100vh; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed;
  top: 0; /* Stay at the top */
  left: 0;
  background-color: white; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  background: #efefef;
  border-right: 1px solid salmon;
}

.toolbar {
  height: 40px;
  padding: 15px;
  font-size: 20px;
  border-bottom: 2px solid black;
}
main {

    overflow-x: hidden;
  padding: 20px 0px 100px 300px;
  height: 100vh;
  width: calc(100vw - 300px);
}

/* The navigation menu links */
.sidenav a {
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a div {
  padding: 0.5rem;
  text-decoration: none;
  font-size: 25px;
  color: black;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a div:hover {
  color: red;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>



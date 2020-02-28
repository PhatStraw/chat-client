<template>
  <div class="card">
    <div class="sidenav">
      <a href="#">
        <div>{{curUsr.user.name}}</div>

        <h3>Messages</h3>
        <div class="container" v-for="room in curUsr.rooms" :key="room.id">
          <h4>{{room.name}}</h4>
          <h6>{{room.messages[0]}}</h6>
        </div>
      </a>
    </div>
    <slot :curUsr="curUsr" />
  </div>
</template>
<script>
export default {
  name: "Layout",

  async created() {
    console.log('created')
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get("token") || window.localStorage.getItem('Auth')
    window.localStorage.setItem("Auth", token);
    console.log(token)
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
.card {
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
}

/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

h3 {
  color: black;
}

.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 13rem; /* Set the width of the sidebar */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: white; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding: 1rem;
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



<template>
  <div class="index">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discover">今日音乐</router-link>
        </li>
        <li>
          <router-link to="/recommend">推荐音乐</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src="Url" controls autoplay loop></audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Url: "",
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-color: rgb(232, 214, 214);
}
.index {
  display: flex;
  height: 100%;
  background-color: rgba(224, 201, 201, 0.3);
}
.index .nav {
  width: 200px;
  background-color: rgba(224, 201, 201, 0.3);
}
.index .nav ul {
  padding: 0px;
}
.index .nav li {
  text-align: center;
  list-style: none;
  padding: 20px 0 20px 0;
  margin: 0px;
  font-size: 20px;
}
.index .main {
  flex: 1;
  background-color: rgba(233, 129, 202, 0.3);
}
a:hover,
a.router-link-exact-active {
  color: rgb(199, 137, 43);
}
a {
  text-decoration: none;
}
.player {
  position: fixed;
  bottom: 0;
  width: 580px;
}
</style>
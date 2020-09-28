<template>
  <div class="result">
    <h2 class="title">{{ $route.query.q }}</h2>

    <table width="100%" border="0">
      <tr v-for="(item, index) in songs" :key="index" @click="play(item.id)">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.artists[0].name }}</td>
        <td>
          {{ item.album.name }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      qid: "",
    };
  },
  created() {
    this.search();
  },
  watch: {
    $route() {
      this.qid = this.$route.query.q;
    },
    qid() {
      this.search();
    },
  },
  methods: {
    search() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
        },
      }).then((res) => {
        console.log(res);
        this.songs = res.data.result.songs;
      });
    },
    play(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: { id },
      }).then((res) => {
        let url = res.data.data[0].url;
        if (url == null) {
          this.$message({
            message: "未找到该歌曲，换一个吧！",
            type: "warning",
          });
        } else {
          console.log(res);
          this.$parent.Url = url;
        }
      });
    },
  },
};
</script>


<style>
.title {
  text-align: center;
}
.result tr {
  cursor: pointer;
}
.result tr td {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.result tr:hover {
  background-color: rgb(212, 128, 223);
  cursor: pointer;
}
</style>
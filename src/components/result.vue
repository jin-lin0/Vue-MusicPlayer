<template>
  <div class="result">
    <h2 class="title">
      {{ $route.query.q }}
      <div class="playall">
        <el-button type="warning" round @click="clickListPlay">
          <span v-if="this.$parent.listloopflag">正在循环</span>
          <span v-else>列表循环</span>
        </el-button>
      </div>
    </h2>

    <table width="100%" border="0">
      <tr
        v-for="(item, index) in songs"
        :key="index"
        @click="clickPlay(item.id, index)"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.artists[0].name }}</td>
        <td>
          {{ item.album.name }}
        </td>
        <td>
          {{ item.dt }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const API_PROXY = "https://bird.ioliu.cn/v1/?url=";
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      qid: "",
      listnumber: 0,
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
        url: API_PROXY + "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
        },
      }).then((res) => {
        console.log(res);
        this.songs = res.data.result.songs;
        for (let i = 0; i < this.songs.length; i++) {
          let min = parseInt(this.songs[i].duration / 1000 / 60);
          let sec = parseInt((this.songs[i].duration / 1000) % 60);
          if (min < 10) min = "0" + min;
          if (sec < 10) sec = "0" + sec;
          this.songs[i].dt = min + ":" + sec;
        }
      });
    },
    clickPlay(id, index) {
      this.listPlayMethod();
      this.play(id, index);
    },
    play(id, index) {
      this.listnumber = index;
      console.log(this.listnumber + 1);
      axios({
        url: API_PROXY + "https://autumnfish.cn/song/url",
        method: "get",
        params: { id },
      }).then((res) => {
        let url = res.data.data[0].url;
        if (url == null) {
          this.$message({
            message: "未找到该歌曲，换一个吧！",
            type: "warning",
          });
          if (this.$parent.listloopflag == true) {
            this.listnumber++;
            if (this.listnumber >= this.songs.length) this.listnumber = 0;
            this.play(this.songs[this.listnumber].id, this.listnumber);
          }
        } else {
          this.$parent.Url = url;
          console.log(res);
        }
      });
    },
    clickListPlay() {
      this.$parent.listloopflag = !this.$parent.listloopflag;
      this.listPlayMethod();
    },
    listPlayMethod() {
      this.$parent.$refs.audio.onended = () => {
        if (this.$parent.listloopflag) {
          console.log("正在列表循环");
          this.listnumber++;
          if (this.listnumber >= this.songs.length) this.listnumber = 0;
          this.play(this.songs[this.listnumber].id, this.listnumber);
        } else {
          console.log("停止循环");
        }
      };
    },
  },
};
</script>


<style>
.title {
  position: relative;
  text-align: center;
}
.title .playall {
  position: absolute;
  top: 50%;
  left: 4%;
}
.title .playall .el-button--warning {
  background-color: rgba(179, 97, 196, 0.2);
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
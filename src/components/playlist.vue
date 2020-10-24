<template>
  <div class="playlist">
    <div class="title">
      <div class="playall">
        <el-button type="warning" round @click="listPlay">
          <span v-if="this.$parent.listloopflag">正在循环</span>
          <span v-else>列表循环</span>
        </el-button>
      </div>
      <h2>
        {{ songs.name }}
      </h2>
      <p>
        {{ songs.description }}
      </p>
    </div>

    <table class="pltable" width="100%">
      <tr
        v-for="(item, index) in songs.tracks"
        :key="index"
        @click="play(item.id, index)"
      >
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.ar[0].name }}
        </td>
        <td>
          {{ item.al.name }}
        </td>
        <td>
          {{ item.duration }}
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
      songstrack: [],
      listnumber: 0,
      listflag: false,
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    searchList() {
      axios({
        url: API_PROXY + "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.qlist,
        },
      }).then((res) => {
        console.log("歌单列表");
        console.log(res);
        this.songs = res.data.playlist;
        this.songstrack = this.songs.tracks;
        for (let i = 0; i < this.songstrack.length; i++) {
          let min = parseInt(this.songstrack[i].dt / 1000 / 60);
          let sec = parseInt((this.songstrack[i].dt / 1000) % 60);
          if (min < 10) min = "0" + min;
          if (sec < 10) sec = "0" + sec;
          this.songstrack[i].duration = min + ":" + sec;
        }
      });
    },
    play(id, index) {
      this.listnumber = index;
      console.log(this.listnumber);
      axios({
        url: API_PROXY + "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.Url = url;
      });
    },
    listPlay() {
      this.$parent.listloopflag = !this.$parent.listloopflag;
      this.$parent.$refs.audio.onended = () => {
        if (this.$parent.listloopflag) {
          console.log("列表循环下一首");
          this.listnumber++;
          if (this.listnumber == this.songstrack.length) this.listnumber = 0;
          this.play(this.songstrack[this.listnumber].id, this.listnumber);
        } else {
          console.log("停止循环");
        }
      };
    },
  },
};
</script>

<style>
.playlist .title {
  text-align: center;
  position: relative;
}
.playlist .title .playall {
  position: absolute;
  top: 67%;
  left: 4%;
}
.playlist .title .playall .el-button--warning {
  background-color: rgba(179, 97, 196, 0.2);
}
.playlist .title p {
  color: rgba(36, 51, 51, 0.329);
}
.playlist .pltable tr:hover {
  background-color: rgb(212, 128, 223);
  cursor: pointer;
}
.playlist .pltable tr td {
  height: 50px;
}
</style>
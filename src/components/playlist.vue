<template>
  <div class="playlist">
    <div class="title">
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
        @click="play(item.id)"
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
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    searchList() {
      axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.qlist,
        },
      }).then((res) => {
        console.log("歌单列表");
        console.log(res);
        this.songs = res.data.playlist;
      });
    },
    play(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.Url = url;
      });
    },
  },
};
</script>

<style>
.playlist .title {
  text-align: center;
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
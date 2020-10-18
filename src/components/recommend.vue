<template>
  <div>
    <div class="head white">
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="topimg">
        <img :src="topList.coverImgUrl" />
      </div>
      <div class="description">
        <div class="title">
          {{ topList.name }}
        </div>
        {{ topList.description }}
      </div>
    </div>
    <div class="content">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="item-count white">
            播放量：{{ item.playCount }}
            <br />
            {{ item.name }}
          </div>

          <img :src="item.coverImgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      topList: {},
      list: {},
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/top/playlist",
      method: "get",
      params: {
        limit: 1,
      },
    }).then((res) => {
      this.topList = res.data.playlists[0];
    });
    axios({
      url: "https://autumnfish.cn/top/playlist",
      method: "get",
      params: {
        limit: 10,
      },
    }).then((res) => {
      console.log(res);
      this.list = res.data.playlists;
    });
  },
};
</script>

<style>
.white {
  color: white;
}
.head {
  background-color: rgba(141, 14, 163, 0.2);
  padding: 20px;
  height: 200px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.head .topimg {
  z-index: 1;
  margin: 5px;
}
.head .bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  filter: blur(20px);
  z-index: 0;
}
.head .description {
  color: beige;
  font-size: 14px;
  padding-top: 5px;
  margin: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: 1;
}

.head .topimg img {
  width: 160px;
  height: 160px;
}
.head .description .title {
  text-align: center;
  color: coral;
  font-weight: 600;
  font-size: 20px;
  height: 30px;
}
.content {
  padding-top: 20px;
}
.content .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.content .items .item {
  width: 200px;
  height: 200px;
  position: relative;
  cursor: pointer;
}
.content .items .item img {
  width: 180px;
  height: 180px;
  position: absolute;
  z-index: 1;
  border-radius: 10px;
}
.items .item .item-count {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.items .item:hover .item-count {
  z-index: 2;
}
</style>
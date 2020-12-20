<template>
  <div class="discover">
    <el-carousel :interval="4000" type="card" class="carousel">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
    <div class="item">
      <div v-for="(item, index) in list" :key="index" class="imgitem">
        <img :src="item.picUrl" @click="searchList(item.id)" />
        <p>
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const API_PROXY = "https://bird.ioliu.cn/v1/?url=";
import axios from "axios";
export default {
  data() {
    return {
      visHeight: "",
      banners: [],
      list: [],
    };
  },
  mounted() {
    this.initHeight();
    console.log(this.visHeight);
  },
  created() {
    //获取轮播图
    axios({
      url: API_PROXY + "https://autumnfish.cn/banner",
      method: "get",
      params: {},
    }).then((res) => {
      console.log("轮播图");
      console.log(res);
      this.banners = res.data.banners;
    }),
      axios({
        url: API_PROXY + "https://autumnfish.cn/personalized",
        method: "get",
        params: { limit: 10 },
      }).then((res) => {
        console.log("推荐歌单");
        console.log(res);
        this.list = res.data.result;
      });
  },
  methods: {
    searchList(id) {
      this.$router.push(`/playlist?qlist=${id}`);
    },
    initHeight() {
      this.visHeight = document.documentElement.clientHeight;
      window.onresize = () => {
        this.visHeight = document.documentElement.clientHeight;
      };
    },
  },
};
</script>

<style>
.discover {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.discover .carousel {
  width: 100%;
}
.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
}
.imgitem {
  box-sizing: border-box;
  width: 200px;
  height: 240px;
}
.imgitem img {
  height: 81%;
  cursor: pointer;
  border-radius: 20px;
}
.imgitem p {
  margin: 0;
  text-align: center;
}
</style>
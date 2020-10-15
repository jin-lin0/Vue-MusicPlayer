<template>
  <div class="discover">
    <el-carousel :interval="4000" type="card" class="carousel">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
    <div class="item">
      <div v-for="(item, index) in list" :key="index">
        <div class="imgitem">
          <img :src="item.picUrl" @click="searchList(item.id)" />
          <p>
            {{ item.name }}
          </p>
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
    axios({
      url: "https://autumnfish.cn/banner",
      method: "get",
      params: {},
    }).then((res) => {
      console.log("轮播图");
      console.log(res);
      this.banners = res.data.banners;
    }),
      axios({
        url: "https://autumnfish.cn/personalized",
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
  display: flex;
  flex-wrap: wrap;
}
.discover .carousel {
  width: 100%;
}
.item {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-content: flex-start;
}
.imgitem {
  width: 18%;
  height: 200px;
  float: left;
  margin: 0 1% 2% 1%;
}
.imgitem img {
  height: 100%;
  cursor: pointer;
}
.imgitem p {
  margin: 0;
  text-align: center;
}
</style>
<template>
  <div class="top">
    <el-input
      placeholder="搜索歌曲"
      @keyup.enter.native="search"
      v-model="inputValue"
      clearable
    >
    </el-input>

    <el-button type="primary" @click="search" icon="el-icon-search"
      >搜索</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    search() {
      if (this.inputValue != "") {
        this.$router.push(`/result?q=${this.inputValue}`);
      } else {
        this.$message({
          message: "不能输入空白哦！",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
.top {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
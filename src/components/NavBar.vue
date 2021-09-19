<template>
  <div>
    <el-container>
        <el-main>
            <el-menu class="el-menu-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" mode="horizontal">
                <el-menu-item><router-link to="/">Home</router-link></el-menu-item>
                <el-menu-item><router-link to="/about">About</router-link></el-menu-item>
            </el-menu>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
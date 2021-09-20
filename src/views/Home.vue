<template>
    <el-container>
        <el-main width="400px">
            <workout-list>
            </workout-list>
        </el-main>
    </el-container>
</template>

<script>
import WorkoutList from '../components/WorkoutList.vue';

export default {
  name: "Home",
  components: {
    WorkoutList
  }
};
</script>

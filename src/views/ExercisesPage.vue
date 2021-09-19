<template>
  <el-container>
    <el-main width="400px">
      <exercises-list />
    </el-main>
  </el-container>
</template>

<script>
import ExercisesList from '../components/ExercisesList.vue';

export default {
  name: "Exercises",
  components: {
    ExercisesList,
  }
};
</script>
<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Workout list</span>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="14">
                    <el-form>
                        <el-input v-model="newWorkout"></el-input>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <el-button @click="addItem" type="success" plain>Add</el-button>
                </el-col>
                <el-col :span="2" class="completed">
                    <el-checkbox v-model="checkAll">All</el-checkbox>
                </el-col>
                <el-col :span="4" class="completed">
                    <el-switch v-model="filter" :disabled="checkAll ? true : false" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-card class="box-card workout-list" v-if="allWorkoutList.length">
              <div v-if="filterList.length">
                <div v-for="(w, idx) in filterList" :key="w.id">
                  <el-row :gutter="20">
                    <el-col :span="2">
                      <div class="grid-content bg-purple">
                        <div>
                          <el-checkbox
                            :disabled="!isCompletedExercises(idx)"
                            v-model="w.completed"
                            @change="updateWorkoutList(idx)"
                            border
                          ></el-checkbox>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <router-link :to="{name:'Exercises', params:{id:idx}}" class="link">
                        <div class="grid-content title">
                          <span>{{w.title}}</span>
                        </div>
                      </router-link>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content bg-purple">
                        <el-button
                          @click="removeItem(w.id)"
                          type="danger"
                          icon="el-icon-delete"
                          size="small"
                          circle
                        ></el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-else class="info">
                  <el-result icon="info" :title="filter ? 'No completed' : 'All completed' "/>
                </div>
            </el-card>
            <div v-else class="info">
              <el-result icon="info" title="No workouts" subTitle="Please add workouts" />
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from "vuex";

export default {
    name: "WorkoutList",
    data: () => ({
        newWorkout: '',
        filter: false,
        checkAll: true,
    }),
    computed: {
        ...mapGetters(['allWorkoutList']),
        filterList() {
            if (this.checkAll) {
                return this.allWorkoutList
            } else if (this.filter) {
                return this.allWorkoutList.filter((w) => w.completed === true)
            } else {
                return this.allWorkoutList.filter((w) => w.completed === false)
            }
        }
    },
    methods: {
        ...mapMutations(['createWorkout', 'deleteWorkout', 'updateWorkout']),
        addItem: function () {
            if (this.newWorkout.trim()) {
                this.createWorkout({
                    id: Date.now(),
                    title: this.newWorkout,
                    completed: false,
                    exercises: [],
                })
                this.newWorkout = '';
            }
        },
        removeItem: function (id) {
            this.deleteWorkout(id);
        },
        updateWorkoutList: function(idx) {
            this.updateWorkout(idx);
        },
        isCompletedExercises(idx) {
            const completed = this.allWorkoutList[idx].exercises.filter((e) => e.completed === false)
            return completed.length ? false : true;
        }
    }
};
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-bottom: 10px;
    height: 2rem;
}

.box-card {
    margin: 2rem auto;
    width: 50rem;
}

.workout-list {
    width: 47rem;
}

.title {
    display: flex;
    align-content: flex-start;
    padding-top: 10px;
}

.completed {
    padding-top: 10px;
}

.link {
    text-decoration: none;
    color: gray;
}
</style>

<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Exercises list</span>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="14">
                    <el-form>
                        <el-input v-model="newExercises"></el-input>
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
            <el-card class="box-card workout-list" v-if="this.exercisesList(this.id).length">
              <div v-if="filterList.length">
                <div v-for="(e, idx) in filterList" :key="e.id">
                  <el-row :gutter="20">
                    <el-col :span="2">
                      <div class="grid-content bg-purple">
                        <div>
                          <el-checkbox
                            v-model="e.completed"
                            @change="updateExercisesList(idx)"
                            border
                          ></el-checkbox>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <router-link :to="{name:'Workout'}" class="link">
                        <div class="grid-content bg-purple title">
                          <span>{{e.title}}</span>
                        </div>
                      </router-link>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content bg-purple">
                        <el-button
                          @click="removeItem(e.id)"
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
              <el-result icon="info" title="No exercises" subTitle="Please add exercises" />
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
        newExercises: '',
        filter: false,
        checkAll: true,
        id: null,
    }),
    created() {
        this.id = this.$router.currentRoute.params["id"];
    },
    computed: {
        ...mapGetters(['exercisesList']),
        filterList() {
            if (this.checkAll) {
                return this.exercisesList(this.id);
            } else if (this.filter) {
                return this.exercisesList(this.id).filter((w) => w.completed === true)
            } else {
                return this.exercisesList(this.id).filter((w) => w.completed === false)
            }
        }
    },
    methods: {
        ...mapMutations(['createExercises', 'deleteExercises', 'updateExercises']),
        addItem: function () {
            if (this.newExercises.trim()) {
                this.createExercises({
                  id: this.id,
                  e: {
                    id: Date.now(),
                    title: this.newExercises,
                    completed: false,
                  }
                });
                this.newExercises = '';
            }
        },
        removeItem: function (id) {
            this.deleteExercises({id, idx: this.id});
        },
        updateExercisesList: function(idxEx) {
            this.updateExercises({idxEx, idx: this.id});
        },
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

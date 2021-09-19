import { workouts } from '../../const';

export default {
    state: {
        workoutList: workouts,
    },
    mutations: {
        createWorkout(state, workout) {
            state.workoutList.push(workout);
        },
        createExercises(state, workout) {
            state.workoutList[workout.id].exercises.push(workout.e);
        },
        deleteWorkout(state, id) {
            state.workoutList = state.workoutList.filter((w) => w.id !== id);
        },
        deleteExercises(state, data) {
            state.workoutList[data.idx].exercises = state.workoutList[data.idx].exercises.filter((e) => e.id !== data.id);
        },
        updateWorkout(state, idx) {
            state.workoutList[idx].completed = !state.workoutList[idx].completed;
        },
        updateExercises(state, data) {
            state.workoutList[data.idx].exercises[data.idxEx].completed = !state.workoutList[data.idx].exercises[data.idxEx].completed;
        },
    },
    actions: {},
    getters: {
        allWorkoutList(state) {
            return state.workoutList;
        },
        exercisesList: (state) => (idx) => {
            return state.workoutList[idx].exercises;
        }
    },
}

import Vue from "vue";
import { mount, shallowMount } from "@vue/test-utils";
import ExercisesList from "../../src/components/ExercisesList";

describe("ExercisesList.vue", () => {
  it("renders objects exercises", () => {
    const wrapper = mount(ExercisesList);
    expect(wrapper.text()).toContain('Exercises');
  });
});

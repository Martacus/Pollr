<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template v-slot:lead>
        {{currentQuestion.question}}
      </template>

      <hr class="my-4">

      <b-list-group class="list">
        <b-list-group-item
          v-for="(answer, index) in answers" 
          :key="index"
          @click="selectAnswer(index)"
          :class="[selectedIndex === index ? 'selected' : '']">

          {{answer}}
          
        </b-list-group-item>
      </b-list-group>

      <b-button variant="primary" href="#">Submit</b-button>
      <b-button @click="next" variant="success" href="#">Next</b-button>
  </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestion: Object,
    next: Function
  },
  data(){
    return {
      selectedIndex: null
    }
  },
  computed: {
    answers(){
        let answers = [...this.currentQuestion.incorrect_answers];
        answers.push(this.currentQuestion.correct_answer);
        return answers;
    }
  },
  methods: {
    selectAnswer(index){
      console.log(index);
      this.selectedIndex = index;
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
    }
  },
  watch: {
    currentQuestion(){
      this.selectedIndex = null;
      this.shuffleAnswers();
    }
  }
}
</script>

<style>
  
</style>
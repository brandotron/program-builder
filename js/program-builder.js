var testProgram = {
  id: 0,
  name: '',
  athlete: '',
  startingDate: '',
  blocks: [
    {
      id: 0,
      name: '',
      weeks: [
        {
          id: 0,
          days: [
            {
              id: 0,
              dayNumber: 0,
              exercises: [
                // {
                //     id: 0
                //     name: '',
                //     sets: 0,
                //     reps: 0,
                //     percentage: 0,
                //     weight: 0,
                //     note: ''
                // }
                {
                  id: 0,
                  name: 'snatch',
                  sets: 3,
                  reps: 3,
                  weight: '75%',
                  note: ''
                },
                {
                  id: 1,
                  name: 'clean + jerk',
                  sets: 2,
                  reps: '1 + 2',
                  weight: '75%',
                  note: ''
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
Vue.component('loaded-program', {
  props: ['program'],
  template: 
    '<div class="loaded-program">' +
      '<program-block ' +
        'v-for="item in program.blocks"' + 
        'v-bind:block="item"' +
      '></program-block>' +
    '</div>'
});
Vue.component('program-block', {
  props: ['block'],
  template: 
    '<div class="program-block">' +
      '<program-week ' +
        'v-for="item in block.weeks"' + 
        'v-bind:week="item"' +
      '></program-week>' +
    '</div>'
});
Vue.component('program-week', {
  props: ['week'],
  template: 
    '<div class="program-week">' +
      '<program-day ' +
        'v-for="item in week.days"' +
        'v-bind:day="item"' +
      '></program-day>' +
    '</div>'
});
Vue.component('program-day', {
  props: ['day'],
  template: 
    '<div class="program-day">' + 
      '<table class="day-table">' +
        '<thead class="day-head">' +
          '<tr class="day-column-head-row">' +
            '<th class="day-column-head">Exercise</th>' +
            '<th class="day-column-head">Sets</th>' +
            '<th class="day-column-head">Reps</th>' +
            '<th class="day-column-head">Weight</th>' +
            '<th class="day-column-head">Note</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody class="day-body">' +
          '<program-exercise-row ' +
            'v-for="item in day.exercises"' +
            'v-bind:exercise="item"' +
          '></program-exercise-row>' +
        '</tbody>' +
      '</table>' + 
      '<button v-on:click="openAddExercisePanel">Add Exercise</button>' +
    '</div>',
  methods: {
    openAddExercisePanel: function () {
      programBuilder.newExercise.day = this.day.id;
      programBuilder.newExercise.week = this.$parent.week.id;
      programBuilder.newExercise.block = this.$parent.$parent.block.id;
      programBuilder.newExercise.id = this.day.exercises.length;
      programBuilder.newExercise.active = true;
    }
  }
});
Vue.component('program-exercise-row', {
  props: ['exercise'],
  template: 
    '<tr class="day-exercise-row">' +
      '<td class="day-exercise-cell">{{ exercise.name }}</td>' +
      '<td class="day-exercise-cell">{{ exercise.sets }}</td>' +
      '<td class="day-exercise-cell">{{ exercise.reps }}</td>' +
      '<td class="day-exercise-cell">{{ exercise.weight }}</td>' +
      '<td class="day-exercise-cell">{{ exercise.note }}</td>' +
    '</tr>'
});                
var programBuilder = new Vue({
  el: '#program-builder',
  data: {
    programLoaded: true,
    //loading test program for now, will work on capability to deal with multiple programs later
    loadedProgram: testProgram, //{},
    allPrograms: {},
    newExercise: {
      active: false,
      block: '',
      week: '',
      day: '',
      id: 0,
      name: '',
      sets: '',
      reps: '',
      weight: '',
      note: ''
    }
  },
  methods: { //rename these functions for new scope (may have more than 1 "panel" to close, etc.)
    addExerciseToDay: function () {
      var exerciseToPush = {
        id: this.newExercise.id,
        name: this.newExercise.name,
        sets: this.newExercise.sets,
        reps: this.newExercise.reps,
        weight: this.newExercise.weight,
        note: this.newExercise.note
      }
      var currentBlock = programBuilder.loadedProgram.blocks[this.newExercise.block];
      var currentWeek = currentBlock.weeks[this.newExercise.week];
      var currentDay = currentWeek.days[this.newExercise.day];

      currentDay.exercises.push(exerciseToPush);
      this.resetInputs();
    },
    closePanel: function () {
      this.newExercise.active = false;
      this.resetInputs();
    },
    resetInputs: function () {
      //this.active = this.active;
      this.newExercise.block = '';
      this.newExercise.week = '';
      this.newExercise.day = '';
      this.newExercise.name = '';
      this.newExercise.sets = '';
      this.newExercise.reps = '';
      this.newExercise.weight = '';
      this.newExercise.note = '';
    }
  }
});
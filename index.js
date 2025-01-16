const app = Vue.createApp({});

app.component('list', {

  created() {
    this.getStored();
  },

  data() {
    return {
      listItems: null,
      plusIconUrl: 'assets/plus-solid.svg'
    }
  },

  template: `
  <div class='firstRow'>
  <h1>My To-do List</h1>
  </div>

  <ul v-if = 'listItems'>
      <div v-for='listItem in listItems' :class = "{checked: listItem.checked}" class = "renderedList">
        <div class = 'left'>
          <input :checked = "listItem.checked" type = 'checkbox' value = listItem.task @click = checkItem(listItem)>
          <li>{{listItem.task}}</li>
        </div>
        <div class=removeIcon @click = "removeItem(listItem)"></div>
      </div>
  </ul>

  <div v-else>
  <img src = 'assets/good-job.png' alt='illustration of charachter doing thumbs up'>
  <h3>No tasks left!</h3>
  <p>You've finished all your tasks. Time to chillax, or add new tasks below. </p>
  </div>


  <div class='finalRow'>
    <addNew @add-item="receiveEmit"></addNew>
  </div>

  `,

  methods: {
    removeItem(listItem) {

      for (let i = 0; i < this.listItems.length; i++) {
        if (this.listItems[i] === listItem) {
          this.listItems.splice(i, 1)
        }
      };

      if (this.listItems.length < 1) {
        this.listItems = null
      }

      this.setStorage();

    },

    checkItem(listItem) {
      if (listItem.checked === true) {
        listItem.checked = false
      } else {
        listItem.checked = true
      };

      this.setStorage();
    },

    receiveEmit(newTask) {
      console.log('emit recieved' + newTask);
      if (this.listItems === null && newTask !== null) {
        this.listItems = [{
          task: newTask,
          checked: false
        }]
      } else if (newTask !== null) {
        this.listItems.push({
          task: newTask,
          checked: false
        });
      }

      this.setStorage();
    },

    getStored() {
      let fromStorage = JSON.parse(localStorage.getItem('stored'));
      console.log(fromStorage);
      if (fromStorage && fromStorage.length < 1) {
        this.listItems = null
      } else {
        this.listItems = fromStorage
      }
    },

    setStorage() {
      let stored = JSON.stringify(this.listItems);
      localStorage.setItem('stored', stored);
    }
  }
});


app.component('addNew', {
  data() {
    return {
      newTask: null,
    }
  },

  emits: ['add-item'],

  template: `

  <input id = 'inputField' @keyup.enter = 'onClick' type="text" v-model = 'newTask'></input>
  <button @click='onClick'>Add</button>
`,

  methods: {
    onClick() {
      this.$emit('add-item', this.newTask);
      this.newTask = null
    }
  }
})

app.mount('#app');

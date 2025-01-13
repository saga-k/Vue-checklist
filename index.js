const app = Vue.createApp({});

app.component('list', {

  created() {
    this.getStored();
  },

  data() {
    return {
      listItems: [

      ]
    }
  },

  template: `
  <ul>
      <div v-for='listItem in listItems' :class = "{checked: listItem.checked}" class = "renderedList">
        <input :checked = "listItem.checked" type = 'checkbox' value = listItem.task @click = checkItem(listItem)>
        <li>{{listItem.task}}</li>
        <div class=removeIcon @click = "removeItem(listItem)"></div>
      </div>
    <addNew @add-item="receiveEmit"></addNew>
  </ul>
  `,

  methods: {
    removeItem(listItem) {

      for (let i = 0; i < this.listItems.length; i++) {
        if (this.listItems[i] === listItem) {
          this.listItems.splice(i, 1)
        }
      };

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
      this.listItems.push({
        task: newTask,
        checked: false
      });
      this.setStorage();
    },

    getStored() {
      let fromStorage = JSON.parse(localStorage.getItem('stored'));
      console.log(fromStorage);
      this.listItems = fromStorage
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
      newTask: '',
    }
  },

  emits: ['add-item'],

  template: `
  <input type="text" v-model = 'newTask'></input>
  <button @click='onClick'>add</button>
`,

  methods: {
    onClick() {
      this.$emit('add-item', this.newTask);
      this.newTask = ''
    }
  }
})

app.mount('#app');
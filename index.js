const app = Vue.createApp({});

app.component('list', {
  data() {
    return {
      listItems: [
        {
          task: 'Initiate Github repo',
          checked: true
        },
        {
          task: 'Setup Vue',
          checked: false
        },
        {
          task: 'Create list component',
          checked: false
        }]
    }
  },

  template: `
<ul>
<div v-for='listItem in listItems' :class = "{checked: listItem.checked}" class = "renderedList">
  <input :checked = "listItem.checked" type = 'checkbox' value = listItem.task @click = checkItem(listItem)>
  <li>{{listItem.task}}</li>
  <div class=removeIcon @click = "removeItem(listItem)"></div>
</div>
</ul>
`,

  methods: {
    removeItem(listItem) {

      for (let i = 0; i < this.listItems.length; i++) {
        if (this.listItems[i] === listItem) {
          this.listItems.splice(i, 1)
        }
      }

    },

    checkItem(listItem) {
      if (listItem.checked === true) {
        listItem.checked = false
      } else {
        listItem.checked = true
      }
    }
  }
})


app.mount('#app');
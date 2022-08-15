<template>
  <ul>
    <li v-for="(todo, i) in todos" :key="todo.id">
      <input :checked="todo.done" type="checkbox" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ i }} {{ todo.text }}</span>
      <button @click="removeTodo(i)">
        remove
      </button>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    },
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle',
    }),
    removeTodo (i) {
      this.$store.commit('todos/remove', i)
    },
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>

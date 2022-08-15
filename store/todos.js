export const state = () => ({
  list: [],
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  remove (state, i) {
    state.list = state.list.filter((_, j) => i !== j)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  },
}

import { defineStore } from "pinia"

export const useEventsFiltersStore = defineStore('eventsFiltersStore', () => {
  const selected = reactive({
    location: '',
    category: ''
  })

  return { selected }
})



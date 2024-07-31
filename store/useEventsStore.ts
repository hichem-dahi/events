import { defineStore } from "pinia"
import type { Event } from "~/models/event"

export const useEventsStore = defineStore('eventsStore', () => {
  const events = ref<Event[]>([])

  return { events }
})



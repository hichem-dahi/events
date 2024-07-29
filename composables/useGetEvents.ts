import type { Event } from "~/models/event"

export interface FetchedEvents {
  'events': Event[]
}

export function useGetEvents() {
  const state = useAsyncData<FetchedEvents>('events', () => $fetch('/events.json'), { immediate: true, pick: ['events'] })

  const data = computed(() => state.data.value?.events)
  const error = computed(() => state.error.value)
  
  return { data, error, execute: state.execute }
}
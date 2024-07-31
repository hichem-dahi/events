import type { Event } from "~/models/event"

export interface FetchedEvents {
  'events': Event[]
}

export function useGetEvents() {
  const state = useAsyncData<FetchedEvents>('events', () => $fetch('/events.json'), { immediate: true, pick: ['events'] })

  const data = computed(() => state.data.value?.events)
  const isSuccess = computed(() => state.status.value === 'success')
  const isError = computed(() => state.status.value === 'error')
  const errorMessage = computed(() => state.error.value?.message)
  
  return { data, isSuccess, isError, errorMessage, execute: state.execute }
}
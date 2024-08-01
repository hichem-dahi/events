import type { mount } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import EventList from '../index/eventList.vue'
import eventsJson from '@/public/events.json'
import { createTestingPinia } from '@pinia/testing'
import { useEventsStore } from '~/store/useEventsStore'

type MountSuspendedReturnType<T> = ReturnType<typeof mount<T>> & { setupState: Record<string, string> }

const mockEvents = eventsJson.events.slice(0, 3)

// Mock the composable
vi.mock('~/composables/useGetEvents', () => ({
  useGetEvents: () => ({
    data: ref(mockEvents),
    isSuccess: ref(false),
    isError: ref(false),
    errorMessage: ref(''),
    execute: () => {},
  }),
}))

// Mock data
describe('EventList.vue', () => {
  let wrapper: MountSuspendedReturnType<typeof EventList>
  
  beforeEach(async () => {
    wrapper = await mountSuspended(EventList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              eventsFiltersStore: {
                selected: {
                  location: '',
                  category: ''
                }
              },
              eventsStore: {
                events: []
              }
            },
            createSpy: vi.fn,
          }),
        ],
      },
    })

    const eventsStore = useEventsStore()
    eventsStore.events = mockEvents
  })

  it('renders filter components', () => {
    expect(wrapper.findAllComponents({ name: 'eventsFilter' })).toHaveLength(2)
  })

  it('renders event items', async () => {
    // Ensure all mock events are rendered
    expect(wrapper.findAllComponents({ name: 'eventItem' })).toHaveLength(3)
  })

  it('filters events based on location and category', async () => {
    await wrapper.findAllComponents({ name: 'eventsFilter' }).at(0)?.vm.$emit('update:modelValue', 'Großer Saal')
    await wrapper.findAllComponents({ name: 'eventsFilter' }).at(1)?.vm.$emit('update:modelValue', 'Klassik')

    const filteredEvents = wrapper.findAllComponents({ name: 'eventItem' })
    expect(filteredEvents).toHaveLength(1) // Only one event matches both filters
  })

  it('handles empty filter results', async () => {
    await wrapper.findAllComponents({ name: 'eventsFilter' }).at(0)?.vm.$emit('update:modelValue', 'Non-existent Location')
    await wrapper.findAllComponents({ name: 'eventsFilter' }).at(1)?.vm.$emit('update:modelValue', 'Non-existent Category')

    const filteredEvents = wrapper.findAllComponents({ name: 'eventItem' })
    expect(filteredEvents).toHaveLength(0) // No events should match
  })
})

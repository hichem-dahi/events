import type { mount } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, beforeEach } from 'vitest'

import EventsFilter from '@/components/eventsFilter.vue' // Adjust the path accordingly

type MountSuspendedReturnType<T> = ReturnType<typeof mount<T>> & { setupState: Record<string, string> }

describe('EventsFilter.vue', () => {
  let wrapper: MountSuspendedReturnType<typeof EventsFilter>

  const props = {
    title: 'Category',
    items: ['Music', 'Sports', 'Theater'],
  }

  beforeEach(async () => {
    wrapper = await mountSuspended(EventsFilter, {
      props,
    })
  })

  it('renders the title correctly', () => {
    expect(wrapper.find('.select div').text()).toBe(props.title)
  })

  it('opens and closes the menu on hover', async () => {
    const eventsFilter = wrapper.find('.events-filter')

    await eventsFilter.trigger('mouseover')
    expect(wrapper.find('.menu').exists()).toBe(true)
    await eventsFilter.trigger('mouseleave')
    expect(wrapper.find('.menu').exists()).toBe(false)
  })

  it('selects an item and adds active class', async () => {
    const eventsFilter = wrapper.find('.events-filter')
    await eventsFilter.trigger('mouseover')
    const firstItem = wrapper.findAll('.item').at(0)

    expect(firstItem?.exists()).toBeTruthy()

    await firstItem!.trigger('click')
    expect(firstItem!.classes()).toContain('active')
    expect(wrapper.vm.selected.value).toBe('Music')
  })

  it('deselects an item when clicked again', async () => {
    const eventsFilter = wrapper.find('.events-filter')
    await eventsFilter.trigger('mouseover')
    const firstItem = wrapper.findAll('.item').at(0)

    expect(firstItem?.exists()).toBeTruthy()

    await firstItem?.trigger('click')
    expect(firstItem?.classes()).toContain('active')
    expect(wrapper.vm.selected.value).toBe('Music')

    await firstItem?.trigger('click')
    expect(firstItem?.classes()).not.toContain('active')
    expect(wrapper.vm.selected.value).toBe('')
  })
})

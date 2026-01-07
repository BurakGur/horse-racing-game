import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseLaneItem from '@/components/Item/HorseLaneItem.component.vue'
import type { Horse } from '@/types'

const createMockHorse = (id = 1): Horse => ({
  id,
  name: `Horse ${id}`,
  condition: 75,
  colorHex: '#FF0000',
  colorName: 'Red',
})

describe('HorseLaneItem.component', () => {
  const defaultProps = {
    horse: createMockHorse(),
    laneNumber: 1,
    isRacing: false,
    isPaused: false,
    duration: 5000,
  }

  const createWrapper = (props = {}) => {
    return mount(HorseLaneItem, {
      props: { ...defaultProps, ...props },
      global: {
        stubs: {
          IconHorse: {
            template: '<div class="icon-horse-stub" />',
            props: ['size', 'color'],
          },
        },
      },
    })
  }

  describe('Rendering', () => {
    it('should render the component', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.horse-lane-item').exists()).toBe(true)
    })

    it('should display the lane number', () => {
      const wrapper = createWrapper({ laneNumber: 5 })
      expect(wrapper.find('.horse-lane-item__info').text()).toBe('5')
    })

    it('should render the track element', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.horse-lane-item__track').exists()).toBe(true)
    })

    it('should render the finish line', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.horse-lane-item__finish-line').exists()).toBe(true)
    })

    it('should render the horse runner', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.horse-lane-item__horse-runner').exists()).toBe(true)
    })

    it('should render the horse icon', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.horse-lane-item__horse-icon').exists()).toBe(true)
    })
  })

  describe('Props', () => {
    it('should display correct lane number for different values', () => {
      const wrapper1 = createWrapper({ laneNumber: 1 })
      expect(wrapper1.find('.horse-lane-item__info').text()).toBe('1')

      const wrapper10 = createWrapper({ laneNumber: 10 })
      expect(wrapper10.find('.horse-lane-item__info').text()).toBe('10')
    })

    it('should apply animation duration from props', () => {
      const wrapper = createWrapper({ duration: 8000 })
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      expect(runner.attributes('style')).toContain('animation-duration: 8000ms')
    })

    it('should apply different durations correctly', () => {
      const wrapper3000 = createWrapper({ duration: 3000 })
      const wrapper12000 = createWrapper({ duration: 12000 })

      expect(wrapper3000.find('.horse-lane-item__horse-runner').attributes('style')).toContain('3000ms')
      expect(wrapper12000.find('.horse-lane-item__horse-runner').attributes('style')).toContain('12000ms')
    })
  })

  describe('Racing State Classes', () => {
    it('should not have running class when not racing', () => {
      const wrapper = createWrapper({ isRacing: false })
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      expect(runner.classes()).not.toContain('horse-lane-item__horse-runner--running')
    })

    it('should have running class when racing', () => {
      const wrapper = createWrapper({ isRacing: true })
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      expect(runner.classes()).toContain('horse-lane-item__horse-runner--running')
    })

    it('should not have paused class when not paused', () => {
      const wrapper = createWrapper({ isPaused: false })
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      expect(runner.classes()).not.toContain('horse-lane-item__horse-runner--paused')
    })

    it('should have paused class when paused', () => {
      const wrapper = createWrapper({ isPaused: true })
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      expect(runner.classes()).toContain('horse-lane-item__horse-runner--paused')
    })
  })

  describe('Events', () => {
    it('should emit finished event with horse on animationend', async () => {
      const horse = createMockHorse(5)
      const wrapper = createWrapper({ horse })

      await wrapper.find('.horse-lane-item__horse-runner').trigger('animationend')

      expect(wrapper.emitted('finished')).toBeTruthy()
      expect(wrapper.emitted('finished')).toHaveLength(1)
      expect(wrapper.emitted('finished')![0]).toEqual([horse])
    })

    it('should emit correct horse object on finish', async () => {
      const horse = {
        id: 10,
        name: 'Thunder Bolt',
        condition: 95,
        colorHex: '#00FF00',
        colorName: 'Green',
      }
      const wrapper = createWrapper({ horse })

      await wrapper.find('.horse-lane-item__horse-runner').trigger('animationend')

      const emitted = wrapper.emitted('finished')
      expect(emitted).toBeTruthy()
      const emittedHorse = emitted![0]![0] as Horse
      expect(emittedHorse.id).toBe(10)
      expect(emittedHorse.name).toBe('Thunder Bolt')
      expect(emittedHorse.condition).toBe(95)
    })

    it('should emit finished event multiple times if triggered multiple times', async () => {
      const wrapper = createWrapper()
      const runner = wrapper.find('.horse-lane-item__horse-runner')

      await runner.trigger('animationend')
      await runner.trigger('animationend')

      expect(wrapper.emitted('finished')).toHaveLength(2)
    })
  })

  describe('IconHorse', () => {
    it('should pass horse color to IconHorse', () => {
      const horse = createMockHorse()
      horse.colorHex = '#0000FF'

      const wrapper = mount(HorseLaneItem, {
        props: { ...defaultProps, horse },
        global: {
          stubs: {
            IconHorse: {
              template: '<div class="icon-horse-stub" :color="color" />',
              props: ['size', 'color'],
            },
          },
        },
      })

      const icon = wrapper.find('.icon-horse-stub')
      expect(icon.attributes('color')).toBe('#0000FF')
    })

    it('should pass horse size to IconHorse', () => {
      const wrapper = mount(HorseLaneItem, {
        props: defaultProps,
        global: {
          stubs: {
            IconHorse: {
              template: '<div class="icon-horse-stub" :size="size" />',
              props: ['size', 'color'],
            },
          },
        },
      })

      const icon = wrapper.find('.icon-horse-stub')
      expect(icon.attributes('size')).toBe('40')
    })
  })
})

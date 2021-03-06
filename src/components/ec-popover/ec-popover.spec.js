import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import EcPopover from './ec-popover.vue';

describe('EcPopover component', () => {
  it('should pass default options when no additional props are given', () => {
    const wrapper = shallowMount(EcPopover);
    const attributes = wrapper.find('v-popover-stub').attributes();
    expect(attributes.popoverclass).toBe('ec-popover');
    expect(attributes.popoverinnerclass).toBe('ec-popover__inner');
    expect(attributes.popoverarrowclass).toBe('ec-popover__arrow');
  });

  it('should merge default options with given additional options', () => {
    const wrapper = shallowMount(EcPopover, {
      propsData: {
        popoverClass: 'my-popover',
        popoverInnerClass: 'my-inner-popover',
        popoverArrowClass: 'my-arrow',
      },
    });
    const attributes = wrapper.find('v-popover-stub').attributes();
    expect(attributes.popoverclass).toBe('my-popover ec-popover');
    expect(attributes.popoverinnerclass).toBe('my-inner-popover ec-popover__inner');
    expect(attributes.popoverarrowclass).toBe('my-arrow ec-popover__arrow');
  });

  it('should update options when additional options are also updated', async () => {
    const wrapper = shallowMount(EcPopover, { propsData: { placement: 'left' } });
    expect(wrapper.find('v-popover-stub').attributes('placement')).toBe('left');

    await wrapper.setProps({ placement: 'bottom' });
    expect(wrapper.find('v-popover-stub').attributes('placement')).toBe('bottom');
  });

  it('should pass all events to the 3rd party tooltip component', () => {
    const showStub = jest.fn();
    const VPopoverStub = Vue.extend({
      mounted() {
        this.$emit('show');
      },
      template: '<div/>',
    });

    mount(EcPopover, { listeners: { show: showStub }, stubs: { 'v-popover': VPopoverStub } });
    expect(showStub).toHaveBeenCalledTimes(1);
  });

  it('should add the z-index level class if the level was given', () => {
    const wrapper = shallowMount(EcPopover, {
      propsData: {
        level: 'level-30',
      },
    });
    const attributes = wrapper.find('v-popover-stub').attributes();
    expect(attributes.popoverclass).toBe('ec-popover ec-popover--level-30');
  });
});

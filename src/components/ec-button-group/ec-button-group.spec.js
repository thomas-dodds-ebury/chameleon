import { mount, createLocalVue } from '@vue/test-utils';
import EcButtonGroup from './ec-button-group.vue';
import { withMockedConsole } from '../../../tests/utils/console';

function mountButtonGroup(props, mountOpts) {
  return mount(EcButtonGroup, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountButtonGroupAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcButtonGroup },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcButtonGroup', () => {
  describe(':props', () => {
    it(':items - should render the button group with two items all on outline', () => {
      const wrapper = mountButtonGroup({
        items: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':items - should render the button group with two items with one disabled', () => {
      const wrapper = mountButtonGroup({
        items: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no', disabled: true },
        ],
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':items - should throw an error when one or more items doesn\'t have text property', () => {
      withMockedConsole((errorSpy) => {
        mountButtonGroup({
          items: [
            { text: 'Yes', value: 'yes' },
            { value: 'maybe' },
          ],
        });
        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "items"');
      });
    });

    it(':items - should throw an error when one or more items doesn\'t have value property', () => {
      withMockedConsole((errorSpy) => {
        mountButtonGroup({
          items: [
            { text: 'Yes', value: 'yes' },
            { text: 'Maybe' },
          ],
        });
        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "items"');
      });
    });
  });

  describe('v-model', () => {
    it('should render the button group and change the value when you click on the current not selected', async () => {
      const wrapper = mountButtonGroupAsTemplate(
        '<ec-button-group v-model="value" :items="items"></ec-button-group>',
        {},
        {
          data() {
            return {
              value: 'yes',
              items: [
                { text: 'Yes', value: 'yes' },
                { text: 'No', value: 'no' },
              ],
            };
          },
        },
      );
      expect(wrapper.vm.value).toBe('yes');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeFalsy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeTruthy();
      await wrapper.findByDataTest('ec-button-group__btn-1').trigger('click');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeTruthy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeFalsy();
      expect(wrapper.vm.value).toBe('no');
    });

    it('should render the button group without any selected and change the value when you click on the current not selected', async () => {
      const wrapper = mountButtonGroupAsTemplate(
        '<ec-button-group v-model="value" :items="items"></ec-button-group>',
        {},
        {
          data() {
            return {
              value: '',
              items: [
                { text: 'Yes', value: 'yes' },
                { text: 'No', value: 'no' },
              ],
            };
          },
        },
      );

      expect(wrapper.vm.value).toBe('');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeTruthy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeTruthy();
      await wrapper.findByDataTest('ec-button-group__btn-1').trigger('click');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeTruthy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeFalsy();
      expect(wrapper.vm.value).toBe('no');
    });

    it('should render the button group and not change when click on the disabled item', async () => {
      const wrapper = mountButtonGroupAsTemplate(
        '<ec-button-group v-model="value" :items="items"></ec-button-group>',
        {},
        {
          data() {
            return {
              value: 'yes',
              items: [
                { text: 'Yes', value: 'yes' },
                { text: 'No', value: 'no', disabled: true },
              ],
            };
          },
        },
      );
      expect(wrapper.vm.value).toBe('yes');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeFalsy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeTruthy();
      await wrapper.findByDataTest('ec-button-group__btn-1').trigger('click');
      expect(wrapper.findByDataTest('ec-button-group__btn-0').classes('ec-btn--outline')).toBeFalsy();
      expect(wrapper.findByDataTest('ec-button-group__btn-1').classes('ec-btn--outline')).toBeTruthy();
      expect(wrapper.vm.value).toBe('yes');
    });
  });
});

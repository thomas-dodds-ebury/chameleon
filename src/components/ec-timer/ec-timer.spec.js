import { mount } from '@vue/test-utils';
import fakeTimers from '@sinonjs/fake-timers';
import EcTimer from './ec-timer.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcTimer', () => {
  function mountTimer(props, mountOpts) {
    return mount(EcTimer, {
      propsData: {
        ...props,
      },
      ...mountOpts,
    });
  }

  describe(':props', () => {
    it('should throw an error if "seconds" prop is not given', () => {
      withMockedConsole((errorSpy) => {
        mountTimer({ isRunning: true });

        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "seconds"');
      });
    });

    it('should throw an error if "seconds" prop is not an integer', () => {
      withMockedConsole((errorSpy) => {
        mountTimer({ seconds: 20.1, isRunning: true });

        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
      });
    });

    it('should throw an error if "seconds" prop is negative', () => {
      withMockedConsole((errorSpy) => {
        mountTimer({ seconds: -20, isRunning: true });

        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
      });
    });

    it('should throw an error if "isRunning" prop is not given', () => {
      withMockedConsole((errorSpy) => {
        mountTimer({ seconds: 20 });

        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "isRunning"');
      });
    });

    it('should clear the interval if we set "isRunning" to false', async () => {
      const clearTimeoutSpy = jest.spyOn(window, 'clearInterval');
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);

      await wrapper.setProps({ isRunning: false });
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should render as expected', () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slots', () => {
    it('should render with the slot given', () => {
      const wrapper = mountTimer(
        {
          seconds: 20,
          isRunning: true,
        },
        {
          slots: {
            default: 'c',
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    let clock;

    beforeEach(() => {
      clock = fakeTimers.install(window);
    });

    afterEach(() => {
      if (clock) {
        clock.uninstall();
      }
    });

    it('should emit an event called "time-expired" after the countdown completes', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(20000);

      expect(wrapper.emitted('time-expired').length).toBe(1);
      await wrapper.vm.$nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not emit an event if we stop the timer before time expires', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(10000);
      await wrapper.setProps({ isRunning: false });
      clock.tick(10000);

      expect(wrapper.emitted('time-expired')).toBeFalsy();
    });
  });

  it('should clear the interval before we destroy the components', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearInterval');
    const wrapper = mountTimer({ seconds: 20, isRunning: true });

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    wrapper.destroy();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});

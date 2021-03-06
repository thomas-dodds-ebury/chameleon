/* eslint no-underscore-dangle: "off" */
import { format, setCursor, event } from './utils';
import defaultOptions from './options';

function getNumberOfSeparators(value, endIndex, separator) {
  const matches = value.substr(0, endIndex).match(new RegExp(`\\${separator}`, 'g'));
  return matches ? matches.length : 0;
}

function updateOptions(el, binding) {
  const options = (binding && binding.value) ? binding.value : {};

  const opts = {
    ...defaultOptions,
    ...options,
  };

  el.__amountOptions = opts;
}

function getOptions(el) {
  return /* istanbul ignore next */ el.__amountOptions || {};
}

export default {
  update(el, binding, vnode) {
    updateOptions(vnode.elm, binding);
  },

  bind(el, binding, vnode) {
    /* eslint no-param-reassign: "off" */
    // v-ec-amount used on a component that's not a input
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      const els = el.getElementsByTagName('input');
      [el] = els;
    }
    if (el === undefined) {
      throw new TypeError('v-ec-amount requires 1 input');
    }

    updateOptions(vnode.elm, binding);

    el.__inputHandler = function inputHandler() {
      if (el.__preventHandlingNextInputEvent) {
        el.__preventHandlingNextInputEvent = false;
        return;
      }

      const options = getOptions(vnode.elm);

      let positionFromStart = el.selectionStart;
      const numberOfSeparatorsBefore = getNumberOfSeparators(el.value, positionFromStart, options.groupingSeparator);
      const prevValue = el.__previousFormattedValue;
      const newValue = format(el.value, options);

      if (prevValue !== newValue) {
        const numberOfSeparatorsAfter = getNumberOfSeparators(newValue, positionFromStart, options.groupingSeparator);
        positionFromStart += numberOfSeparatorsAfter - numberOfSeparatorsBefore;
      } else {
        positionFromStart = el.__previousCursorPosition;
      }

      el.value = newValue;
      el.__previousFormattedValue = newValue;

      setCursor(el, positionFromStart);

      // because we changed the el.value in the middle of the input event, we have to re-trigger it
      // using the event('input') so the event.target.value will be the new value.
      // the problem is that this directive listens for the input event too, so it will
      // run an infinite loop. To prevent that, let's signal we want to skip next input event
      // by setting __preventHandlingNextInputEvent to true.
      el.__preventHandlingNextInputEvent = true;
      el.dispatchEvent(event('input'));
    };

    el.addEventListener('input', el.__inputHandler);

    el.__keydownHandler = function keydownHandler() {
      el.__previousCursorPosition = el.selectionStart;
    };
    el.addEventListener('keydown', el.__keydownHandler);
  },

  unbind(el) {
    el.removeEventListener('input', el.__inputHandler);
    el.removeEventListener('keydown', el.__keydownHandler);

    delete el.__inputHandler;
    delete el.__keydownHandler;
    delete el.__previousCursorPosition;
    delete el.__previousFormattedValue;
    delete el.__amountOptions;
    delete el.__preventHandlingNextInputEvent;
  },
};

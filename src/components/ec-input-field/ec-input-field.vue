<template>
  <div
    class="ec-input-field"
    data-test="ec-input-field"
  >
    <label
      v-if="label || note"
      class="ec-input-field__label"
      data-test="ec-input-field__label"
      :for="inputId"
    >
      <span
        v-if="label"
        class="ec-input-field__label-text"
        data-test="ec-input-field__label-text"
      >{{ label }}<ec-icon
        v-if="labelTooltip"
        v-ec-tooltip="{ content: labelTooltip }"
        class="ec-input-field__tooltip"
        data-test="ec-input-field__tooltip"
        type="interactive"
        name="simple-info"
        :size="14"
      />
      </span>
      <span
        v-if="note"
        class="ec-input-field__note"
        data-test="ec-input-field__note"
      >{{ note }}</span>
    </label>
    <input
      :id="inputId"
      ref="input"
      v-model="inputModel"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-input-field__input` : 'ec-input-field__input'"
      :class="inputClasses"
      v-bind="$attrs"
      :type="type"
      :aria-describedby="errorMessageId"
      v-on="$listeners"
    >
    <div
      v-if="isIconWrapperVisible"
      class="ec-input-field__icon-wrapper"
      :class="{ 'ec-input-field__icon-wrapper--is-disabled': isDisabled }"
      data-test="ec-input-field__icon-wrapper"
    >
      <ec-loading-icon
        v-if="isLoading"
        class="ec-input-field__icon"
        :size="24"
      />
      <ec-icon
        v-else
        class="ec-input-field__icon"
        data-test="ec-input-field__icon"
        :name="icon"
        :size="iconSize"
      />
    </div>
    <div
      :id="errorMessageId"
      v-if="isInvalid && !isInGroup"
      class="ec-input-field__error-text"
      data-test="ec-input-field__error-text"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
import EcLoadingIcon from '../ec-loading-icon';
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';
import config from '../../config';

export default {
  name: 'EcInputField',
  components: { EcIcon, EcLoadingIcon },
  directives: { EcTooltip },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'date', 'number'].includes(value);
      },
    },
    value: {
      type: [Number, String, Date],
    },
    label: {
      default: '',
      type: String,
    },
    labelTooltip: {
      default: '',
      type: String,
    },
    note: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: 20,
    },
    isInGroup: {
      type: String,
    },
    id: {
      type: String,
    },
    errorId: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputClasses() {
      const classes = ['ec-input-field__input'];

      if (this.isInGroup) {
        classes.push(`ec-input-field__input--is-in-group-${this.isInGroup}`);
      }
      if (this.isLoading) {
        classes.push('ec-input-field__input--is-loading');
      }
      if (this.isInvalid) {
        classes.push('ec-input-field__input--has-error');
      }
      if (this.icon) {
        classes.push('ec-input-field__input--has-icon');
      }
      if (this.isSensitive) {
        classes.push(config.sensitiveClass);
      }

      return classes;
    },
    inputId() {
      return this.id || `ec-input-field-${this._uid}`;
    },
    errorMessageId() {
      return this.isInvalid ? (this.errorId || `ec-input-field-error-${this._uid}`) : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    isDisabled() {
      return !!this.$attrs.disabled;
    },
    inputModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('value-change', value);
      },
    },
    isIconWrapperVisible() {
      return this.isLoading || this.icon;
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style>
:root {
  --ec-input-field-height: 42px;
  --ec-input-field-icon-area-size: var(--ec-input-field-height);
}

.ec-input-field {
  @apply tw-w-full;
  @apply tw-relative;

  &__input {
    @apply tw-body-text tw-text-gray-3;
    @apply tw-rounded;
    @apply tw-py-8 tw-px-12;
    @apply tw-border tw-border-solid tw-border-gray-6;
    @apply tw-max-w-full;

    width: inherit;

    &--has-error {
      @apply tw-border tw-border-solid tw-border-error;

      &:hover,
      &:focus {
        @apply tw-border tw-border-solid tw-border-error;
      }
    }

    &--is-in-group-left {
      @apply tw-rounded-l-none;
    }

    &--is-in-group-right {
      @apply tw-rounded-r-none;
    }

    &--is-loading {
      @apply tw-text-gray-5;
    }

    &--has-icon {
      padding-right: var(--ec-input-field-icon-area-size);
    }

    &:focus {
      @apply tw-border tw-border-solid tw-border-key-4;
      @apply tw-outline-none;
    }

    &:disabled {
      @apply tw-bg-gray-7;
    }

    &:read-only,
    &[readonly] {
      /* :read-only is not supported by IE https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only */
      @apply tw-truncate;
    }
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__label-text {
    @apply tw-flex tw-flex-grow;
    @apply tw-input-label;
    @apply tw-mr-8;
  }

  &__note {
    @apply tw-caption-text;
  }

  &__error-text {
    @apply tw-flags-text tw-text-error;
  }

  &__icon-wrapper {
    @apply tw-absolute tw-right-0;
    @apply tw-inline-block;
    @apply tw-text-gray-3 tw-fill-current tw-text-center;

    height: var(--ec-input-field-icon-area-size);
    width: var(--ec-input-field-icon-area-size);
    line-height: var(--ec-input-field-icon-area-size);

    &--is-disabled {
      @apply tw-text-gray-6;
    }
  }

  &__icon {
    @apply tw-inline-block tw-align-middle;
  }
}
</style>

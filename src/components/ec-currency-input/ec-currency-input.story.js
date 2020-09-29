import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcCurrencyInput from './ec-currency-input.vue';

const currencies = ['GBP', 'EUR', 'USD', 'CAD', 'JPY', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'AED', 'BBD', 'BGN', 'BHD', 'BSD', 'BWP', 'BZD', 'CNY', 'CZK', 'DKK', 'GHS', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JMD', 'KES', 'LKR', 'MUR', 'MXN', 'NGN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SGD', 'SZL', 'THB', 'TND', 'TRY', 'TTD', 'UGX', 'XCD', 'ZAR', 'ZMW'];

const stories = storiesOf('Currency Input', module);

stories
  .add('basic', () => ({
    components: { EcCurrencyInput },
    data() {
      return {
        value: {},
        currencies,
      };
    },
    props: {
      label: {
        default: text('label', 'Currency input'),
      },
      note: {
        default: text('note', 'Select currency and set amount'),
      },
      locale: {
        default: select('locale', ['en', 'es', 'de-ch', 'jp', 'sv'], 'en'),
      },
      currenciesAreLoading: {
        default: boolean('currencies are loading', false),
      },
      isAmountDisabled: {
        default: boolean('amount disabled', false),
      },
      isCurrenciesDisabled: {
        default: boolean('currencies disabled', false),
      },
      isSensitive: {
        default: boolean('Is Sensitive', false),
      },
      errorMessage: {
        default: text('error message', ''),
      },
      searchPlaceholder: {
        default: text('search placeholder', 'Search...'),
      },
    },
    methods: {
      onChange: action('change'),
    },
    template: `
      <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
        <ec-currency-input v-model="value" :currencies="currencies" :search-placeholder="searchPlaceholder" v-bind="$props" @change="onChange" :is-sensitive="isSensitive" class="tw-mt-20 tw-mb-20" />
        Value Object: {{ value }}
      </div>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import EcCurrencyInput from './ec-currency-input.vue';

const currencies = ['GBP', 'EUR', 'USD', 'CAD', 'JPY', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'AED', 'BBD', 'BGN', 'BHD', 'BSD', 'BWP', 'BZD', 'CNY', 'CZK', 'DKK', 'GHS', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JMD', 'KES', 'LKR', 'MUR', 'MXN', 'NGN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SGD', 'SZL', 'THB', 'TND', 'TRY', 'TTD', 'UGX', 'XCD', 'ZAR', 'ZMW'];

const stories = storiesOf('Currency Input', module);

stories
  .add('basic', () => ({
    components: { EcCurrencyInput },
    data() {
      return {
        value: {},
        currencies: currencies.map(currency => ({ text: currency })),
      };
    },
    props: {
      label: {
        default: text('label', 'Text input'),
      },
      note: {
        default: text('note', 'Max 80 chars'),
      },
      locale: {
        default: select('Locale', ['en', 'es', 'de-ch', 'jp'], 'en'),
      },
      errorMessage: {
        default: text('error message', ''),
      },
    },
    template: `
      <div style="max-width: 600px; margin: 60px auto">
        <ec-currency-input v-model="value" :currencies="currencies" v-bind="$props" class="ec-mt--20 ec-mb--20" />
      </div>
    `,
  }));

export default stories;

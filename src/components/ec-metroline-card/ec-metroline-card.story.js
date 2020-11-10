import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import EcMetrolineCard from './ec-metroline-card.vue';
import EcIcon from '../ec-icon';
import EcInputField from '../ec-input-field';

storiesOf('Metroline Card', module)
  .add('basic', () => ({
    components: {
      EcMetrolineCard,
      EcIcon,
      EcInputField,
    },
    props: {
      isCollapsed: {
        default: boolean('isCollapsed', false),
      },
      hasNarrowPadding: {
        default: boolean('hasNarrowPadding', false),
      },
    },
    template: `
    <div class="tw-m-24 tw-max-w-screen-md">
      <ec-metroline-card
        class="tw-mb-24"
        :is-collapsed="isCollapsed"
        :has-narrow-padding="hasNarrowPadding"
      >
        <template>
          <div class="tw-mb-16">In order to confirm the payment details, we have sent a code via SMS to your number ending in ***1234. Please verify the payment details are correct and once you are happy please enter the code you have received.</div>
          <ec-input-field type="text" placeholder="Enter your code here"/>
          <div class="tw-mt-16">Didn't receive a code?</div>
        </template>
      </ec-metroline-card>

      <ec-metroline-card
        :is-collapsed="true"
        :has-narrow-padding="true"
      >
        <template>
          <div class="tw-text-gray-5 tw-mb-8">PI123123</div>
          <div class="tw-flex">
            <div class="tw-flex-auto">
              <div class="tw-inline-block tw-align-top tw-mr-4">
                <ec-icon
                  name="simple-person"
                  :size="16"
                  class="tw-fill-gray-5"
                />
              </div>
              <div class="tw-inline-block">
                <div class="tw-caption-text">Beneficiary</div>
                <div class="tw-small-text">Beneficiary name</div>
              </div>
            </div>
            <div class="tw-flex-auto">
              <div class="tw-inline-block tw-align-top tw-mr-4">
                <ec-icon
                  name="simple-collect"
                  :size="16"
                  class="tw-fill-gray-5"
                />
              </div>
              <div class="tw-inline-block">
                <div class="tw-caption-text">Amount</div>
                <div class="tw-small-text">USD 2,400.00</div>
              </div>
            </div>
            <div class="tw-flex-auto">
              <div class="tw-inline-block tw-align-top tw-mr-4">
                <ec-icon
                  name="simple-batch-payment"
                  :size="16"
                  class="tw-fill-gray-5"
                />
              </div>
              <div class="tw-inline-block">
                <div class="tw-caption-text">Fee</div>
                <div class="tw-small-text">GBP 5.00</div>
              </div>
            </div>
          </div>
        </template>
      </ec-metroline-card>
    </div>
  `,
  }));

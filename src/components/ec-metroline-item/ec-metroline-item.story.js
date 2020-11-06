import EcMetrolineItem from './ec-metroline-item.vue';
import EcIcon from '../ec-icon/ec-icon.vue';
import EcBtn from '../ec-btn/ec-btn.vue';
import * as MetrolineItemStatus from '../../enums/metroline-item-status';

export default {
  title: 'Metroline Item',
  component: EcMetrolineItem,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: [
          MetrolineItemStatus.NEXT,
          MetrolineItemStatus.ACTIVE,
          MetrolineItemStatus.COMPLETED,
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcMetrolineItem,
    EcIcon,
    EcBtn,
  },
  template: `
    <div class="tw-m-24 tw-flex tw-justify-center tw-max-w-screen-md">
      <ec-metroline-item
        :index="index"
        :is-last="isLast"
        :status="status">
        <template #heading>
          <span class="tw-mr-16">
            Payee(s) information
          </span>
        </template>

        <template #sub-heading>
          <span class="tw-flex tw-items-center tw-mr-16">
            <ec-icon name="simple-check" class="tw-fill-current tw-mr-8" :size="16" />
            Amount fully allocated
          </span>
        </template>

        <template #header-cta>
          <a href="#" class="tw-flex tw-items-center">
            <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
            Edit
          </a>
        </template>

        <template #main>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni! Odit, provident voluptatem. Distinctio repudiandae ratione accusantium et quam corrupti in doloremque non quos sed necessitatibus, deleniti optio atque adipisci laboriosam odit accusamus, consectetur quis magni quaerat! Iusto aut quam consequuntur debitis rerum impedit architecto a totam optio! Porro eveniet laborum vel labore.</p>
        </template>

        <template #footer-cta>
          <ec-btn
            category="primary"
            is-rounded> Accept and complete </ec-btn>
        </template>
      </ec-metroline-item>
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  index: '1',
  isLast: false,
  status: MetrolineItemStatus.ACTIVE,
};
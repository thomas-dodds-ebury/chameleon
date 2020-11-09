import EcMetroline from './ec-metroline.vue';
import EcMetrolineItem from '../ec-metroline-item';
import EcIcon from '../ec-icon/ec-icon.vue';
import EcBtn from '../ec-btn/ec-btn.vue';

export default {
  title: 'Metroline',
  component: EcMetroline,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcMetroline,
    EcMetrolineItem,
    EcIcon,
    EcBtn,
  },
  template: `
  <div class="tw-m-24 tw-flex tw-justify-center tw-max-w-screen-md">
    <ec-metroline>
        <ec-metroline-item
          :id="1"
        >
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

          <template #header-cta="{ goTo }">
            <a href="#" class="tw-flex tw-items-center" @click.prevent.stop="goTo">
              <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
              Edit
            </a>
          </template>

          <template #main="{ status }">
            <p>{{ status }}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni! Odit, provident voluptatem. Distinctio repudiandae ratione accusantium et quam corrupti in doloremque non quos sed necessitatibus, deleniti optio atque adipisci laboriosam odit accusamus, consectetur quis magni quaerat! Iusto aut quam consequuntur debitis rerum impedit architecto a totam optio! Porro eveniet laborum vel labore.</p>
          </template>

          <template #footer-cta="{ goToNext }">
            <ec-btn
              category="primary"
              @click="goToNext"
              is-rounded> Continue 1</ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="2"
        >
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

          <template #header-cta="{ goTo }">
            <a href="#" class="tw-flex tw-items-center" @click.prevent.stop="goTo">
              <ec-icon name="simple-edit" class="tw-fill-current tw-mr-8" :size="24" />
              Edit
            </a>
          </template>

          <template #main>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at cumque repudiandae atque quod voluptatum, aperiam dignissimos, vitae, neque mollitia repellat! Recusandae veritatis tenetur fugiat nisi illo. Quae officiis soluta mollitia quisquam laborum minus repudiandae suscipit magni! Odit, provident voluptatem. Distinctio repudiandae ratione accusantium et quam corrupti in doloremque non quos sed necessitatibus, deleniti optio atque adipisci laboriosam odit accusamus, consectetur quis magni quaerat! Iusto aut quam consequuntur debitis rerum impedit architecto a totam optio! Porro eveniet laborum vel labore.</p>
          </template>

          <template #footer-cta="{ goToNext }">
            <ec-btn
              category="primary"
              @click="goToNext"
              is-rounded> Accept and complete </ec-btn>
          </template>
        </ec-metroline-item>

        <ec-metroline-item
          :id="3"
        >
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

          <template #footer-cta="{ goToNext }">
            <ec-btn
              category="primary"
              @click="goToNext"
              is-rounded> Accept and complete </ec-btn>
          </template>
        </ec-metroline-item>
    </ec-metroline>
  </div>
  `,
});

export const basic = Template.bind({});
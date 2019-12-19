import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import EcPanel from './ec-panel.vue';


storiesOf('Panel', module)
  .add('basic', () => ({
    components: { EcPanel },
    props: {
      showPanelFromProps: {
        default: boolean('Show Panel', true),
      },
      withOverflowingContent: {
        default: boolean('With overflowing content', true),
      },
    },
    watch: {
      showPanelFromProps: {
        immediate: true,
        handler(newValue) {
          this.showPanel = newValue;
        },
      },
    },
    data() {
      return {
        showPanel: true,
      };
    },
    methods: {
      onClose() {
        this.showPanel = false;
      },
    },
    template: `
      <div style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0;">
        <div v-for="i in 5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore</div>

        <ec-panel v-model="showPanel" @close="onClose()">
          <template #header>
            <h2 style="margin-bottom: 24px;">Submit New Request</h2>
          </template>
          <template #main>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>

            <div v-if="withOverflowingContent">
              <p v-for="i in 10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>
            </div>
          </template>
        </ec-panel>
      </div>
    `,
  }));

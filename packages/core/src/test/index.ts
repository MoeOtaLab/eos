import { start, ModelTemplate, State } from '..';

const other1 = new ModelTemplate({
  name: 'other1',
  setup(input, context) {
    return {};
  },
});

const other2 = new ModelTemplate({
  name: 'other2',
  setup(input, context) {
    const { mount } = context;
    mount(other1);
    return {};
  },
});

const sub = new ModelTemplate({
  name: 'sub',
  setup(input, context) {
    const { mount, onLifecycle } = context;

    mount(other1);
    mount(other2);

    mount(other2, undefined, { mountType: 'group' });

    onLifecycle('preMount', () => {
      console.log('preMount -> sub -> input', input);
    });

    return {};
  },
});

const app = new ModelTemplate({
  name: 'app',
  setup(input, context) {
    const { mount } = context;
    const theme = new State<'dark' | 'light'>('dark');

    const subIns = mount(sub, { theme });

    return {
      theme,
      subIns,
    };
  },
});

async function main() {
  const appInstance = start(app);

  console.log(appInstance);

  setTimeout(() => {
    appInstance.unmount();
  });
}

main();

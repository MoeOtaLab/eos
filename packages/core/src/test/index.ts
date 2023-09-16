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
    const { mountBlock } = context;
    mountBlock(other1);
    return {};
  },
});

const sub = new ModelTemplate({
  name: 'sub',
  setup(input, context) {
    const { mountBlock, mountGroup, onLifecycle } = context;

    mountBlock(other1);
    mountBlock(other2);

    mountGroup(other2);

    onLifecycle('preMount', () => {
      console.log('preMount -> sub -> input', input);
    });

    return {};
  },
});

const app = new ModelTemplate({
  name: 'app',
  setup(input, context) {
    const { mountBlock } = context;
    const theme = new State<'dark' | 'light'>('dark');

    const subIns = mountBlock(sub, { theme });

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

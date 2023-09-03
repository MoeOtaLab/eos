import { ModelBlockTemplate, start } from './ModelBlock/ModelBlock';
import { ModelStateAtom, Atom } from './ModelAtom';

const other2 = new ModelBlockTemplate({
  name: '1-1-2',
  setup(input, context) {
    return {};
  },
});

const other = new ModelBlockTemplate({
  name: '1-1-1',
  setup(input, context) {
    return {};
  },
});

const innerTemplate = new ModelBlockTemplate<{ defaultNum: Atom<Number> }>({
  name: '1-1',
  setup(input, context) {
    const { onLifecycle, mount } = context;
    mount(other, {});
    mount(other2, {});

    onLifecycle('beforeMount', () => {
      console.log('inner ===> beforeMount', input.defaultNum.current);
    });

    onLifecycle('mount', () => {
      console.log('inner ===> mount', input.defaultNum.current);
    });
    return {};
  },
});

const innerTemplate2 = new ModelBlockTemplate<{ defaultNum: Atom<Number> }>({
  name: '1-2',
  setup(input, context) {
    const { onLifecycle, mount } = context;
    return {};
  },
});

const outerTemplate = new ModelBlockTemplate({
  name: '1',
  setup(input: { name: Atom<string> }, context) {
    const { onLifecycle } = context;
    const { mount } = context;
    const count = new ModelStateAtom(0);

    onLifecycle('beforeMount', () => {
      count.current += 1;
      console.log('outer ===> beforeMount add 1', count.current);
    });

    onLifecycle('mount', () => {
      count.current += 1;
      console.log('outer ===> mount1 add 1', count.current);
    });

    const inner = mount(innerTemplate, { defaultNum: count });
    setTimeout(() => {
      const inner2 = mount(innerTemplate, { defaultNum: count });
    });

    onLifecycle('mount', () => {
      console.log('outer ===> mount2');
    });

    return {
      count,
      inner,
    };
  },
});

async function main() {
  const outer = await start(outerTemplate, {
    name: new ModelStateAtom('ahahah'),
  });

  outer.unmount();
}

main();

import { start, ModelTemplate, ModelState, ModelEvent } from '..';

const other1 = new ModelTemplate({
  name: 'other1',
  setup (input, context) {
    const { onLifecycle } = context;
    const count = new ModelState(0);
    const event = new ModelEvent();

    onLifecycle('postInit', () => {
      const subscription = count.subscribe((val, extraInfo) => {
        event.next(val, extraInfo);
      });

      return subscription;
    });

    return {
      count,
      event,
    };
  },
});

const other2 = new ModelTemplate({
  name: 'other2',
  setup (input, context) {
    const { mount } = context;
    mount(other1);
    mount(other1, undefined, { mountType: 'group' });
    return {};
  },
});

const sub = new ModelTemplate({
  name: 'sub',
  setup (input, context) {
    const { mount, onLifecycle } = context;

    const other1Ins = mount(other1);
    mount(other2);

    mount(other2, undefined, { mountType: 'group' });

    onLifecycle('preMount', () => {
      console.log('preMount -> sub -> input', input);
    });

    return {
      other1Ins,
    };
  },
});

const app = new ModelTemplate({
  name: 'app',
  setup (input, context) {
    const { mount } = context;
    const theme = new ModelState<'dark' | 'light'>('dark');

    const subIns = mount(sub, { theme });

    return {
      theme,
      subIns,
    };
  },
});

function main() {
  const appInstance = start(app);

  console.log(appInstance);

  const count = appInstance.output?.subIns.output?.other1Ins.output?.count;

  const event = appInstance.output?.subIns.output?.other1Ins.output?.event;

  event?.subscribe((value, extra) => {
    console.log('count change..', value, extra);
  });

  count?.update(1, { traceId: '233' });
  setTimeout(() => {
    count?.update(2, { traceId: '234' });
  });
  setTimeout(() => {
    count?.update(v => v + 1, { traceId: '235' });
  }, 2000);
}

main();

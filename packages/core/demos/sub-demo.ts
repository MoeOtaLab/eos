import { ModelState, ModelEvent, type ModelBlockContextType } from '../src';
import { ExtraInfo } from '../src/ModelState/ExtraInfo';

function other1(input: any, context: ModelBlockContextType) {
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
    event
  };
}

function other2(input: any, context: ModelBlockContextType) {
  const { mount } = context;
  mount(other1);
  const other1Instance = other1({}, context);
  return { other1Instance };
}

function sub(input: any, context: ModelBlockContextType) {
  const { mount, onLifecycle } = context;

  const other1Ins = mount(other1);
  mount(other2);

  const other2Ins = other2({}, context);

  onLifecycle('preMount', () => {
    console.log('preMount -> sub -> input', input);
  });

  return {
    other1Ins,
    other2Ins
  };
}

function Test(_input: any, context: ModelBlockContextType) {
  const { onLifecycle } = context;
  const state1 = new ModelState(0);
  const state2 = new ModelState(1);

  onLifecycle('mount', () => {
    state1.update((c) => c + 2, new ExtraInfo());
    state2.update((c) => c * 5, new ExtraInfo());
  });

  return {
    state1,
    state2
  };
}

export function SubDemoApp(input: any, context: ModelBlockContextType) {
  const { mount } = context;
  const theme = new ModelState<'dark' | 'light'>('dark');

  const subIns = mount(sub, { theme });

  mount(Test, {});

  return {
    theme,
    subIns
  };
}

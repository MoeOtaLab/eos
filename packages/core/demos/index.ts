import { start, ModelState, ModelEvent, type ModelBlockContextType, tracker, type TrackRecord } from '../src';
import { Computed } from '../src/operators';
import { ExtraInfo } from '../src/ModelState/ExtraInfo';
import { SimpleDemoApp } from './simple-demo';
import { TodoListDemoApp } from './todo-list-demo';

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
    event,
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
    other2Ins,
  };
}

function Test(_input: any, context: ModelBlockContextType) {
  const { onLifecycle } = context;
  const state1 = new ModelState(0);
  const state2 = new ModelState(1);
  const computedState = Computed({
    inputs: [
      state1,
      state2,
    ],
    defaultValue: 0,
    computedFn(...inputs) {
      console.log('a => ', inputs);
      return inputs.reduce((acc, cur) => acc + cur, 0);
    },
  }, context);

  onLifecycle('mount', () => {
    computedState.subscribe((state, extra) => {
      console.log('computed: ', state, extra);
    });

    state1.update(c => c + 2, new ExtraInfo());
    state2.update(c => c * 5, new ExtraInfo());
  });

  return {
    state1,
    state2,
    computedState,
  };
}

export function App(input: any, context: ModelBlockContextType) {
  const { mount } = context;
  const theme = new ModelState<'dark' | 'light'>('dark');

  const subIns = mount(sub, { theme });

  mount(Test, {});

  return {
    theme,
    subIns,
  };
}

function main() {
  const logs: TrackRecord[] = [];
  tracker.onTrack(record => {
    logs.push(record);
  });

  const appInstance = start(SimpleDemoApp);

  console.log(appInstance.output?.result.current);
  appInstance.output?.event.next(2, new ExtraInfo('manual add 2'));
  console.log('result', appInstance.output?.result.current);

  start(TodoListDemoApp);

  setTimeout(() => {
    console.log('====== RECORD ======');
    console.log(JSON.stringify(logs, undefined, 2));
    console.log('====== RECORD END ======');
  }, 10000);

  // const { state, onUpdate } = modelStateSelector(() => appInstance.output?.subIns.output?.other1Ins.output?.count);

  // console.log(appInstance);

  // const count = appInstance.output?.subIns.output?.other1Ins.output?.count;

  // const event = appInstance.output?.subIns.output?.other1Ins.output?.event;

  // event?.subscribe((value, extra) => {
  //   console.log('count change..', value, extra);
  // });

  // count?.update(1, { traceId: '233' });
  // setTimeout(() => {
  //   count?.update(2, { traceId: '234' });
  // });
  // setTimeout(() => {
  //   count?.update(v => v + 1, { traceId: '235' });
  // }, 2000);
}

main();

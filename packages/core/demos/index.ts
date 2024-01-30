import { start, tracker, type TrackRecord } from '../src';
import { Action } from '../src/ModelState';
import { SimpleDemoApp } from './simple-demo';
import { TodoListDemoApp } from './todo-list-demo';

function main() {
  const logs: TrackRecord[] = [];
  tracker.onTrack((record) => {
    logs.push(record);
  });

  const appInstance = start(SimpleDemoApp);

  console.log(appInstance.output?.result.current);
  appInstance.output?.event.next(new Action({ payload: 2, path: 'manual add 2' }));
  console.log('result', appInstance.output?.result.current);

  start(TodoListDemoApp);

  setTimeout(() => {
    console.log('====== RECORD ======');
    // TODO: MState record
    // console.log(JSON.stringify(logs, undefined, 2));
    console.log(logs);
    console.log('====== RECORD END ======');
  }, 10000);
}

main();

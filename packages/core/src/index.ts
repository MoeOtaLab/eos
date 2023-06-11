import { ModelBlock } from './ModelBlock';

const result = new ModelBlock(
  'root',
  () => {
    console.log('root-init');
    return {
      postInitFn() {
        console.log('root-postInitFN');
      },
    };
  },
  [
    new ModelBlock(
      'child-1',
      () => {
        return {};
      },
      []
    ),
    new ModelBlock(
      'child-2',
      () => {
        return {};
      },
      [
        new ModelBlock(
          'child-2-1',
          () => {
            return {};
          },
          []
        ),
      ]
    ),
  ]
);

result.start();

setTimeout(() => {
  result.unmount();
}, 5000);

import { ModelBlock } from './ModelBlock/ModelBlock';

const result = new ModelBlock(
  {
    name: 'root',
    setup() {
      console.log('root setup');
      return {};
    },
  },
  [
    new ModelBlock(
      {
        name: 'child-1',
        setup() {
          console.log('child-1 setup');
        },
      },
      []
    ),
    new ModelBlock(
      {
        name: 'child-2',
        setup() {
          console.log('child-2 setup');
          return {};
        },
      },
      [
        new ModelBlock(
          {
            name: 'child-2-1',
            setup() {
              console.log('child-2-1 setup');
              return {};
            },
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

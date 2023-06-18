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
            setup(_, modelMap) {
              console.log('child-2-1 setup');
              setTimeout(() => {
                modelMap.add(
                  new ModelBlock(
                    {
                      name: 'child-2-1-1(auto)',
                      setup() {
                        console.log('child-2-1-1(auto) setup');
                      },
                    },
                    []
                  )
                );
              }, 1000);
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

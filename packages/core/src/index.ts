import { ModelBlock } from './ModelBlock/ModelBlock';
import {
  ModelActionAtom,
  ModelDisposeAtom,
  ModelStateAtom,
  ModelContainerAtom,
  ModelEventAtom,
  ModelLifecycleAction,
} from './ModelAtom';

const result = new ModelBlock(
  {
    name: 'root',
    setup(_, modelMap) {
      console.log('root setup');

      const childModel = modelMap.get('child-1');

      const count = new ModelStateAtom(0);
      const updateCount = new ModelActionAtom(() => (count.value += 1));

      const timer = setInterval(() => {
        updateCount.value();
      }, 5000);

      const disposeTimer = new ModelDisposeAtom(() => {
        clearInterval(timer);
      });

      const container = new ModelContainerAtom(childModel?.data);

      const event = new ModelEventAtom(undefined);
      const initcycle = new ModelLifecycleAction(() => {
        // ...
      });

      return {
        count,
        updateCount,
        disposeTimer,
        container,
        event,
        initcycle,
      };
    },
  },
  [
    new ModelBlock(
      {
        name: 'child-1',
        setup() {
          console.log('child-1 setup');
          const count2 = new ModelStateAtom(0);
          return {
            count2,
            name: 'child-1',
          };
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

async function main() {
  await result.start();
  console.log(result);
}

main();

setTimeout(() => {
  result.unmount();
}, 5000);

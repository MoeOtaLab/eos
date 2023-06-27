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
        console.log('after update -> ', count.value);
      }, 1000);

      const disposeTimer = new ModelDisposeAtom(() => {
        clearInterval(timer);
      });

      const event = new ModelEventAtom(undefined);
      const initcycle = new ModelLifecycleAction('preUnmount', () => {
        console.log('~lalalalala~', 'preUnmount');
      });

      return {
        count,
        updateCount,
        disposeTimer,
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
          const initcycle = new ModelLifecycleAction('preUnmount', () => {
            console.log('~lalalalala~', 'child-1 -> preUnmount');
          });

          const containerAtom = new ModelContainerAtom(() => {
            const initcycle = new ModelLifecycleAction('preUnmount', () => {
              console.log('~lalalalala~', 'child-1 -> preUnmount in container');
            });
            const containerIncontainerAtom = new ModelContainerAtom(() => {
              const initcycle = new ModelLifecycleAction('preUnmount', () => {
                console.log(
                  '~lalalalala~',
                  'child-1 -> preUnmount in container in container'
                );
              });
              return { initcycle };
            });
            return { initcycle, containerIncontainerAtom };
          });

          return {
            initcycle,
            containerAtom,
            count2,
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
                        return {};
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
}, 10000);

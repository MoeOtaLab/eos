import { ModelBlock } from './ModelBlock/ModelBlock';
import {
  ModelActionAtom,
  ModelDisposeAtom,
  ModelStateAtom,
  ModelContainerAtom,
  ModelEventAtom,
  ModelLifecycleAction,
  ModelComputedStateAtom,
} from './ModelAtom';
import { ModelState } from './ModelState';

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

const result2 = new ModelBlock(
  {
    name: 'root',
    setup(_input, modelMap) {
      const child2 = modelMap.get('child-2');

      // ..default value.

      const consoleCount = new ModelLifecycleAction('postMount', () => {
        console.log('consoleCount', child2?.data.state.current);
      });

      const countWithUnit = new ModelComputedStateAtom(
        () => child2?.data.state,
        (value) => `${value} Kg`
      );

      const x = new ModelLifecycleAction('postMount', () => {
        countWithUnit.value.subscribe((value) => {
          console.log('change=>', value);
        });
      });

      const plusOne = new ModelActionAtom(() => {
        child2?.data.state.update((c: string) => (c += 1));
        console.log('consoleCount', child2?.data.state.current);
      });

      const parentValue = new ModelStateAtom(new ModelState(100));

      child2?.setupInput({
        parentValue,
      });

      setTimeout(() => {
        parentValue.value.update((v) => v + 2);
      }, 6000);

      return {
        child2: child2?.data,
        consoleCount,
        plusOne,
        countWithUnit,
        x,
        parentValue,
      };
    },
  },
  [
    new ModelBlock(
      {
        name: 'child-2',
        setup(
          input: { parentValue: ModelStateAtom<ModelState<number>> },
          modelMap
        ) {
          const { parentValue } = input;
          const child2 = modelMap.get('child-2-1');
          const state = new ModelStateAtom(new ModelState(0));

          const parentComputedValue = new ModelComputedStateAtom(
            () => parentValue.value,
            (value) => value
          );

          const childComputedValue = new ModelComputedStateAtom(
            () => child2?.data.childValue,
            (value) => value
          );

          const x = new ModelLifecycleAction('postMount', () => {
            console.log(23333);
            parentComputedValue.value.subscribe((value) => {
              console.log('parentComputedValue=>', value);
            });

            childComputedValue.value.subscribe((value) => {
              console.log('childComputedValue=>', value);
            });
          });

          return {
            parentComputedValue,
            childComputedValue,
            state,
            x,
          };
        },
      },
      [
        new ModelBlock(
          {
            name: 'child-2-1',
            setup(input, modelChildrenMap) {
              const childValue = new ModelStateAtom(new ModelState(200));

              setTimeout(() => {
                console.log(6666);
                childValue.value.update((v) => v + 1);
              }, 5000);

              return {
                childValue,
              };
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

  const state = new ModelState(1);
  state.subscribe((nextValue) => {
    console.log('count: update', nextValue);
  });

  state.update((count) => (count += 1));
  console.log(result);

  setTimeout(() => {
    result.stop();
  }, 10000);
}

async function main2() {
  await result2.start();
  result2.data.plusOne();
  result2.data.plusOne();

  setTimeout(() => {
    result2.stop();
  }, 10000);
}

// main();

main2();

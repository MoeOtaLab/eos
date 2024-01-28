import { type ModelBlockContextType, type SetupFn, start } from '../src';

let preLifecycleStack: Array<{ name: string; lifecycle: string }> = [];
let postLifecycleStack: Array<{ name: string; lifecycle: string }> = [];

beforeEach(() => {
  preLifecycleStack = [];
  postLifecycleStack = [];
});

const lifecycleList = [
  'postInit',
  'preMount',
  'postMount',
  'beforeMount',
  'mount',
  'beforeUnmount',
  'unmount',
  'preUnmount',
  'postUnmount'
] as const;

function createModelTemplate(name: string, ...children: SetupFn<any, any>[]) {
  function ModelTemplate(_input: any, context: ModelBlockContextType) {
    const { mount, onLifecycle } = context;
    preLifecycleStack.push({ lifecycle: 'preInit', name });
    postLifecycleStack.push({ lifecycle: 'preInit', name });

    lifecycleList.forEach((lifecycleName) => {
      onLifecycle(lifecycleName, () => {
        preLifecycleStack.push({
          lifecycle: lifecycleName,
          name
        });
      });
    });

    children.forEach((child) => {
      mount(child);
    });

    lifecycleList.forEach((lifecycleName) => {
      onLifecycle(lifecycleName, () => {
        postLifecycleStack.push({
          lifecycle: lifecycleName,
          name
        });
      });
    });

    return {};
  }

  ModelTemplate.meta = {
    name
  };

  return ModelTemplate;
}

const App = createModelTemplate(
  '1',
  createModelTemplate(
    '1-1',
    createModelTemplate('1-1-1'),
    createModelTemplate('1-1-2', createModelTemplate('1-1-2-1'))
  ),
  createModelTemplate(
    '1-2',
    createModelTemplate('1-2-1', createModelTemplate('1-2-1-1')),
    createModelTemplate('1-2-2')
  )
);

test('should trigger lifecycle in correct order', () => {
  const app = start(App);

  app.unmount();

  expect(preLifecycleStack).toEqual(
    ['preInit', ...lifecycleList]
      .map((lifecycleName) => {
        if (lifecycleName.startsWith('pre') || lifecycleName.startsWith('before')) {
          return ['1', '1-1', '1-1-1', '1-1-2', '1-1-2-1', '1-2', '1-2-1', '1-2-1-1', '1-2-2'].map(
            (name) => ({
              name,
              lifecycle: lifecycleName
            })
          );
        }
        return ['1-1-1', '1-1-2-1', '1-1-2', '1-1', '1-2-1-1', '1-2-1', '1-2-2', '1-2', '1'].map((name) => ({
          name,
          lifecycle: lifecycleName
        }));
      })
      .flat()
  );
});

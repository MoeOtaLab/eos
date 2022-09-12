import { ref } from '@vue/reactivity';
import {
  setupModel,
  provideContext,
  injectContext,
  createContext,
  useModel,
  setupDyanamicModel,
} from '@mflow/core';

const DetailModelContext = createContext({
  userModel: UserModel,
});

function Model1() {
  const { userModel } = injectContext(DetailModel);

  return {
    userModel,
  };
}

function UserModel() {}

function DynamicModel() {
  const list: any[] = [];

  const computedList = setupDyanamicModel(() =>
    list.map((item) => setupModel(Model1))
  );

  return {
    list: computedList,
  };
}

function DetailModel() {
  const num = ref(0);
  const model1Life$ = ref(false);
  const aa = ref(0);

  const model1 = setupModel(Model1, undefined, model1Life$);

  const userModel = setupModel(() => UserModel());

  const userList = setupModel(DynamicModel);

  provideContext(DetailModelContext, {
    userModel,
  });

  return {
    model1,
    userList,
    num,
  };
}

const detailModel = setupModel(DetailModel);

function Page() {
  const { num, model1 } = useModel(detailModel);
}

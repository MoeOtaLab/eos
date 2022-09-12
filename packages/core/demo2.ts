import { Ref, ref } from '@vue/reactivity';
import { setupModel, unmount } from '@mflow/core';

function CountModel(props: { count?: Ref<number> }) {
  const count2 = props?.count ?? ref(0);

  unmount(() => {
    count2.value = 666;
  });

  return {
    count2,
  };
}

function BasicInfoModel(props: { count?: Ref<number> }) {
  const { count: coutProp } = props;

  const countModel = setupModel(CountModel, { count: coutProp });
  const {
    value: { count2: count },
  } = countModel;

  function addOne() {
    count.value += 1;
  }

  function clear() {
    count.value = 0;
  }

  function deleteOne() {
    count.value -= 1;
  }

  // 初始化逻辑
  count.value = 233;

  return {
    countModel,
    count,

    // methods
    addOne,
    clear,
    deleteOne,
  };
}

export function AppModel() {
  const switchOn = ref(false);
  const count = ref(0);

  const basicInfoModel = setupModel(
    BasicInfoModel,
    {
      count,
    },
    switchOn
  );

  return {
    count,
    switchOn,
    basicInfoModel,
  };
}

const appModel = setupModel(AppModel);
appModel.value.switchOn.value = true;
console.log(appModel);
appModel.value.basicInfoModel.value?.addOne();
console.log(appModel);
appModel.value.switchOn.value = false;
appModel.value.basicInfoModel.value?.addOne();
console.log(appModel);
appModel.value.switchOn.value = true;
appModel.value.basicInfoModel.value?.deleteOne();
console.log(appModel);
appModel.value.basicInfoModel.value?.clear();
console.log(appModel);
setTimeout(() => {
  console.log(appModel);
});

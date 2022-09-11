import { Ref, ref } from '@vue/reactivity';
import { setupModel } from '@mflow/core';

export function BasicInfoModel(props: { count?: Ref<number> }) {
  const { count: countProp } = props;
  const count = countProp ?? ref(0);

  function addOne() {
    count.value += 1;
  }

  function clear() {
    count.value = 0;
  }

  function deleteOne() {
    count.value -= 1;
  }

  return {
    count,

    // methods
    addOne,
    clear,
    deleteOne,
  };
}

export function AppModel() {
  const switchOn = ref(false);
  const basicInfoModel = setupModel(BasicInfoModel, {}, switchOn);

  return {
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

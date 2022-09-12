import { computed, Ref, ref } from '@vue/reactivity';
import { mount, setupModel, unmount, setupDyanamicModel } from '@mflow/core';

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

class Person {
  name: string = '';
  phone?: string;
  uuid: string;
  constructor(person: Partial<Person>) {
    Object.assign(this, person);
    this.uuid = person?.uuid || Math.random().toString(36).substr(2, 5);
  }
}

function PersonModel(props: {
  name?: Ref<string>;
  phone?: Ref<string | undefined>;
}) {
  const { name, phone } = props;
  const nameRef = name ?? ref('');
  const phoneRef = phone ?? ref('');

  function updatePerson(name: string, phone: string = '') {
    nameRef.value = name;
    phoneRef.value = phone;
  }

  return {
    updatePerson,

    nameRef,
    phoneRef,
  };
}

function PersonListModel(props: {}) {
  const personList = ref<Person[]>([]);

  function addPerson(person: Person) {
    personList.value.push(person);
  }

  function deletePerson(index: number) {
    personList.value.splice(index, 1);
  }

  const PersonModelList = setupDyanamicModel(PersonModel, {
    list: personList,
    props: (item, index) => ({
      name: computed({
        get() {
          return personList.value[index].name;
        },
        set(value) {
          personList.value[index].name = value;
        },
      }),

      phone: computed({
        get() {
          return personList.value[index].phone;
        },
        set(value) {
          personList.value[index].phone = value;
        },
      }),
    }),
  });

  mount(() => {
    addPerson(new Person({ name: 'auto', phone: '233333' }));
  });

  return {
    personList,
    PersonModelList,
    addPerson,
    deletePerson,
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

  const personListModel = setupModel(PersonListModel);

  return {
    personListModel,
    count,
    switchOn,
    basicInfoModel,
  };
}

const appModel = setupModel(AppModel);
appModel.value.personListModel.value.addPerson(new Person({ name: 'first' }));

setTimeout(() => {
  appModel.value.personListModel.value.PersonModelList.value[1].value.updatePerson(
    'change==',
    'phone'
  );
  console.log(appModel);
});

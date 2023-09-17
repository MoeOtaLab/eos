import { type Subscription } from './Observable';
import { ExtraInfo } from './ExtraInfo';
import { Atom } from './State';

type GetObservableValue<ObservableType extends Atom<any>> =
  ObservableType extends Atom<infer ValueType> ? ValueType : unknown;

type GetObservableValueList<ObservableListType extends Array<Atom<any>>> = {
  [K in keyof ObservableListType]: GetObservableValue<ObservableListType[K]>;
};

export class ComputedState<ComputedValueType> extends Atom<
ComputedValueType | undefined
> {
  #subjects: Array<Atom<any>> = [];
  #subscriptions = new Set<Subscription>();
  #computeFn?: (...subjectValueList: any) => ComputedValueType;

  protected cleanup() {
    for (const subscription of this.#subscriptions?.values()) {
      subscription.unsubscribe();
    }
    this.#subscriptions.clear();
    this.#subjects = [];
  }

  compute<ObservableSubjectList extends Array<Atom<any>>>(
    subjects: [...ObservableSubjectList],
    computeFn: (
      ...subjectValueList: GetObservableValueList<ObservableSubjectList>
    ) => ComputedValueType
  ) {
    this.cleanup();
    this.#subjects = subjects;
    this.#computeFn = computeFn;

    this.update(
      () =>
        this.#computeFn?.(...this.#subjects.map((subject) => subject.current)),
      new ExtraInfo()
    );

    // setup subscription
    for (const subject of this.#subjects) {
      const subscription = subject.subscribe((value, extraInfo) => {
        this.update(
          () =>
            this.#computeFn?.(...this.#subjects.map((currentSubject) => {
              if (subject === currentSubject) {
                return value;
              }
              return currentSubject.current;
            })),
          new ExtraInfo(extraInfo)
        );
      });

      this.#subscriptions.add(subscription);
    }
  }
}

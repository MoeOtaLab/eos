import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function add(args: number[]) {
  return args.reduce((acc, cur) => acc + Number(cur), 0);
}

export function addOperation(
  sources: Observable<number>[],
  targetNames: (string | undefined)[] = []
) {
  return combineLatest(sources)
    .pipe(
      map((sourceValues) =>
        sourceValues.map((value, index) => {
          const targetName = targetNames[index];
          return typeof value === 'object' && targetName
            ? value[targetName]
            : value;
        })
      )
    )
    .pipe(map(add));
}

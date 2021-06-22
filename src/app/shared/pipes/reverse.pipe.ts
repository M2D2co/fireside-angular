import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: { reverse: () => void }, ...args: unknown[]): unknown {
    if (!value || !value.reverse) {
      return value;
    }

    return value.reverse();
  }

}

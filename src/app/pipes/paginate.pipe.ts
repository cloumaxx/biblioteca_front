import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(array: any[], pageSize: number, pageNumber: number): any[] {
    if (!array.length) return [];
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 5;
    const startIndex = (pageNumber - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  }

}

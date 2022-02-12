import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();
    this.paginator();
  }

  paginator() {
    let labels = this.translate.instant('paginator')
    this.itemsPerPageLabel = labels.itemsPerPageLabel
    this.nextPageLabel = labels.nextPageLabel
    this.previousPageLabel = labels.previousPageLabel
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    let label = " "+ this.translate.instant('paginator.ofLabel') + " "
    if (length === 0 || pageSize === 0) {
      return '0' + label + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + label + length;
  };

}

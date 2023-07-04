import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ListViewDDChange, ListViewHeaders, ListViewItems } from '../../models';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'tm-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnChanges, OnDestroy {
  @Input() listItems: ListViewItems[] = [];
  @Input() headers: ListViewHeaders[] = [];
  @Input() dropDowns: string[] = [];

  @Output() onEditItem = new EventEmitter<ListViewItems>();
  @Output() onDeleteItem = new EventEmitter<ListViewItems>();
  @Output() changeDDProperty = new EventEmitter<ListViewDDChange>();

  cloneListItems: ListViewItems[] = [];
  columns: string[] = [];
  searchTypeFormControl = new FormControl();
  searchValFormControl = new FormControl();
  searchType = 'string';

  private searchTypeSubscription!: Subscription;
  private searchValSubscription!: Subscription;

  constructor(private datePipe: DatePipe) {
    this.initSubscriptions();
  }

  ngOnChanges(changes: any): void {
    if (changes.headers) {
      this.columns = this.headers.map((header: ListViewHeaders) => {
        return header.key;
      });
      this.columns.push('actions');
      this.searchTypeFormControl.setValue(this.headers[0], {emitEvent: false})
    }

    if (changes.listItems) {
      this.cloneListItems = [...this.listItems];
    }
  }

  ngOnDestroy(): void {
    this.searchTypeSubscription.unsubscribe();
    this.searchValSubscription.unsubscribe();
  }

  searchResults(): void {
    if (!this.searchValFormControl.value) {
      this.listItems = [...this.cloneListItems];
      return;
    }
    if (this.searchTypeFormControl.value.type === 'date') {
      this.listItems = [...this.cloneListItems].filter((item: ListViewItems) => {
        const date = this.datePipe.transform((item as any)[this.searchTypeFormControl.value.key], 'shortDate');
        const compareDate = this.datePipe.transform(this.searchValFormControl.value, 'shortDate');
        return date === compareDate;
      });
    } else {
      this.listItems = [...this.cloneListItems].filter((item: ListViewItems) => {
        return (item as any)[this.searchTypeFormControl.value.key].toLowerCase().includes(this.searchValFormControl.value.toLowerCase());
      });
    }
  }

  onChangeItemStatus(val: string, item: ListViewItems): void {
    this.changeDDProperty.emit(
      {key: val, value: item}
    );
  }

  editItem(item: ListViewItems): void {
    this.onEditItem.emit(item);
  }

  deleteItem(item: ListViewItems): void {
    this.onDeleteItem.emit(item);
  }

  private initSubscriptions(): void {
    this.searchTypeSubscription = this.searchTypeFormControl.valueChanges.subscribe((searchType: ListViewHeaders) => {
      this.searchValFormControl.setValue('');
      this.searchType = searchType.type;
    });

    this.searchValSubscription = this.searchValFormControl.valueChanges.pipe(debounceTime(500)).subscribe((val: any) => {
      this.searchResults();
    });
  }
}

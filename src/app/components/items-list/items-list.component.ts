import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject, fromEvent } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { ItemsListService, ItemsSortBy } from "./items-list.service";
import { detectViewChanges } from "../../services/utility";
import { ItemDetail } from "../../app.entities";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemsListService]
})
export class ItemsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("gameSearch") private gameSearch: ElementRef;
  @ViewChild("clearSearch") private clearSearch: ElementRef;
  @ViewChild("autoComplete") private autoComplete: ElementRef;

  private unsubscriber: Subject<any> = new Subject();
  private loadData: Subject<{
    sortBy: string;
    searchTerm?: string;
  }> = new Subject();
  items: Array<ItemDetail> = [];
  autoCompleteList: Array<ItemDetail> = [];
  sortByOptions = [ItemsSortBy.rank, ItemsSortBy.year];
  sortBy: ItemsSortBy = ItemsSortBy.rank;
  showAutoComplete: boolean = false;
  searchTerm: string = "";
  showAsGrid: boolean = true;

  @HostListener("document:click")
  documentClick(event) {
    if (
      !this.autoComplete ||
      !this.autoComplete.nativeElement ||
      !event ||
      !event.target
    ) {
      this.showAutoComplete = false;
      return;
    }

    if (!this.autoComplete.nativeElement.contains(event.target)) {
      this.showAutoComplete = false;
    }
  }

  constructor(
    private itemsListService: ItemsListService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.loadData
      .pipe(
        switchMap((event: { sortBy: ItemsSortBy; searchTerm: string }) => {
          console.log("Switch Map");
          return this.itemsListService.getItemsList(
            event && event.sortBy,
            event && event.searchTerm
          );
        }),
        takeUntil(this.unsubscriber)
      )
      .subscribe(data => {
        this.items = (data && data.filteredGames) || [];
        this.autoCompleteList = data && data.autoCompleteGames;
        detectViewChanges(this.cdr);
      });

    this.refreshData();
  }

  ngAfterViewInit() {
    if (this.gameSearch && this.gameSearch.nativeElement) {
      fromEvent(this.gameSearch.nativeElement, "input")
        .pipe(
          debounceTime(300),
          map((event: any) => event.target.value),
          distinctUntilChanged(),
          takeUntil(this.unsubscriber)
        )
        .subscribe((searchTerm: string) => {
          this.searchTerm = searchTerm;
          this.showAutoComplete = true;
          this.refreshData();
        });
    }

    if (this.clearSearch && this.clearSearch.nativeElement) {
      fromEvent(this.clearSearch.nativeElement, "click")
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((searchTerm: string) => {
          this.searchTerm = null;
          this.refreshData();
        });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  refreshData() {
    this.loadData.next({
      sortBy: this.sortBy,
      searchTerm: this.searchTerm
    });
  }

  selectGame(game: ItemDetail) {
    this.showAutoComplete = false;
    if (!game) {
      return;
    }

    this.searchTerm = game.Name;
    this.items = [game];
    detectViewChanges(this.cdr);
  }

  onSortChange(event) {
    this.sortBy = event && event.target ? event.target.value : ItemsSortBy.rank;
    this.refreshData();
  }
}

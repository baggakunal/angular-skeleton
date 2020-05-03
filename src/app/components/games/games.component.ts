import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { GamesService } from "./games.service";
import { GameFieldName, SortDirection, SortBy, GameFieldConfig } from "./games.entities";
import { GameDetail } from "../../app.entities";
import { detectViewChanges } from "../../services/utility";

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GamesService]
})
export class GamesComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("autoComplete") private autoComplete: ElementRef;

    private unsubscriber: Subject<any> = new Subject();
    private loadData: Subject<{ sortBy: SortBy; searchTerm?: string; }> = new Subject();
    isLoading: boolean = true;
    gameFieldConfig: { array: Array<GameFieldConfig>, map: { [key in GameFieldName]?: GameFieldConfig } };
    games: Array<GameDetail> = [];
    autoCompleteList: Array<GameDetail> = [];
    sortByOptions: Array<{ label: string, value: string }>;
    sortDirectionOptions: Array<SortDirection>;
    sortBy: SortBy = null;
    showAutoComplete: boolean = false;
    searchTerm: FormControl = new FormControl(null);
    viewMode: 'grid' | 'tiles' = 'tiles';

    @HostListener("document:click")
    documentClick(event) {
        if (!this.autoComplete || !this.autoComplete.nativeElement || !event || !event.target) {
            this.showAutoComplete = false;
            return;
        }

        if (!this.autoComplete.nativeElement.contains(event.target)) {
            this.showAutoComplete = false;
        }
    }

    constructor(
        private gamesService: GamesService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.gameFieldConfig = this.gamesService.gameFieldConfig;
        this.sortByOptions = this.gamesService.sortByOptions;
        this.sortDirectionOptions = this.gamesService.sortDirectionOptions;

        this.loadData.pipe(
            switchMap((event: { sortBy: SortBy; searchTerm: string }) => {
                return this.gamesService.getGamesList(event && event.sortBy, event && event.searchTerm);
            }),
            takeUntil(this.unsubscriber)
        ).subscribe(data => {
            this.games = Object.assign([], data && data.filteredGames) || [];
            this.autoCompleteList = data && data.autoCompleteGames;
            this.isLoading = false;
            detectViewChanges(this.cdr);
        });

        this.searchTerm.valueChanges.pipe(
            debounceTime(250),
            distinctUntilChanged(),
            takeUntil(this.unsubscriber)
        ).subscribe((searchTerm: string) => {
            this.showAutoComplete = true;
            this.refreshData();
        });

        this.refreshData();
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }

    clearSearch() {
        this.searchTerm.setValue(null);
        this.refreshData()
    }

    refreshData() {
        this.loadData.next({
            sortBy: this.sortBy,
            searchTerm: this.searchTerm.value
        });
        detectViewChanges(this.cdr);
    }

    selectGame(game: GameDetail) {
        this.showAutoComplete = false;
        if (!game) {
            return;
        }

        this.searchTerm.setValue(game.title, { emitEvent: false });
        this.games = [game];
        detectViewChanges(this.cdr);
    }

    onSortChange(event: MatSelectChange, changeType: 'field' | 'direction') {
        if (!changeType) {
            return;
        }

        if (!this.sortBy) { this.sortBy = {}; }

        switch (changeType) {
            case 'field':
                this.sortBy.field = event && event.value || null;
                if (!this.sortBy.field) { this.sortBy = null }
                else if (!this.sortBy.direction) { this.sortBy.direction = SortDirection.asc }
                break;
            case 'direction':
                this.sortBy.direction = event && event.value || null;
                break;
        }

        this.refreshData();
    }
}

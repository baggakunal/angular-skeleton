import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataService } from "../../services/data.service";
import { ItemDetail } from "../../app.entities";
import { map } from "rxjs/operators";

export enum ItemsSortBy {
    rank = "rank",
    year = "year"
}

@Injectable()
export class ItemsListService {
    private games: Array<ItemDetail>;

    constructor(private dataService: DataService) { }

    getItemsList(
        sortBy: ItemsSortBy,
        searchTerm?: string
    ): Observable<{
        filteredGames: Array<ItemDetail>;
        autoCompleteGames: Array<ItemDetail>;
    }> {
        if (!this.games || !this.games.length) {
            return this.dataService.getItemsList().pipe(
                map((games: Array<ItemDetail>) => {
                    if (!games || !games.length) {
                        return { filteredGames: [], autoCompleteGames: [] };
                    }
                    this.games = games;
                    return this.returnFilteredGames(sortBy, searchTerm);
                })
            );
        }

        return of(this.returnFilteredGames(sortBy, searchTerm));
    }

    private returnFilteredGames(sortBy: ItemsSortBy, searchTerm?: string) {
        if (!this.games || !this.games.length) {
            return { filteredGames: [], autoCompleteGames: [] };
        }

        let filteredGames: Array<ItemDetail> = [],
            autoCompleteGames: Array<ItemDetail> = [];
        if (searchTerm == null || searchTerm.trim() === "") {
            filteredGames = this.games;
        } else {
            this.games.forEach((game: ItemDetail) => {
                if (!game) {
                    return;
                }

                if (
                    game.Name &&
                    game.Name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    filteredGames.push(game);
                }
                if (
                    game.Name &&
                    game.Name.toLowerCase().startsWith(searchTerm.toLowerCase())
                ) {
                    autoCompleteGames.push(game);
                }
            });
        }

        switch (sortBy) {
            case ItemsSortBy.rank:
                return {
                    filteredGames: this.sortByRank(filteredGames),
                    autoCompleteGames: autoCompleteGames
                };
            case ItemsSortBy.year:
                return {
                    filteredGames: this.sortByYear(filteredGames),
                    autoCompleteGames: autoCompleteGames
                };
            default:
                return {
                    filteredGames: this.sortByRank(filteredGames),
                    autoCompleteGames: autoCompleteGames
                };
        }
    }

    private sortByRank(games: Array<ItemDetail>) {
        if (!this.games || !this.games.length) {
            return games;
        }

        return games.sort((game1, game2) => game1.Rank - game2.Rank);
    }

    private sortByYear(games: Array<ItemDetail>) {
        if (!this.games || !this.games.length) {
            return games;
        }

        return games.sort((game1, game2) => game1.Year - game2.Year);
    }
}

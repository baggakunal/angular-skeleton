import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataService } from "../../services/data.service";
import { GameFieldName, SortDirection, SortBy, GameFieldConfig } from "./games-list.entities";
import { GameDetail } from "../../app.entities";
import { map } from "rxjs/operators";

const GAME_FIELD_CONFIG: Array<GameFieldConfig> = [
    {
        fieldName: GameFieldName.title,
        headerName: "Title",
        fieldType: 'string',
        sortEnabled: true,
        className: 'game-title'
    },
    {
        fieldName: GameFieldName.platform,
        headerName: "Platform",
        fieldType: 'string',
        sortEnabled: true,
        className: 'game-platform'
    },
    {
        fieldName: GameFieldName.score,
        headerName: "Score",
        fieldType: 'numeric',
        sortEnabled: true
    },
    {
        fieldName: GameFieldName.genre,
        headerName: "Genre",
        fieldType: 'string',
        sortEnabled: true,
        className: 'game-genre'
    },
    {
        fieldName: GameFieldName.editors_choice,
        headerName: "Editors Choice",
        fieldType: 'string',
        sortEnabled: true,
        className: 'game-editors-choice'
    },
    {
        fieldName: GameFieldName.release_year,
        headerName: "Release Year",
        fieldType: 'numeric',
        sortEnabled: true
    }
];

@Injectable()
export class GamesListService {
    private games: Array<GameDetail>;

    private _gameFieldConfig: { array: Array<GameFieldConfig>, map: { [key in GameFieldName]?: GameFieldConfig } };
    get gameFieldConfig() {
        return this._gameFieldConfig;
    }

    private _sortByOptions: Array<{ label: string, value: string }>;
    get sortByOptions() {
        return this._sortByOptions;
    }

    private _sortDirectionOptions: Array<SortDirection> = [SortDirection.asc, SortDirection.dsc];
    get sortDirectionOptions() {
        return this._sortDirectionOptions;
    }

    constructor(private dataService: DataService) {
        this.initializeGameConfig();
    }

    private initializeGameConfig() {
        this._gameFieldConfig = { array: [], map: {} };
        this._sortByOptions = [];

        GAME_FIELD_CONFIG.forEach((fieldConfig: GameFieldConfig) => {
            if (!fieldConfig || !fieldConfig.fieldName || fieldConfig.fieldName.trim() == '' || this._gameFieldConfig.map[fieldConfig.fieldName]) {
                return;
            }

            this._gameFieldConfig.array.push(fieldConfig);
            this._gameFieldConfig.map[fieldConfig.fieldName] = fieldConfig;

            if (fieldConfig.sortEnabled) {
                this._sortByOptions.push({ label: fieldConfig.headerName, value: fieldConfig.fieldName })
            }
        });
    }

    getGamesList(sortBy: SortBy, searchTerm?: string): Observable<{ filteredGames: Array<GameDetail>, autoCompleteGames: Array<GameDetail> }> {
        if (!this.games || !this.games.length) {
            return this.dataService.getGamesList().pipe(
                map((games: Array<GameDetail>) => {
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

    private returnFilteredGames(sortBy: SortBy, searchTerm?: string) {
        if (!this.games || !this.games.length) {
            return { filteredGames: [], autoCompleteGames: [] };
        }

        const shallowCopyGames = Object.assign([], this.games);
        let filteredGames: Array<GameDetail> = [], autoCompleteGames: Array<GameDetail> = [];
        if (searchTerm == null || searchTerm.trim() === "") {
            filteredGames = shallowCopyGames;
        } else {
            searchTerm = searchTerm.toLowerCase();
            filteredGames = shallowCopyGames.filter((game: GameDetail) => {
                if (!game || !game.title) {
                    return false;
                }

                const title = game.title.toString().toLowerCase();

                if (title.startsWith(searchTerm)) {
                    autoCompleteGames.push(game);
                }
                return title.includes(searchTerm);
            });
        }

        if (sortBy && sortBy.field && sortBy.direction && this.gameFieldConfig && this.gameFieldConfig.map && this.gameFieldConfig.map[sortBy.field]) {
            switch (this.gameFieldConfig.map[sortBy.field].fieldType) {
                case 'string':
                    filteredGames = this.sortStringType(filteredGames, sortBy.field, sortBy.direction);
                    break;
                case 'numeric':
                    filteredGames = this.sortNumericType(filteredGames, sortBy.field, sortBy.direction);
                    break;
            }
        }

        return {
            filteredGames: filteredGames,
            autoCompleteGames: autoCompleteGames
        };
    }

    private sortStringType(games: Array<GameDetail>, field: string, direction: SortDirection): Array<GameDetail> {
        if (!games || !games.length || !field || field.trim() == '') {
            return games;
        }

        const sortedGames = games.sort((game1, game2) => {
            const value1 = game1 && game1[field] && game1[field].toString();
            const value2 = game2 && game2[field] && game2[field].toString();
            return value1.localeCompare(value2);
        });

        return direction == SortDirection.asc ? sortedGames : sortedGames.reverse();
    }

    private sortNumericType(games: Array<GameDetail>, field: string, direction: SortDirection): Array<GameDetail> {
        if (!games || !games.length || !field || field.trim() == '') {
            return games;
        }

        const sortedGames = games.sort((game1, game2) => {
            const value1 = game1 && game1[field] || 0;
            const value2 = game2 && game2[field] || 0;
            return value1 - value2;
        });

        return direction == SortDirection.asc ? sortedGames : sortedGames.reverse();
    }
}

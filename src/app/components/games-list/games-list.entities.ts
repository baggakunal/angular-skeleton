export enum GameFieldName {
    editors_choice = "editors_choice",
    genre = "genre",
    platform = "platform",
    release_year = "release_year",
    score = "score",
    title = "title",
    url = "url",
}

export enum SortDirection {
    asc = "asc",
    dsc = "dsc"
}

export interface SortBy {
    field?: GameFieldName;
    direction?: SortDirection
}

export interface GameFieldConfig {
    fieldName: string;
    headerName: string;
    fieldType: 'string' | 'numeric';
    sortEnabled?: boolean;
    className?: string;
}

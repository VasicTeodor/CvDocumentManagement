import { Application } from "./application";

export class ApplicationSearchResult {
    application: Application;
    highlights: string[];

    constructor(application: Application, highlights: string[]) {
        this.application = application;
        this.highlights = highlights;
    }
}

export class SearchResult {
    message: string;
    result: Result;

    constructor(message: string, result: Result) {
        this.message = message;
        this.result = result;
    }
}

export class Result {
    searchResults: ApplicationSearchResult[]

    constructor(sesearchResults: ApplicationSearchResult[]) {
        this.searchResults = sesearchResults;
    }
}
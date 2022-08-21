interface SearchElement {
    name: string;
    email: string;
    phone: string;
    note: string;
    arrival: string;
    departure: string;
    room: string;
}
export declare class SearchBar {
    search_data: any;
    search_btn_listener: any;
    search_result: any;
    no_search_result: boolean;
    previous_search_params: SearchElement;
    search_params: SearchElement;
    constructor(tid: string, data: any);
    initSearchElement(): void;
    searchData(): void;
    setSearchResult(result: any): void;
    getSearchResult(): any;
    isStringInclude(originalString: string, searchString: string): boolean;
    isDateEqual(originalDate: string, searchDate: string): boolean;
}
export {};

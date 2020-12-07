export interface ListIssuesRequest {
    readonly filters: Filters;    
  };

export interface Filters {
    readonly orgs: string[];
}
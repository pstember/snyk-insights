import { Issue } from './types';

export interface ListIssuesRequest {
    readonly filters: Filters;    
  };

export interface Filters {
    readonly orgs: string[];
}

export interface ListIssueResponse {
  readonly results: Issue[],
  readonly total: number,
}
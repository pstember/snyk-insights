import { AxiosRequestConfig } from 'axios';
import { ListIssuesRequest } from './apiTypes';
import HttpClient from './http-client';

export default class SnykAPI extends HttpClient {
  private static classInstance?: SnykAPI;

  private constructor() {
    super(process.env.VUE_APP_ENDPOINT || 'https://snyk.io/api/v1');
    this.initializeRequestInterceptor();
  }

  public static getInstance(): SnykAPI {
    if (!this.classInstance) {
      this.classInstance = new SnykAPI();
    }
    return this.classInstance;
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const res: AxiosRequestConfig = config;
    res.headers.authorization = 'Token ' + process.env.VUE_APP_SNYK_TOKEN;
    // res.headers['Content-type'] = 'application/json';

    return res;
  };

  public listIssues = (body: ListIssuesRequest) => this.instance.post('/reporting/issues/latest?page=1&perPage=100&sortBy=issueTitle&order=asc&groupBy=issue', body);

  public countIssues = (body: ListIssuesRequest) => this.instance.post('/reporting/counts/issues/latest?groupBy=severity', body);

}

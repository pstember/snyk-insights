import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ListIssueResponse, ListIssuesRequest } from './apiTypes';
import HttpClient from './http-client';
import axios from 'axios';

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

  public listAllIssues = async (body: ListIssuesRequest) => {
    const req = this.instance.post('/reporting/issues/latest?page=1&perPage=1000&sortBy=issueTitle&order=asc', body)
    const response = [ req ];
    await req.then( (r: AxiosResponse<ListIssueResponse>) => {
      if( r.data.total > 1000 ) {
        const pages = Math.ceil(r.data.total / 1000);
        for ( let i = 1 ; i < pages ; i++) {
          response.push(this.instance.post(`/reporting/issues/latest?page=${1+i}&perPage=1000&sortBy=issueTitle&order=asc`, body));
        }
      }
    });
    return axios.all(response);
  };

  public countIssues = (body: ListIssuesRequest) => this.instance.post('/reporting/counts/issues/latest?groupBy=severity', body);

}

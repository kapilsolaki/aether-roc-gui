// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TransactionList } from '../models/transaction-list';

@Injectable({
  providedIn: 'root',
})
export class TransactionListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTransactions
   */
  static readonly GetTransactionsPath = '/transactions';

  /**
   * GET /transactions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransactions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactions$Response(params?: {
  }): Observable<StrictHttpResponse<TransactionList>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionListService.GetTransactionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TransactionList>;
      })
    );
  }

  /**
   * GET /transactions.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTransactions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransactions(params?: {
  }): Observable<TransactionList> {

    return this.getTransactions$Response(params).pipe(
      map((r: StrictHttpResponse<TransactionList>) => r.body as TransactionList)
    );
  }

}

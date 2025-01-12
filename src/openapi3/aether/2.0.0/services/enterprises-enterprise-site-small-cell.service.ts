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

import { EnterprisesEnterpriseSiteSmallCell } from '../models/enterprises-enterprise-site-small-cell';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSmallCellService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCell
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell/{small-cell-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSmallCellService.GetEnterprisesEnterpriseSiteSmallCellPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('small-cell-id', params['small-cell-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<EnterprisesEnterpriseSiteSmallCell> {

    return this.getEnterprisesEnterpriseSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>) => r.body as EnterprisesEnterpriseSiteSmallCell)
    );
  }

}

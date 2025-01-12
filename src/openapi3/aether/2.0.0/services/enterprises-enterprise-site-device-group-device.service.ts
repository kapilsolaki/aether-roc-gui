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

import { EnterprisesEnterpriseSiteDeviceGroupDevice } from '../models/enterprises-enterprise-site-device-group-device';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteDeviceGroupDeviceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupDevice
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupDevicePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device/{device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceGroupDeviceService.GetEnterprisesEnterpriseSiteDeviceGroupDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
      rb.path('device-id', params['device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDevice(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupDevice> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>) => r.body as EnterprisesEnterpriseSiteDeviceGroupDevice)
    );
  }

}

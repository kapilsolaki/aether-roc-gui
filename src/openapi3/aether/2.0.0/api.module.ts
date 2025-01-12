// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { Service } from './services/service';
import { ApiService } from './services/api.service';
import { ConnectivityServicesConnectivityServiceService } from './services/connectivity-services-connectivity-service.service';
import { EnterprisesEnterpriseService } from './services/enterprises-enterprise.service';
import { EnterprisesEnterpriseApplicationService } from './services/enterprises-enterprise-application.service';
import { EnterprisesEnterpriseApplicationEndpointService } from './services/enterprises-enterprise-application-endpoint.service';
import { EnterprisesEnterpriseConnectivityServiceService } from './services/enterprises-enterprise-connectivity-service.service';
import { EnterprisesEnterpriseSiteService } from './services/enterprises-enterprise-site.service';
import { EnterprisesEnterpriseSiteDeviceGroupService } from './services/enterprises-enterprise-site-device-group.service';
import { EnterprisesEnterpriseSiteDeviceGroupDeviceService } from './services/enterprises-enterprise-site-device-group-device.service';
import { EnterprisesEnterpriseSiteDeviceService } from './services/enterprises-enterprise-site-device.service';
import { EnterprisesEnterpriseSiteIpDomainService } from './services/enterprises-enterprise-site-ip-domain.service';
import { EnterprisesEnterpriseSiteMonitoringEdgeDeviceService } from './services/enterprises-enterprise-site-monitoring-edge-device.service';
import { EnterprisesEnterpriseSiteSimCardService } from './services/enterprises-enterprise-site-sim-card.service';
import { EnterprisesEnterpriseSiteSliceService } from './services/enterprises-enterprise-site-slice.service';
import { EnterprisesEnterpriseSiteSliceDeviceGroupService } from './services/enterprises-enterprise-site-slice-device-group.service';
import { EnterprisesEnterpriseSiteSliceFilterService } from './services/enterprises-enterprise-site-slice-filter.service';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleService } from './services/enterprises-enterprise-site-slice-priority-traffic-rule.service';
import { EnterprisesEnterpriseSiteSmallCellService } from './services/enterprises-enterprise-site-small-cell.service';
import { EnterprisesEnterpriseSiteUpfService } from './services/enterprises-enterprise-site-upf.service';
import { EnterprisesEnterpriseTemplateService } from './services/enterprises-enterprise-template.service';
import { EnterprisesEnterpriseTrafficClassService } from './services/enterprises-enterprise-traffic-class.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    Service,
    ApiService,
    ConnectivityServicesConnectivityServiceService,
    EnterprisesEnterpriseService,
    EnterprisesEnterpriseApplicationService,
    EnterprisesEnterpriseApplicationEndpointService,
    EnterprisesEnterpriseConnectivityServiceService,
    EnterprisesEnterpriseSiteService,
    EnterprisesEnterpriseSiteDeviceGroupService,
    EnterprisesEnterpriseSiteDeviceGroupDeviceService,
    EnterprisesEnterpriseSiteDeviceService,
    EnterprisesEnterpriseSiteIpDomainService,
    EnterprisesEnterpriseSiteMonitoringEdgeDeviceService,
    EnterprisesEnterpriseSiteSimCardService,
    EnterprisesEnterpriseSiteSliceService,
    EnterprisesEnterpriseSiteSliceDeviceGroupService,
    EnterprisesEnterpriseSiteSliceFilterService,
    EnterprisesEnterpriseSiteSlicePriorityTrafficRuleService,
    EnterprisesEnterpriseSiteSmallCellService,
    EnterprisesEnterpriseSiteUpfService,
    EnterprisesEnterpriseTemplateService,
    EnterprisesEnterpriseTrafficClassService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}

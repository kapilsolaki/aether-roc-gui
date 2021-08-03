/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {RocMonitorBase} from '../../roc-monitor-base';
import {
    DeviceGroupDeviceGroupService,
    SiteSiteService,
    IpDomainIpDomainService
} from '../../../openapi3/aether/3.0.0/services';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {AETHER_TARGETS} from '../../../environments/environment';
import {IdTokClaims} from '../../idtoken';
import {DeviceGroupDeviceGroup, SiteSite, IpDomainIpDomain} from '../../../openapi3/aether/3.0.0/models';

@Component({
    selector: 'aether-device-group-monitor',
    templateUrl: './device-group-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class DeviceGroupMonitorComponent extends RocMonitorBase implements OnInit, OnDestroy {
    grafanaOrgId: number = 1;
    grafanaOrgName: string;
    thisDg: DeviceGroupDeviceGroup;
    site: SiteSite;
    ipDomain: IpDomainIpDomain;

    constructor(
        protected dgService: DeviceGroupDeviceGroupService,
        protected siteService: SiteSiteService,
        protected ipDomainService: IpDomainIpDomainService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(route, router);
    }

    ngOnInit(): void {
        super.init();
        this.getChildrenOfDg(this.id);
        if (this.oauthService.hasValidIdToken()) { // TODO move this to base class
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase());
        }
    }

    ngOnDestroy(): void {

    }

    private getChildrenOfDg(dgID: string): void {
        this.dgService.getDeviceGroupDeviceGroup({target: AETHER_TARGETS[0], id: dgID}).subscribe(
            (value) => {
                this.thisDg = value;
                this.getSite(value.site);
                this.getIpDomain(value['ip-domain']);
            },
            err => console.warn('Error getting DG', dgID, err)
        );
    }

    private getSite(siteID: string): void {
        this.siteService.getSiteSite({target: AETHER_TARGETS[0], id: siteID}).subscribe(
            (value: SiteSite) => this.site = value,
            err => console.warn('Error loading site', siteID, err)
        );
    }

    private getIpDomain(ipDomainID: string): void {
        this.ipDomainService.getIpDomainIpDomain({target: AETHER_TARGETS[0], id: ipDomainID}).subscribe(
            (value: IpDomainIpDomain) => this.ipDomain = value,
            err => console.warn('Error loading IPDomain', ipDomainID, err)
        );
    }

    generateConnectivityPanelUrl(orgId: number, orgName: string, ueId: number, panel: number): string {
        // <iframe src="http://localhost:8183/grafana/d-solo/ue-41/ue-41-connectivity-and-
        // throughput?orgId=1&theme=light&panelId=1" width="450" height="200" frameborder="0"></iframe>
        return this.grafanaUrl + '/d-solo/ue-' + ueId + '?orgId=' + orgId +
            '&theme=light&panelId=' + panel;
    }

}
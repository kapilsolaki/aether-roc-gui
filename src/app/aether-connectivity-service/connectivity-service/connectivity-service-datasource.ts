/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import {
    ConnectivityServices,
    ConnectivityServicesConnectivityService,
} from '../../../openapi3/aether/2.0.0/models';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class ConnectivityServiceDatasource extends RocDataSource<
    ConnectivityServicesConnectivityService,
    ConnectivityServices
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
        protected coreEPAttr: string = 'core-5g-endpoint'
    ) {
        super(
            aetherService,
            bs,
            target,
            'Connectivity-services-2.0.0',
            ['connectivity-service'],
            ['connectivity-service-id']
        );
    }
    getSortedData(
        data: ConnectivityServicesConnectivityService[]
    ): ConnectivityServicesConnectivityService[] {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'core-5g-endpoint':
                    return compare(
                        a[this.coreEPAttr],
                        b[this.coreEPAttr],
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}

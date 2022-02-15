/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseSiteIpDomain,
    EnterprisesEnterpriseSiteUpf,
} from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class UpfDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteUpf,
    any
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/upf-2.0.0', 'upf');
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteUpf,
                any
            >
        ) => void
    ): void {
        dataSourceObservable
            .pipe(
                map((x: Enterprises) => x?.enterprise),
                skipWhile((x) => x === undefined),
                mergeMap((items: EnterprisesEnterprise[]) => from(items))
            )
            .subscribe(
                (value: EnterprisesEnterprise) => {
                    value.site.forEach((s) => {
                        s.upf.forEach((u) => {
                            if (
                                !this.bs.containsDeleteEntry(
                                    '/enterprises/enterprise[' +
                                        value['enterprise-id'] +
                                        '/site[site-id=' +
                                        s['site-id'] +
                                        '/upf[upf-id=' +
                                        u['upf-id'] +
                                        ']'
                                )
                            ) {
                                u['enterprise-id'] = value['enterprise-id'];
                                u['site-id'] = s['site-id'];
                                this.data.push(u);
                            } else {
                                console.log(
                                    'upf-id is already in basket',
                                    u['upf-id']
                                );
                            }
                        });
                    });
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        this.target,
                        error
                    );
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    // const basketPreview = this.bs.buildPatchBody().Updates;
                    onDataLoaded(this);
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    getSortedData(
        data: EnterprisesEnterpriseSiteUpf[]
    ): EnterprisesEnterpriseSiteUpf[] {
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
                case 'address':
                    return compare(a.address, b.address, isAsc);
                case 'port':
                    return compare(a.port, b.port, isAsc);
                default:
                    return 0;
            }
        });
    }
}

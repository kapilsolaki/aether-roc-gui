/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { Enterprises } from '../../../openapi3/aether/2.0.0/models';
import {
    EnterprisesEnterpriseSiteSmallCell,
    EnterprisesEnterprise,
} from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';
import { AETHER_TARGET } from '../../../environments/environment';

export class SmallCellDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteSmallCell,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(
            aetherService,
            bs,
            target,
            'Enterprises-2.0.0',
            ['enterprise', 'site', 'small-cell'],
            ['enterprise-id', 'site-id', 'small-cell-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteSmallCell,
                Enterprises
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
                        s['small-cell'].forEach((sc) => {
                            sc['enterprise-id'] = value['enterprise-id'];
                            sc['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                value['enterprise-id'],
                                s['site-id'],
                                sc['small-cell-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                sc[FORDELETE] = STRIKETHROUGH;
                            }
                            this.data.push(sc);
                        });
                    });
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        AETHER_TARGET,
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
        data: EnterprisesEnterpriseSiteSmallCell[]
    ): EnterprisesEnterpriseSiteSmallCell[] {
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
                    return compare(a['address'], b['address'], isAsc);
                case 'tac':
                    return compare(a['tac'], b['tac'], isAsc);
                default:
                    return 0;
            }
        });
    }
}

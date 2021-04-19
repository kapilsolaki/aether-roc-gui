/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceGroupServiceGroup} from '../../../../openapi3/aether/2.1.0/models';
import {ServiceGroupDatasource} from './group-datasource';
import {AETHER_TARGETS} from '../../../../environments/environment';
import {BasketService} from '../../../basket.service';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {RocListBase} from '../../../roc-list-base';

@Component({
    selector: 'aether-group',
    templateUrl: './group.component.html',
    styleUrls: ['../../../common-profiles.component.scss']
})
export class GroupComponent extends RocListBase<ServiceGroupDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ServiceGroupServiceGroup>;
    displayedColumns = [
        'id',
        'name',
        'description',
        'Policy',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new ServiceGroupDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getServiceGroup({
            target: AETHER_TARGETS[0]
        }));
        console.log(this.dataSource);
    }
}
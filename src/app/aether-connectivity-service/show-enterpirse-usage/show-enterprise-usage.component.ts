/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGET } from '../../../environments/environment';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-enterprise-usage',
    templateUrl: './show-enterprise-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowEnterpriseUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() connectivityServiceID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private aetherService: AetherService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.aetherService
            .getEnterprises({
                target: AETHER_TARGET,
            })
            .subscribe((displayData) => {
                displayData.enterprise.forEach((e) => {
                    e['connectivity-service'].forEach((cs) => {
                        if (
                            cs['connectivity-service'] ===
                            this.connectivityServiceID
                        ) {
                            const displayParentModules = {
                                id: e['enterprise-id'],
                                'display-name': e['display-name'],
                            };
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}

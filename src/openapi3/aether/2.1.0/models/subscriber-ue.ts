// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SubscriberUeProfiles } from './subscriber-ue-profiles';
import { SubscriberUeServingPlmn } from './subscriber-ue-serving-plmn';
export interface SubscriberUe {
  'display-name'?: string;
  enabled?: boolean;
  enterprise?: string;
  id?: string;

  /**
   * For choice imsi:range
   */
  'imsi-range-from'?: number;

  /**
   * For choice imsi:range
   */
  'imsi-range-to'?: number;

  /**
   * For choice imsi:wildcard
   */
  'imsi-wildcard'?: string;
  priority?: number;
  profiles?: SubscriberUeProfiles;
  'requested-apn'?: string;
  'serving-plmn'?: SubscriberUeServingPlmn;

  [key: string]: AdditionalPropertyTarget | SubscriberUeProfiles | SubscriberUeServingPlmn | boolean | number | string | undefined;
}
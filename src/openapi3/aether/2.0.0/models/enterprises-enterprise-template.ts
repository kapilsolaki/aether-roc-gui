// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseTemplateMbr } from './enterprises-enterprise-template-mbr';
export interface EnterprisesEnterpriseTemplate {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  mbr?: EnterprisesEnterpriseTemplateMbr;

  /**
   * Slice differentiator
   */
  sd?: number;

  /**
   * Slice/Service type
   */
  sst?: number;

  /**
   * ID for this slice template.
   */
  'template-id': string;

  [key: string]: AdditionalPropertyUnchanged | EnterprisesEnterpriseTemplateMbr | number | string | undefined;
}

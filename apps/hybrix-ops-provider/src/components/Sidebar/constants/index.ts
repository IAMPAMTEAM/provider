import icGear from '@/assets/images/icons/ic-gear.svg';
import icCode from '@/assets/images/icons/code.svg';
import icDevelop from '@/assets/images/icons/self-development.svg';
import icCustomerService from '@/assets/images/icons/customer-service.svg';

import { Service } from '../enums';
import type { SidebarOption } from '../types';

export const SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    icon: icCustomerService,
    title: 'Customer Management',
    menus: [
      {
        icon: icGear,
        title: Service.MANAGEMENT_SOCIAL_USERS,
        routeName: 'managementAccount',
        subMenus: null,
      },
      {
        icon: icGear,
        title: Service.MANAGEMENT_TENANTS,
        routeName: 'managementTenant',
        subMenus: null,
      },
      {
        icon: icGear,
        title: Service.MANAGEMENT_TENANTS_AWS_ACCOUNTS,
        routeName: 'managementPayingAccount',
        subMenus: null,
      },
      // {
      //   icon: icCustomerService,
      //   title: Service.MANAGEMENT_ALLOWLIST,
      //   routeName: '',
      //   subMenus: [
      //     {
      //       icon: icGear,
      //       title: Service.MANAGEMENT_WHITELIST,
      //       routeName: 'whitelist',
      //       subMenus: null,
      //     },
      //     {
      //       icon: icGear,
      //       title: Service.MANAGEMENT_BLACKLIST,
      //       routeName: 'blacklist',
      //       subMenus: null,
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   icon: icGear,
  //   title: 'CheckRule Management',
  //   menus: [
  //     {
  //       icon: icGear,
  //       title: Service.RULES_EDITOR,
  //       routeName: 'rules-editor',
  //       subMenus: null,
  //     },
  //   ],
  // },
  {
    icon: icCode,
    title: 'Knowledge Data Management',
    menus: [
      {
        title: Service.MANAGEMANT_AWS_REGIONS,
        icon: icGear,
        routeName: 'metadata-region',
        subMenus: null,
      },
      {
        title: Service.MANAGEMANT_AWS_PRODUCTS,
        icon: icGear,
        routeName: 'metadata-product',
        subMenus: null,
      },
      {
        title: Service.MANAGEMANT_AWS_CHECK_RULES,
        icon: icGear,
        routeName: 'metadata-resource',
        subMenus: null,
      },
      // {
      //   title: Service.METADATA_REGION,
      //   icon: icGear,
      //   routeName: 'metadata-region',
      //   subMenus: null,
      // },
      // {
      //   title: Service.METADATA_SECURITY_TERM,
      //   icon: icGear,
      //   routeName: 'metadata-security-term',
      //   subMenus: null,
      // },
      // {
      //   title: Service.METADATA_SVG_ICON,
      //   icon: icGear,
      //   routeName: 'metadata-svg-icon',
      //   subMenus: null,
      // },
    ],
  },

  {
    icon: icDevelop,
    title: 'Billing Management',
    menus: [
      {
        icon: icGear,
        title: Service.SYSTEM,
        routeName: 'systemUser',
        subMenus: null,
      },
      { title: Service.DEBUG, icon: icGear, routeName: 'debug', subMenus: null },
    ],
  },

  {
    icon: icDevelop,
    title: 'System & Service Management',
    menus: [
      {
        icon: icGear,
        title: Service.MONITORING,
        routeName: 'monitoring',
        subMenus: null,
      },
    ],
  },
];

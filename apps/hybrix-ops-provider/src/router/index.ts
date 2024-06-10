import { Service } from '@/components/Sidebar/enums';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'EntryView',
    component: () => import('@/views/Entry/EntryContainer.vue'),
  },
  {
    path: '/console',
    component: () => import('@/layouts/ConsoleLayout.vue'),
    children: [
      {
        path: 'management-account',
        name: 'managementAccount',
        component: () => import('@/views/ManagementAccount/ManagementAccountContainer.vue'),
      },
      {
        path: 'blacklist',
        name: 'blacklist',
        component: () => import('@/views/Allowlist/Blacklist/BlacklistContainer.vue'),
      },
      {
        path: 'whitelist',
        name: 'whitelist',
        component: () => import('@/views/Allowlist/Whitelist/WhitelistContainer.vue'),
      },
      {
        path: 'management-tenant',
        name: 'managementTenant',
        component: () => import('@/views/Tenant/TenantContainer.vue'),
      },
      {
        path: 'management-paying-account',
        name: 'managementPayingAccount',
        component: () =>
          import('@/views/ManagementPayingAccount/ManagementPayingAccountContainer.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile/ProfileContainer.vue'),
      },
      {
        path: 'debug',
        name: 'debug',
        component: () => import('@/views/Debug/DebugContainer.vue'),
      },
      {
        path: '/system',
        name: Service.SYSTEM,
        meta: {
          title: Service.SYSTEM,
          requiresAuth: true,
          privileges: ['Admin'],
        },
        children: [
          {
            path: 'user',
            name: 'systemUser',
            component: () => import('@/views/System/User/UserContainer.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/meta-data',
    component: () => import('@/layouts/ConsoleLayout.vue'),
    children: [
      {
        path: 'product',
        name: 'metadata-product',
        component: () => import('@/views/MetaData/Product/ProductContainer.vue'),
      },
      {
        path: 'service',
        name: 'metadata-service',
        component: () => import('@/views/MetaData/Service/ServiceContainer.vue'),
      },
      {
        path: 'resource',
        name: 'metadata-resource',
        component: () => import('@/views/MetaData/Resource/ResourceContainer.vue'),
      },
      {
        path: 'region',
        name: 'metadata-region',
        component: () => import('@/views/MetaData/Region/RegionContainer.vue'),
      },
      {
        path: 'security-term',
        name: 'metadata-security-term',
        component: () => import('@/views/MetaData/SecurityTerm/SecurityTermContainer.vue'),
      },
      {
        path: 'svg-icon',
        name: 'metadata-svg-icon',
        component: () => import('@/views/MetaData/SvgIcon/SvgIconContainer.vue'),
      },
    ],
  },

  {
    path: '/rules',
    component: () => import('@/layouts/ConsoleLayout.vue'),
    children: [
      {
        path: 'editor',
        name: 'rules-editor',
        component: () => import('@/views/Rules/RulesEditorContainer.vue'),
      },
    ],
  },

  {
    path: '/monitoring',
    component: () => import('@/layouts/ConsoleLayout.vue'),
    children: [
      {
        path: '',
        name: 'monitoring',
        component: () => import('@/views/Monitoring/MonitoringContainer.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

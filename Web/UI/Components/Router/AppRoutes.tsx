// Web/UI/Components/Router/AppRoutes.tsx
import { AppRoute } from './AppRoute';

export const AppRoutes: AppRoute[] = [
  {
    to: '/',
    path: '/',
    label: 'Home',
    exact: true,
    imported: {
      imported: import('UI/Routes/Home'),
      path: 'Routes/Home/index.tsx',
    },
  },
  {
    to: '/Test',
    path: 'Test',
    label: 'Test',
    imported: {
      imported: import('UI/Routes/Test'),
      path: 'Routes/Test/index.tsx',
    },
  },
  {
    path: 'Example',
    to: '/Example',
    label: 'Example',
    imported: {
      imported: import('UI/Routes/Example'),
      path: 'Routes/Example/index.tsx'
    }
  }
];

// Web/UI/Components/Router/Routes.tsx
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';

export interface Route {
  to: string;
  label: string;
  roles?: UserRole[];
}

export const Routes: Route[] = [
  { label: 'Home', to: '/' },
  { label: 'Test', to: '/Test' },
  { label: 'Example', to: '/Example' },
  { label: 'Lab', to: '/Lab' },
  { label: 'Login', to: '/Login', roles: [UserRole.Guest] },
];

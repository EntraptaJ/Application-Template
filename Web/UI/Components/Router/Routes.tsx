// Web/UI/Components/Router/Routes.tsx
export interface Route {
  to: string;
  label: string;
}

export const Routes: Route[] = [
  { label: 'Home', to: '/' },
  { label: 'Test', to: '/Test' },
  { label: 'Example', to: '/Example' },
  { label: 'Lab', to: '/Lab' },
  { label: 'Login', to: '/Login' },
];

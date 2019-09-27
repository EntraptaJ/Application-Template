import { ImportedRouteInput } from './Route';

// Web/UI/Components/Router/AppRoutes.tsx

interface Import {
  imported: Promise<{ default: () => React.ReactElement }>;
  path: string;
}

export interface AppRoute {
  /**
   * Route Path for Router Route Component
   */
  path: string;

  /**
   * React Router Exact Path
   */
  exact?: boolean

  /**
   * The full path used for navigation, Links, etc...
   */
  to: string;

  /**
   * Public label for route
   */
  label: string;

  /**
   * Import of Module
   */
  imported?: ImportedRouteInput;

  /**
   * Sub routes
   */
  children?: AppRoute[];
}

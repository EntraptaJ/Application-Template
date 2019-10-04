// Web/UI/Components/Router/AppRoutes.tsx
import { ImportedRouteInput } from './Route';

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
  exact?: boolean;

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

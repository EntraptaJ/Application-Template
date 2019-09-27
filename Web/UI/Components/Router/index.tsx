// Web/UI/Components/Router/index.tsx
// UI/UI/Components/Router/index.tsx
import React, { ReactElement, PropsWithChildren } from 'react';
import { Switch, Route as RouteComponent } from 'react-router-dom';
import { useImport } from '../Providers/ImportProvider';

interface ImportedRouteInput {
  imported: Promise<{ default: any }>;
  path: string;
}

interface RouteProps {
  imported: ImportedRouteInput;
  path: string;
  exact: boolean;
}

function Route({
  imported,
  children,
  path,
  exact
}: PropsWithChildren<RouteProps>): React.ReactElement {
  const Component = useImport({
    ...imported,
    Loader: () => <div>Loading</div>
  });

  if (children)
    return <RouteComponent key={path} path={path} render={() => children} />;

  else return <RouteComponent exact={exact} key={path} path={path} component={Component} />
}

function AppRouter(): ReactElement {
  return (
    <Switch>
      <Route imported={{ imported: import('UI/Routes/Home'), path: 'Routes/Home/index.tsx' }} path={'/'} exact={true} />
    </Switch>
  );
}

export default AppRouter;

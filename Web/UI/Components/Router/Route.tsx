// Web/UI/Components/Router/Route.tsx
import React, { PropsWithChildren } from 'react';
import { Route as RouteComponent } from 'react-router-dom';
import { useImport } from '../Providers/ImportProvider';
import { Loader } from '../Styles/Loader';

export interface ImportedRouteInput {
  imported: Promise<{ default: () => React.ReactElement }>;
  path: string;
}

interface RouteProps {
  imported: ImportedRouteInput;
  path: string;
  exact?: boolean;
}

export function Route({
  imported,
  children,
  path,
  exact = false,
}: PropsWithChildren<RouteProps>): React.ReactElement {
  const Component = useImport({
    ...imported,
    Loader,
  });

  if (children)
    return (
      <RouteComponent
        path={path}
        render={() => (
          <>
            {' '}
            <RouteComponent
              key={path}
              path={`${path}/`}
              exact
              component={Component}
            />
            {children}
          </>
        )}
      />
    );

  return <RouteComponent exact={exact} path={path} component={Component} />;
}

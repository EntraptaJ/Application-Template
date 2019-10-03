// Web/UI/Components/Router/generateList.tsx
import React from 'react';
import { Route } from './Routes';
import { Link } from 'react-router-dom';
import { LabelListItem } from '../Styles/List/ListItems/LabelListItem';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';

export function generateList(
  routes: Route[],
  userRoles = [UserRole.Guest],
): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  for (const route of routes.filter(({ roles }) =>
    roles ? roles.every((role) => userRoles.includes(role)) : true,
  )) {
    elements.push(
      <LabelListItem
        key={route.to}
        component={Link}
        to={route.to}
        label={{ primary: route.label }}
      />,
    );
  }
  return elements;
}

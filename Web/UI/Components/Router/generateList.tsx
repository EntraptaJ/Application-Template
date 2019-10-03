// Web/UI/Components/Router/generateList.tsx
import React from 'react';
import { Route } from './Routes';
import { Link } from 'react-router-dom';
import { LabelListItem } from '../Styles/List/ListItems/LabelListItem';

export function generateList(routes: Route[]): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  for (const route of routes) {
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

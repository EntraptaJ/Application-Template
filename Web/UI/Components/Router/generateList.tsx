// Web/UI/Components/Router/generateList.tsx
import React from 'react'
import { AppRoute } from './AppRoute'
import { Link } from 'react-router-dom';

export function generateList(routes: AppRoute[]): React.ReactElement[] {
  const elements: React.ReactElement[] = []
  for (const route of routes) {
    elements.push(<Link key={route.to} to={route.to}>{route.label}</Link>)
  }
  return elements;
}
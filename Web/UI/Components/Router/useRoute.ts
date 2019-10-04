// Web/UI/Components/Router/useRoute.ts
import { useLocation } from 'react-router';
import { Routes, Route } from './Routes';
import { useMemo } from 'react';

export function useRoute(): Route | undefined {
  const { pathname } = useLocation();

  return useMemo(() => Routes.find(({ to }) => to === pathname), [pathname]);
}

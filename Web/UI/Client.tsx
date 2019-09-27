// Web/UI/Client.tsx
window.setImmediate = window.setTimeout;
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import prepass from 'react-ssr-prepass';
import {
  ImportItem,
  ImportProvider,
} from './Components/Providers/ImportProvider';

export let imports: ImportItem[] = [];

export function clearImports() {
  imports = [];
}

const render = async (
  renderFunction: import('react-dom').Renderer,
): Promise<void> => {
  const { App } = await import('UI/App');

  const Component = React.createElement(() => (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <App />
      </ImportProvider>
    </BrowserRouter>
  ));

  await prepass(Component);

  renderFunction(Component, document.getElementById('app'));
};

render(hydrate);

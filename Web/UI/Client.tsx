// Web/UI/Client.tsx
// @ts-ignore
window.setImmediate = window.setTimeout;
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { hydrate, render as ReactDOMRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import prepass from 'react-ssr-prepass';
import {
  ImportItem,
  ImportProvider,
} from './Components/Providers/ImportProvider';
import { App } from './App';

export let imports: ImportItem[] = [];

export function clearImports() {
  imports = [];
}

const render = async (
  renderFunction: import('react-dom').Renderer,
): Promise<void> => {

  const Component = React.createElement(() => (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ImportProvider>
    </BrowserRouter>
  ));

  await prepass(Component);

  renderFunction(Component, document.getElementById('app'));
};

render(hydrate);

const hot = module.hot;
if (hot && hot.accept) hot.accept(async () => render(ReactDOMRender));
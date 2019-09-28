// Web/UI/Client.tsx
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { hydrate, render as ReactDOMRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import prepass from 'react-ssr-prepass';
import {
  ImportItem,
  ImportProvider,
} from './Components/Providers/ImportProvider';
import { ConfigProvider } from './Components/Providers/ConfigProvider';
import { ApolloProvider } from './Components/Providers/ApolloProvider';

window.setImmediate = window.setTimeout;

export let imports: ImportItem[] = [];

async function render(
  renderFunction: import('react-dom').Renderer,
): Promise<void> {
  const { App } = await import('UI/App')

  const Component = React.createElement(() => (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <ConfigProvider {...window.APP_STATE.CONFIG}></ConfigProvider>
        <CookiesProvider>
          <ApolloProvider>
            <App />
          </ApolloProvider>
        </CookiesProvider>
      </ImportProvider>
    </BrowserRouter>
  ));



  await prepass(Component);

  renderFunction(Component, document.getElementById('app'));
}

render(hydrate);

const hot = module.hot;
if (hot && hot.accept) hot.accept(async () => render(ReactDOMRender));

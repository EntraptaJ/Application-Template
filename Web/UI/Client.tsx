// Web/UI/Client.tsx
import React, { useEffect, createElement } from 'react';
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
import { App } from './App';

window.setImmediate = window.setTimeout;

export let imports: ImportItem[] = [];

interface CoreAppProps {
  App: typeof import('./App').App;
}

function CoreApp({ App }: CoreAppProps): React.ReactElement {
  return (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <ConfigProvider {...window.APP_STATE.CONFIG}>
          <CookiesProvider>
            <ApolloProvider>
              <App />
            </ApolloProvider>
          </CookiesProvider>
        </ConfigProvider>
      </ImportProvider>
    </BrowserRouter>
  );
}

async function render(
  renderFunction: import('react-dom').Renderer,
): Promise<void> {
  const MainApp = createElement(() => <CoreApp App={App} />);

  await prepass(MainApp);
  for (const { promise } of imports) await promise;

  renderFunction(MainApp, document.getElementById('app'));
}

render(hydrate);

const hot = module.hot;
if (hot && hot.accept) hot.accept(async () => render(ReactDOMRender));

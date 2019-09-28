// Web/UI/Client.tsx
import React, { useEffect } from 'react';
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

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async function() {
      const worker = await navigator.serviceWorker.register(
        '/service-worker.ts',
        { scope: '/' },
      );
      console.log('SW registered: ', worker);
    });
  }
}

interface CoreAppProps {
  App: () => React.ReactElement;
}

function CoreApp({ App }: CoreAppProps): React.ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);

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
  const { App } = await import('UI/App');

  const Component = <CoreApp App={App} />;

  await prepass(Component);

  renderFunction(Component, document.getElementById('app'));
}

render(hydrate);

const hot = module.hot;
if (hot && hot.accept) hot.accept(async () => render(ReactDOMRender));

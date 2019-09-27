// Web/UI/Client.tsx
import React, { useMemo } from 'react';
import { hydrate, render as ReactDOMRender } from 'react-dom';
import {
  ImportProvider,
  ImportItem
} from './Components/Providers/ImportProvider';
import clearModule from 'clear-module';
import { usePromise } from './Components/Providers/usePromise';
import prepass from 'react-ssr-prepass';
import { BrowserRouter } from 'react-router-dom';

let imports: ImportItem[] = [];

async function CoreApp(): Promise<React.ReactElement> {
  const { App } = await import('UI/App');

  await prepass(    <BrowserRouter>
    <ImportProvider imports={imports}>
      <App />
    </ImportProvider>
  </BrowserRouter>)

  return (
    <BrowserRouter>
      <ImportProvider imports={imports}>
        <App />
      </ImportProvider>
    </BrowserRouter>
  );
}

function useAsyncReact(): React.ReactElement {
  const [Component, loading] = usePromise(CoreApp);

  return useMemo(() => {
    if (loading) return <></>;
    else return Component;
  }, [Component]);
}

function Core(): React.ReactElement {
  const Component = useAsyncReact();

  return Component;
}

const render = async (
  renderFunction: import('react-dom').Renderer
): Promise<void> => {
  renderFunction(<Core />, document.getElementById('app'));
};

render(hydrate);

const hot = (module as any).hot;
if (hot && hot.accept)
  hot.accept(async () => {
    clearModule('UI/App');
    imports = [];
    render(ReactDOMRender);
  });

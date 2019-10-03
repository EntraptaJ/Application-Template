// Web/Server/Server.tsx
import { getDataFromTree } from '@apollo/react-ssr';
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { readJSON } from 'fs-extra';
import { Context } from 'koa';
import React, { createElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import prepass from 'react-ssr-prepass';
import { AppConfiguration } from 'Server/Config';
import { renderHeadStream } from 'Server/Head';
import { renderScriptTags, Source, SourceType } from 'Server/Sources';
import { renderAppStateScriptStreams } from 'Server/State';
import { App } from 'UI/App';
import { ApolloProvider } from 'UI/Components/Providers/ApolloProvider';
import { ConfigProvider } from 'UI/Components/Providers/ConfigProvider';
import {
  ImportItem,
  ImportProvider,
} from 'UI/Components/Providers/ImportProvider';

const manifestFile = `dist/public/parcel-manifest.json`;

export async function uiServer(
  ctx: Context,
  config: AppConfiguration,
): Promise<void> {
  const cookies = ctx.request.universalCookies;
  ctx.respond = false;
  ctx.status = 200;
  ctx.res.write('<!doctype html>\n<html><head>');

  const [parcelManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
  ]);

  const initialSources: Source[] = [
    {
      type: SourceType.SCRIPT,
      src: parcelManifest['App.tsx'],
      preloadOnly: true,
    },

    {
      type: SourceType.STYLE,
      src:
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    },
    {
      type: SourceType.STYLE,
      src: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
  ];

  const imports: ImportItem[] = [];
  const context: StaticRouterContext = {};

  const sheets = new ServerStyleSheets();

  const cache = new InMemoryCache();

  const AppComponent = (
    <StaticRouter location={ctx.url} context={context}>
      <ImportProvider imports={imports}>
        <ConfigProvider {...config}>
          <CookiesProvider cookies={cookies}>
            <ApolloProvider cache={cache}>
              <App />
            </ApolloProvider>
          </CookiesProvider>
        </ConfigProvider>
      </ImportProvider>
    </StaticRouter>
  );

  const preRender = async () => {
    try {
      prepass(AppComponent, async (a, b) => {
        console.log(b, a);
      });
    } catch {
      console.log('HelloWorld');
    }
  };

  try {
    await preRender();
  } catch {}

  for (const importedItem of imports) {
    const { path, promise } = importedItem;
    initialSources.push({ type: SourceType.SCRIPT, src: parcelManifest[path] });
  }

  const appStream = renderToNodeStream(sheets.collect(AppComponent));
  try {
    await getDataFromTree(sheets.collect(AppComponent));
  } catch (e) {}

  const headStream = renderHeadStream({
    sources: initialSources,
  });

  const scriptStream = renderScriptTags({ sources: initialSources });

  headStream.pipe(
    ctx.res,
    { end: false },
  );

  headStream.on('end', async () => {
    ctx.res.write(`<style
    id="jss-server-side"
  >${sheets.toString()}</style>`);
    ctx.res.write('</head><body><div id="app">');
    appStream.pipe(
      ctx.res,
      { end: false },
    );
  });

  appStream.on('end', () => {
    ctx.res.write('</div>');
    const stateScriptStream = renderAppStateScriptStreams({
      CONFIG: config,
      PROPS: {},
      APOLLO_STATE: cache.extract(),
    });

    stateScriptStream.pipe(
      ctx.res,
      { end: false },
    );

    stateScriptStream.on('end', () => {
      scriptStream.pipe(
        ctx.res,
        { end: false },
      );
    });
  });

  scriptStream.on('end', () => ctx.res.end('</body></html>'));
}

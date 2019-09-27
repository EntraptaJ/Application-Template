// Web/Server/Server.tsx
import { getDataFromTree } from '@apollo/react-ssr';
import { readJSON } from 'fs-extra';
import { Context } from 'koa';
import React, { createElement } from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { App } from 'UI/App';
import {
  ImportItem,
  ImportProvider,
} from 'UI/Components/Providers/ImportProvider';
import { renderHeadStream } from './Head';
import { renderScriptTags, Source, SourceType } from './Sources';
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
import prepass from 'react-ssr-prepass';

const manifestFile = `dist/public/parcel-manifest.json`;

export async function uiServer(ctx: Context): Promise<void> {
  ctx.respond = false;
  ctx.status = 200;
  ctx.res.write('<!doctype html>\n<html>');

  const [parcelManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
  ]);

  const initialSources: Source[] = [
    { type: SourceType.SCRIPT, src: parcelManifest['Client.tsx'] },
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

  const AppComponent = createElement(() => (
    <StaticRouter location={ctx.url} context={context}>
      <ImportProvider imports={imports}>
        <App />
      </ImportProvider>
    </StaticRouter>
  ));

  await prepass(AppComponent);

  for (const importedItem of imports) {
    const { path } = importedItem;
    initialSources.push({ type: SourceType.SCRIPT, src: parcelManifest[path] });
  }

  const appStream = renderToNodeStream(AppComponent);
  renderToString(sheets.collect(AppComponent));
  const headStream = renderHeadStream({ sources: initialSources, sheets });

  const scriptStream = renderScriptTags({ sources: initialSources });

  headStream.pipe(
    ctx.res,
    { end: false },
  );

  headStream.on('end', async () => {
    ctx.res.write('<body><div id="app">');
    appStream.pipe(
      ctx.res,
      { end: false },
    );
  });

  appStream.on('end', () => {
    ctx.res.write('</div>');
    scriptStream.pipe(
      ctx.res,
      { end: false },
    );
  });

  scriptStream.on('end', () => ctx.res.end('</body></html>'));
}

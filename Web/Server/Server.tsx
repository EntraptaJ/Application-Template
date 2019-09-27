// Web/Server/Server.tsx
import { getDataFromTree } from '@apollo/react-ssr';
import { readJSON } from 'fs-extra';
import { Context } from 'koa';
import React, { createElement } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { App } from 'UI/App';
import { ImportItem, ImportProvider } from 'UI/Components/Providers/ImportProvider';
import { renderHeadStream } from './Head';
import { renderScriptTags, Source, SourceType } from './Sources';

const manifestFile = `dist/public/parcel-manifest.json`;

const timeout = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function uiServer(ctx: Context): Promise<void> {
  ctx.respond = false;
  ctx.status = 200;
  ctx.res.write('<!doctype html>\n<html>');

  const [parcelManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>
  ]);

  const initialSources: Source[] = [
    { type: SourceType.SCRIPT, src: parcelManifest['Client.tsx'] }
  ];

  const imports: ImportItem[] = [];
  const context: StaticRouterContext = {};

  const AppComponent = createElement(() => (
    <StaticRouter location={ctx.url} context={context}>
      <ImportProvider imports={imports}>
        <App />
      </ImportProvider>
    </StaticRouter>
  ));

  await getDataFromTree(AppComponent);

  for (const importedItem of imports) {
    const { path } = importedItem;
    initialSources.push({ type: SourceType.SCRIPT, src: parcelManifest[path] });
  }

  const headStream = renderHeadStream({ sources: initialSources });
  const appStream = renderToNodeStream(AppComponent);

  const scriptStream = renderScriptTags({ sources: initialSources });

  headStream.pipe(
    ctx.res,
    { end: false }
  );

  headStream.on('end', async () => {
    ctx.res.write('<body><div id="app">');
    appStream.pipe(
      ctx.res,
      { end: false }
    );
  });

  appStream.on('end', () => {
    ctx.res.write('</div>');
    scriptStream.pipe(
      ctx.res,
      { end: false }
    );
  });

  scriptStream.on('end', () => ctx.res.end('</body></html>'));
}

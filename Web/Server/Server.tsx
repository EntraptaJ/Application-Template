// Web/Server/Server.tsx
import React from 'react'
import { Context } from 'koa'
import { renderToNodeStream } from 'react-dom/server'
import { readJSON } from 'fs-extra'
import { App } from 'UI/App'

const manifestFile = `dist/public/parcel-manifest.json`;

export async function uiServer(ctx: Context): Promise<void> {
  ctx.respond = false
  ctx.res.write('<!doctype html>\n<html>');

  const [parcelManifest] = await Promise.all([readJSON(manifestFile) as Promise<{ [key: string]: string }>])

  const appStream = renderToNodeStream(<><App /></>)

  appStream.pipe(
    ctx.res,
    { end: false }
  );

  appStream.on('end', () => ctx.res.end())


}
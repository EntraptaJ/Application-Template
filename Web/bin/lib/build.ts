// Web/bin/lib/build.ts
import { copy, mkdir, remove, writeJSON, pathExists } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';

export const build = async (watch: boolean = false): Promise<void> => {
  await remove('dist');
  await mkdir('dist');

  if (await pathExists('public')) await copy('public', 'dist/public');

  await Promise.all([copy('package.json', 'dist/package.json'), copy('package-lock.json', 'dist/package-lock.json')]);

  process.env['BABEL_ENV'] = 'client';
  const bundler = new ParcelBundler('UI/Client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    sourceMaps: false,
    cache: false
  });

  await bundler.bundle();
  
  process.env['BABEL_ENV'] = 'server';
  const serverBundler = new ParcelBundler(['Server/index.ts', 'Server/Server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: true,
    sourceMaps: false,
    cache: false
  });


  await serverBundler.bundle()
}
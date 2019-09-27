// Web/Server/Sources.tsx
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'

export enum SourceType {
  SCRIPT = 'script',
  STYLE = 'style'
}

export interface Source {
  type: SourceType
  src: string
}

interface ScriptTagsProps {
  sources: Source[];
}


export function ScriptTags({ sources }: ScriptTagsProps): React.ReactElement {
  return (
    <>
      {sources
        .filter(({ type }) => type === SourceType.SCRIPT)
        .reverse()
        .map(({ src }, index) => (
          <script async type='text/javascript' key={index} src={src} />
        ))}
    </>
  );
}

export function renderScriptTags(props: ScriptTagsProps): NodeJS.ReadableStream {
  return renderToNodeStream(<ScriptTags {...props} />)
}
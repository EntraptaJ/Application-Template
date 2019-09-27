// Web/Server/Head.tsx
import React from 'react'
import { Source } from './Sources'
import { renderToStaticNodeStream } from 'react-dom/server'

interface HeadProps {
  sources: Source[];
}

export function Head({ sources }: HeadProps): React.ReactElement {
  return (
    <head>
      <title>Hello World</title>
      {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
    </head>
  )
}

export function renderHeadStream(props: HeadProps): NodeJS.ReadableStream {
  return renderToStaticNodeStream(<Head {...props} />)
}
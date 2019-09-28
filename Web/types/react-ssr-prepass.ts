declare module 'react-ssr-prepass' {
  import { ReactElement } from 'react'

  export default function (component: ReactElement): void
}
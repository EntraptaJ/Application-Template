// Web/UI/Routes/Lab/index.tsx
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { BaseList } from 'UI/Components/Styles/List/BaseList'

export default function LabRoute(): React.ReactElement {
  return (
    <>
      <Typography variant='h1'>Labs</Typography>

      <BaseList subheader={{ title: 'Hello World' }}></BaseList>
    </>
  )
}
'use client'

import { MantineProvider } from '@mantine/core'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <MantineProvider>{children}</MantineProvider>
}

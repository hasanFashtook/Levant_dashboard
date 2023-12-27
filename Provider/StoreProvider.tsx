'use client'
import { Provider } from 'react-redux'
import { store } from '../src/lib/Store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
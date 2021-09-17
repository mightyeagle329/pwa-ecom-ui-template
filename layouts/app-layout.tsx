import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import type { InsightsClient } from 'search-insights'

import { configAtom } from '@/config/config'
import { useSearchClient } from '@/hooks/useSearchClient'
import { useSearchInsights } from '@/hooks/useSearchInsights'
import { MediaContextProvider } from '@/lib/media'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)
export const searchInsightsAtom = atom<InsightsClient | undefined>(undefined)

export function AppLayout({ children }: AppLayoutProps) {
  const { setUserToken } = useAtomValue(configAtom)

  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })
  const { searchInsights } = useSearchInsights({
    appId,
    searchApiKey,
    setUserToken,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)
  set(searchInsightsAtom, searchInsights)

  return (
    <JotaiProvider initialValues={get()}>
      <MediaContextProvider>
        <LazyMotion features={loadFramerMotionFeatures} strict={true}>
          {children}
        </LazyMotion>
      </MediaContextProvider>
    </JotaiProvider>
  )
}

import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { useAtom } from 'jotai'

import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { ClientOnly } from '@/components/client-only/client-only'
import { refinementsPanelDesktopExpandedAtom } from '@/components/refinements-panel/refinements-panel'

export function ToggleFilters() {
  // 'desktopExpanded' is only available in localStorage (client-side only)
  const [desktopExpanded, setDesktopExpanded] = useAtom(
    refinementsPanelDesktopExpandedAtom
  )

  return (
    <ClientOnly>
      <Button
        className="flex items-center gap-2 flex-shrink-0 text-neutral-darkest"
        onClick={() => setDesktopExpanded((expanded) => !expanded)}
      >
        <IconLabel
          icon={FilterIcon}
          label={`${desktopExpanded ? 'Hide' : 'Show'} filters`}
          labelPosition="left"
          labelTheme="body-regular"
          classNameIcon="w-4 h-4"
        />
      </Button>
    </ClientOnly>
  )
}

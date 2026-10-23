import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
  attribute: 'data-theme',
  initialValue: 'dark',
  storageKey: 'skypro-kanban-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleTheme = useToggle(isDark)
export function useTheme() {
  return { isDark, toggleTheme }
}
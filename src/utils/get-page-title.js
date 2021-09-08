import defaultSettings from '@/settings'

const title = defaultSettings.title || 'AMMIC'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

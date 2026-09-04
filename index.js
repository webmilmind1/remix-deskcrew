import { createElement } from 'react'
import { buildAttrs } from './build-tag.js'

/**
 * <DeskCrewWidget widgetKey="pub_..." /> next to <Scripts /> in app/root.tsx.
 * Renders one plain <script defer> element, server and client alike.
 *
 * @param {import('./index.js').DeskcrewOptions} props
 */
export function DeskCrewWidget(props) {
  const { attrs, warnings } = buildAttrs(props)
  for (const message of warnings) console.warn(message)
  if (!attrs) return null
  const scriptProps = { defer: true }
  for (const [name, value] of attrs) scriptProps[name] = value
  return createElement('script', scriptProps)
}

export default DeskCrewWidget
export { buildTag } from './build-tag.js'

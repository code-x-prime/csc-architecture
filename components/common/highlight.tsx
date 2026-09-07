/**
 * Tints the `highlight` substring of a heading with the brand accent. Falls
 * back to the plain title when the substring is absent, so copy edits never
 * break the render.
 */
export function Highlight({
  text,
  highlight,
  className = 'text-primary',
}: {
  text: string
  highlight?: string
  className?: string
}) {
  if (!highlight) return <>{text}</>
  const at = text.indexOf(highlight)
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  )
}

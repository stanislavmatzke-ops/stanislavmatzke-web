/**
 * Minimal inline formatting for article text – parsed into segments, never rendered as HTML:
 *   **bold**              → <strong>
 *   [link text](slug)     → link to another article by its slug
 */
export interface InlineSegment {
  kind: 'text' | 'bold' | 'link';
  text: string;
  slug?: string;
}

const PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([a-z0-9-]+)\)/g;
const cache = new Map<string, InlineSegment[]>();

export function parseInline(text: string): InlineSegment[] {
  const cached = cache.get(text);
  if (cached) return cached;

  const segments: InlineSegment[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const at = m.index ?? 0;
    if (at > last) segments.push({ kind: 'text', text: text.slice(last, at) });
    if (m[1] !== undefined) segments.push({ kind: 'bold', text: m[1] });
    else segments.push({ kind: 'link', text: m[2], slug: m[3] });
    last = at + m[0].length;
  }
  if (last < text.length) segments.push({ kind: 'text', text: text.slice(last) });

  cache.set(text, segments);
  return segments;
}

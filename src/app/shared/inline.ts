/**
 * Minimal inline formatting for content text – parsed into segments, never rendered as HTML:
 *   **bold**              → <strong>
 *   *italics*             → <em>
 *   `code`                → <code>
 *   [text](/path)         → link to a page of this web (router link)
 *   [text](https://…)     → external link (new tab)
 *   [text](mailto:…), [text](tel:…) → e-mail / phone link
 *   [text](slug)          → link to an article by its slug (older texts)
 */
export interface InlineSegment {
  kind: 'text' | 'bold' | 'em' | 'code' | 'link' | 'external' | 'contact';
  text: string;
  /** Router path (kind 'link'), URL (kind 'external') or an article slug (kind 'link' with slug). */
  href?: string;
  slug?: string;
}

const PATTERN = /\*\*(.+?)\*\*|\*([^*\s](?:[^*]*?[^*\s])?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
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
    else if (m[2] !== undefined) segments.push({ kind: 'em', text: m[2] });
    else if (m[3] !== undefined) segments.push({ kind: 'code', text: m[3] });
    else {
      const href = m[5];
      if (/^(mailto|tel):/.test(href)) segments.push({ kind: 'contact', text: m[4], href });
      else if (/^https?:\/\//.test(href)) segments.push({ kind: 'external', text: m[4], href });
      else if (href.startsWith('/')) segments.push({ kind: 'link', text: m[4], href });
      else segments.push({ kind: 'link', text: m[4], slug: href });
    }
    last = at + m[0].length;
  }
  if (last < text.length) segments.push({ kind: 'text', text: text.slice(last) });

  cache.set(text, segments);
  return segments;
}

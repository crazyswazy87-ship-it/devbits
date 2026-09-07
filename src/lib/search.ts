import type { ComponentEntry } from "../types"

export function searchComponents(entries: ComponentEntry[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return entries

  return entries
    .map((entry) => {
      const haystacks = [
        { text: entry.name.toLowerCase(), weight: 3 },
        { text: entry.category.toLowerCase(), weight: 2 },
        { text: entry.tagline.toLowerCase(), weight: 1.5 },
        { text: entry.description.toLowerCase(), weight: 1 },
      ]
      let score = 0
      for (const { text, weight } of haystacks) {
        if (text === q) score += 10 * weight
        else if (text.startsWith(q)) score += 5 * weight
        else if (text.includes(q)) score += 2 * weight
      }
      return { entry, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry)
}

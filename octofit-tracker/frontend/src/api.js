export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error || 'Unable to load this collection.')
  return getCollection(payload)
}

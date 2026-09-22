import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setActivities).then(() => setState('ready')).catch((requestError) => {
      if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') }
    })
    return () => controller.abort()
  }, [])

  return <CollectionPage title="Activities" kicker="Movement log" description="A clear view of every completed session." state={state} error={error}>
    <div className="table-wrap"><table className="table data-table"><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead><tbody>
      {activities.map((activity) => <tr key={activity._id}><td><strong>{activity.user?.name || activity.user || 'Unknown athlete'}</strong></td><td className="capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : '—'}</td><td><span className="score">+{activity.points}</span></td></tr>)}
    </tbody></table></div>
  </CollectionPage>
}

export function CollectionPage({ title, kicker, description, state, error, children }) {
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="page-description">{description}</p></div><div className="count-badge">{state === 'loading' ? '...' : state === 'error' ? '!' : 'Ready'}</div></div>{state === 'loading' && <div className="empty-state">Loading your data...</div>}{state === 'error' && <div className="empty-state error-state">{error}</div>}{state === 'ready' && children}</section>
}

export default Activities
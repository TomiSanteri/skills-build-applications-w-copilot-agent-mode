import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Activities.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setEntries).then(() => setState('ready')).catch((requestError) => {
      if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') }
    })
    return () => controller.abort()
  }, [])

  return <CollectionPage title="Leaderboard" kicker="Friendly competition" description="Celebrate the people putting in the work." state={state} error={error}><div className="leaderboard-list">
    {entries.map((entry, index) => <article className="leader-row" key={entry.user?._id || entry._id || index}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><div className="avatar">{(entry.user?.name || entry.name || '?').slice(0, 1).toUpperCase()}</div><div className="leader-name"><strong>{entry.user?.name || entry.name || 'Unknown athlete'}</strong><span>{entry.activities || 0} activities</span></div><strong className="leader-points">{entry.points || 0}<small> pts</small></strong></article>)}
  </div></CollectionPage>
}

export default Leaderboard
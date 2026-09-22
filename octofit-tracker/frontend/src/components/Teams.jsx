import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Activities.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(endpoint, controller.signal).then(setTeams).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <CollectionPage title="Teams" kicker="Find your people" description="Groups that make consistency more fun." state={state} error={error}><div className="card-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-swatch" style={{ backgroundColor: team.color || '#ed6a5a' }} /><h2>{team.name}</h2><p>{team.members?.length || 0} members</p><div className="member-stack">{(team.members || []).slice(0, 4).map((member) => <span className="avatar small" key={member._id}>{member.name?.slice(0, 1).toUpperCase() || '?'}</span>)}</div></article>)}</div></CollectionPage>
}

export default Teams
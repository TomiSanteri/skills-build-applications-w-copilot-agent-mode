import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Activities.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(endpoint, controller.signal).then(setUsers).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <CollectionPage title="Users" kicker="Your community" description="The athletes showing up and getting stronger." state={state} error={error}><div className="table-wrap"><table className="table data-table"><thead><tr><th>Name</th><th>Email</th><th>Grade</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td><div className="user-cell"><span className="avatar small">{user.name?.slice(0, 1).toUpperCase() || '?'}</span><strong>{user.name}</strong></div></td><td>{user.email}</td><td>{user.grade || '—'}</td></tr>)}</tbody></table></div></CollectionPage>
}

export default Users
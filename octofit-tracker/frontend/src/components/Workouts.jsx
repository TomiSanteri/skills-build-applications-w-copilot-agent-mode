import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Activities.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(endpoint, controller.signal).then(setWorkouts).then(() => setState('ready')).catch((requestError) => { if (requestError.name !== 'AbortError') { setError(requestError.message); setState('error') } }); return () => controller.abort() }, [])
  return <CollectionPage title="Workouts" kicker="Your next challenge" description="Thoughtful sessions for wherever you are today." state={state} error={error}><div className="card-grid workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-meta"><span className="level-tag">{workout.level}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer>{workout.activityType}</footer></article>)}</div></CollectionPage>
}

export default Workouts
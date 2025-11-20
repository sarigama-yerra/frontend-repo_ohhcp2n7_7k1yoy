import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailsPage from './components/DetailsPage'
import LiveChannelsPage from './components/LiveChannelsPage'
import PlayerPage from './components/PlayerPage'

function App(){
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/detalhes/:id" element={<DetailsPage/>} />
      <Route path="/canais" element={<LiveChannelsPage/>} />
      <Route path="/player/:id" element={<PlayerPage/>} />
      <Route path="/player/live/:liveId" element={<PlayerPage/>} />
    </Routes>
  )
}

export default App

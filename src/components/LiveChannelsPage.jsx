import { useEffect, useRef, useState } from 'react'
import Layout from './Layout'

const api = import.meta.env.VITE_BACKEND_URL || ''

export default function LiveChannelsPage(){
  const [channels, setChannels] = useState([])
  const click = useRef(null)

  useEffect(()=>{
    fetch(`${api}/channels`).then(r=>r.json()).then(setChannels).catch(()=>{})
  },[])

  const openChannel = (ch)=>{
    const a = click.current; if(a){ a.currentTime=0; a.play().catch(()=>{}) }
    window.location.href = `/player/live/${ch.id}`
  }

  return (
    <Layout>
      <audio ref={click} src="/sounds/click.mp3" preload="auto"/>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-4">Canais ao Vivo</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {channels.map(ch => (
            <button key={ch.id} onClick={()=>openChannel(ch)} className="bg-white/5 hover:bg-white/10 transition rounded-lg overflow-hidden border border-white/10 text-left">
              <img src={ch.thumb} alt={ch.name} className="w-full h-28 object-cover" />
              <div className="p-3">
                <p className="font-medium">{ch.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}

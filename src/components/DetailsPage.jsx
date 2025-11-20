import { useEffect, useRef, useState } from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'

const api = import.meta.env.VITE_BACKEND_URL || ''

export default function DetailsPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const openAudio = useRef(null)

  useEffect(() => {
    fetch(`${api}/item/${id}`).then(r => r.json()).then(setItem).catch(()=>{})
  }, [id])

  const onWatch = () => {
    const a = openAudio.current
    if (a) { a.currentTime = 0; a.play().catch(()=>{}) }
    window.location.href = `/player/${id}`
  }

  if (!item) return <Layout><div className="p-6">Carregando...</div></Layout>

  return (
    <Layout>
      <audio ref={openAudio} src="/sounds/open.mp3" preload="auto"/>
      <div className="relative w-full h-56 md:h-80">
        <img src={item.banner} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold">{item.title}</h1>
          <p className="mt-2 text-white/80">{item.synopsis}</p>
          <div className="mt-4 text-sm">
            <span className="text-white/60">Elenco:</span> {item.cast?.join(', ')}
          </div>
          {item.seasons?.length > 0 && (
            <div className="mt-4">
              <span className="text-white/60 text-sm">Temporadas:</span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {item.seasons.map((s) => (
                  <span key={s.number} className="px-3 py-1 rounded-full bg-white/10 text-sm">T{s.number} · {s.episodes} eps</span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <button onClick={onWatch} className="bg-[#FF0000] hover:bg-red-600 transition px-5 py-3 rounded-lg font-semibold">Assistir Agora</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

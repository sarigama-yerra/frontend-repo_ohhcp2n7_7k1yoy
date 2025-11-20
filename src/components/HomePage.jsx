import { useEffect, useState, useRef } from 'react'
import Layout from './Layout'

const api = import.meta.env.VITE_BACKEND_URL || ''

function Row({ title, items = [], onSelect }) {
  return (
    <section className="px-6 max-w-7xl mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
        {items.map((it) => (
          <button
            key={it.id || it._id}
            onClick={() => onSelect(it)}
            className="snap-start min-w-[160px] w-[160px] bg-white/5 hover:bg-white/10 transition rounded-lg overflow-hidden border border-white/10"
          >
            <img src={it.thumb} alt={it.title || it.name} className="w-full h-24 object-cover" />
            <div className="p-2 text-left">
              <p className="text-sm line-clamp-1">{it.title || it.name}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [data, setData] = useState({ novelas: [], series: [], filmes: [], programas: [], canais: [] })
  const clickAudio = useRef(null)

  useEffect(() => {
    fetch(`${api}/home`).then(r => r.json()).then(setData).catch(()=>{})
  }, [])

  const handleSelect = (it) => {
    const audio = clickAudio.current
    if (audio) { audio.currentTime = 0; audio.play().catch(()=>{}) }
    if (it.type) {
      window.location.href = `/detalhes/${it.id}`
    }
  }

  return (
    <Layout withHero>
      <audio ref={clickAudio} src="/sounds/click.mp3" preload="auto"/>
      <Row title="Novelas" items={data.novelas} onSelect={handleSelect} />
      <Row title="Séries" items={data.series} onSelect={handleSelect} />
      <Row title="Filmes" items={data.filmes} onSelect={handleSelect} />
      <Row title="Canais ao Vivo" items={data.canais} onSelect={(ch)=> window.location.href = `/canais`} />
      <Row title="Programas da Globo" items={data.programas} onSelect={handleSelect} />
    </Layout>
  )
}

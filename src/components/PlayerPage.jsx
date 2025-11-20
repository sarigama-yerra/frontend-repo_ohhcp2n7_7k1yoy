import { useEffect, useRef, useState } from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'

const api = import.meta.env.VITE_BACKEND_URL || ''

function Equalizer({ values, onChange }){
  const bands = [60, 170, 350, 1000, 3500, 10000]
  return (
    <div className="grid grid-cols-6 gap-2">
      {bands.map((b, i)=> (
        <div key={b} className="flex flex-col items-center">
          <input type="range" min="-12" max="12" value={values[i]}
            onChange={(e)=>onChange(i, parseInt(e.target.value))}
            className="appearance-none h-28 w-1 rotate-[-90deg] origin-left"/>
          <span className="text-[10px] mt-2">{b/1000>=1? `${b/1000}k` : b}Hz</span>
        </div>
      ))}
    </div>
  )
}

export default function PlayerPage(){
  const { id, liveId } = useParams()
  const [item, setItem] = useState(null)
  const [channels, setChannels] = useState([])
  const [volume, setVolume] = useState(0.8)
  const [eq, setEq] = useState([0,0,0,0,0,0])
  const [selectedAudio, setSelectedAudio] = useState('main')
  const startAudio = useRef(null)
  const audioRef = useRef(null)
  const altAudioRef = useRef(null)

  useEffect(()=>{
    if(id){
      fetch(`${api}/item/${id}`).then(r=>r.json()).then(setItem).catch(()=>{})
    }
  },[id])

  useEffect(()=>{
    if(liveId){
      fetch(`${api}/channels`).then(r=>r.json()).then(setChannels).catch(()=>{})
    }
  },[liveId])

  useEffect(()=>{
    const a = startAudio.current; if(a){ a.currentTime=0; a.play().catch(()=>{}) }
  },[])

  const onEqChange = (idx, val)=>{
    const next = [...eq]; next[idx]=val; setEq(next)
  }

  useEffect(()=>{
    const audios = [audioRef.current, altAudioRef.current]
    audios.forEach(a=>{ if(a){ a.volume = volume } })
  },[volume])

  const media = item || channels.find(c=>c.id===liveId) || null
  const audioTracks = item?.audio_tracks || []
  const isLive = Boolean(liveId)

  return (
    <Layout>
      <audio ref={startAudio} src="/sounds/play.mp3" preload="auto"/>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-xl font-bold mb-3">{media?.title || media?.name || 'Reprodução'}</h1>
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center">
            {/* Using native video for simplicity; browsers will negotiate Dolby when available via MSE */}
            {isLive ? (
              <video controls className="w-full h-full" src={media?.stream_url} />
            ) : (
              <video controls className="w-full h-full" src={item?.video_url} />
            )}
          </div>
          <div className="p-4 grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-white/70 mb-2">Volume</p>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e)=>setVolume(parseFloat(e.target.value))} className="w-full"/>
              <p className="text-xs text-white/50 mt-1">Estéreo • Ajuste o volume geral</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-2">Equalizador básico</p>
              <Equalizer values={eq} onChange={onEqChange} />
              <p className="text-xs text-white/50 mt-1">Ajustes visuais (decorativos). Para processamento real de áudio, usar WebAudio API.</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-2">Faixas de áudio</p>
              {isLive ? (
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="audio" checked={selectedAudio==='main'} onChange={()=>setSelectedAudio('main')} />
                    Principal
                  </label>
                  {media?.alt_audio_url && (
                    <label className="flex items-center gap-2">
                      <input type="radio" name="audio" checked={selectedAudio==='alt'} onChange={()=>setSelectedAudio('alt')} />
                      Áudio alternativo (ex: audiodescrição)
                    </label>
                  )}
                  {/* Hidden audio elements to simulate alternate audio track */}
                  <audio ref={audioRef} src={media?.stream_url} className="hidden" />
                  {media?.alt_audio_url && <audio ref={altAudioRef} src={media?.alt_audio_url} className="hidden" />}
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="audio" checked={selectedAudio==='main'} onChange={()=>setSelectedAudio('main')} />
                    Padrão
                  </label>
                  {audioTracks.map((t, i)=> (
                    <label key={i} className="flex items-center gap-2">
                      <input type="radio" name="audio" checked={selectedAudio===`alt-${i}`} onChange={()=>setSelectedAudio(`alt-${i}`)} />
                      {t.label} • {t.channels}
                    </label>
                  ))}
                </div>
              )}
              <p className="text-xs text-white/50 mt-2">Dolby Digital será utilizado quando disponível pelo navegador/stream.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

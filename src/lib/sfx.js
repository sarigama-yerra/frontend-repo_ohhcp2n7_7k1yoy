let ctx
function getCtx(){
  if(!ctx){
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    ctx = new AudioCtx()
  }
  return ctx
}

export function playClick(){
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(800, ac.currentTime)
  gain.gain.setValueAtTime(0.0001, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.3, ac.currentTime + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.06)
  osc.connect(gain).connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + 0.07)
}

export function playOpen(){
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(420, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(640, ac.currentTime + 0.18)
  gain.gain.setValueAtTime(0.0001, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.22)
  osc.connect(gain).connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + 0.23)
}

export function playStart(){
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(440, ac.currentTime + 0.3)
  gain.gain.setValueAtTime(0.0001, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.3, ac.currentTime + 0.05)
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.4)
  osc.connect(gain).connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + 0.42)
}

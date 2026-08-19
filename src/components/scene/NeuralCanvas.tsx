'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Node {
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
  seed: number
  radius: number
  connections: number[]
  cluster: number
}

interface Pulse {
  fromIdx: number
  toIdx: number
  t: number
  speed: number
}

interface Cluster {
  cx: number
  cy: number
  count: number
  spread: number
}

const CLUSTER_COUNT = 5
const NODES_PER_CLUSTER = [7, 8, 6, 7, 5] // total ~33 nodes
const EDGE_COLOR = [0.22, 0.48, 0.88]
const EDGE_ACTIVE_COLOR = [0.45, 0.75, 1.0]
const NODE_COLOR = [0.16, 0.42, 0.95]
const NODE_ACTIVE_COLOR = [0.55, 0.8, 1.0]
const NODE_DIM_COLOR = [0.12, 0.18, 0.32]
const CURSOR_RADIUS = 120
const MAX_CONNECTIONS_PER_NODE = 3

function createClusters(w: number, h: number): Cluster[] {
  const clusters: Cluster[] = []
  const padding = 0.15
  // Place clusters intentionally — avoid center-left where headline sits
  const positions = [
    { x: 0.68, y: 0.28 }, // top-right
    { x: 0.78, y: 0.55 }, // right-mid
    { x: 0.58, y: 0.72 }, // bottom-center-right
    { x: 0.88, y: 0.38 }, // far right top
    { x: 0.72, y: 0.82 }, // bottom right
  ]
  for (let i = 0; i < CLUSTER_COUNT; i++) {
    const p = positions[i]
    clusters.push({
      cx: w * (p.x + (Math.random() - 0.5) * padding),
      cy: h * (p.y + (Math.random() - 0.5) * padding),
      count: NODES_PER_CLUSTER[i],
      spread: 40 + Math.random() * 30,
    })
  }
  return clusters
}

function generateNodes(w: number, h: number): Node[] {
  const clusters = createClusters(w, h)
  const nodes: Node[] = []

  for (let c = 0; c < clusters.length; c++) {
    const cl = clusters[c]
    for (let i = 0; i < cl.count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * cl.spread
      const x = cl.cx + Math.cos(angle) * dist
      const y = cl.cy + Math.sin(angle) * dist
      nodes.push({
        homeX: x,
        homeY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        seed: Math.random() * Math.PI * 2,
        radius: 1.5 + Math.random() * 1.2,
        connections: [],
        cluster: c,
      })
    }
  }

  // Create sparse connections within clusters (1-3 per node)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    if (a.connections.length >= MAX_CONNECTIONS_PER_NODE) continue

    // Find nearest nodes in same or adjacent cluster
    const candidates: { idx: number; dist: number }[] = []
    for (let j = i + 1; j < nodes.length; j++) {
      if (a.connections.length >= MAX_CONNECTIONS_PER_NODE) break
      const b = nodes[j]
      if (b.connections.length >= MAX_CONNECTIONS_PER_NODE) continue
      const dx = a.homeX - b.homeX
      const dy = a.homeY - b.homeY
      const dist = Math.sqrt(dx * dx + dy * dy)
      // Only connect if reasonably close and prefer same cluster
      const sameCluster = a.cluster === b.cluster
      const maxDist = sameCluster ? 140 : 180
      if (dist < maxDist) {
        candidates.push({ idx: j, dist })
      }
    }
    // Sort by distance, take closest
    candidates.sort((p, q) => p.dist - q.dist)
    const take = Math.min(MAX_CONNECTIONS_PER_NODE - a.connections.length, candidates.length, 2)
    for (let k = 0; k < take; k++) {
      const j = candidates[k].idx
      a.connections.push(j)
      nodes[j].connections.push(i)
    }
  }

  return nodes
}

export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const pulsesRef = useRef<Pulse[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const smoothMouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const activeRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0 })

  const initNodes = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    sizeRef.current = { w: rect.width, h: rect.height }
    nodesRef.current = generateNodes(rect.width, rect.height)
    pulsesRef.current = []
  }, [])

  useEffect(() => {
    initNodes()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    canvas.addEventListener('touchend', onLeave)

    const io = new IntersectionObserver(([entry]) => {
      activeRef.current = entry.isIntersecting
    })
    io.observe(canvas)

    const onVis = () => {
      activeRef.current = !document.hidden
    }
    document.addEventListener('visibilitychange', onVis)

    const onResize = () => {
      initNodes()
    }
    window.addEventListener('resize', onResize)

    let lastTime = performance.now()

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw)

      if (!activeRef.current) return

      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const { w, h } = sizeRef.current
      if (w === 0) return

      const dpr = Math.min(window.devicePixelRatio, 2)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current
      const t = now * 0.001

      // Smooth cursor interpolation
      const sm = smoothMouseRef.current
      const m = mouseRef.current
      sm.x += (m.x - sm.x) * 0.04
      sm.y += (m.y - sm.y) * 0.04

      // Update node positions — very subtle drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const driftX = Math.sin(t * 0.15 + n.seed) * 0.12
        const driftY = Math.cos(t * 0.12 + n.seed * 1.7) * 0.1
        const returnX = (n.homeX - n.x) * 0.008
        const returnY = (n.homeY - n.y) * 0.008
        n.vx = (n.vx + driftX + returnX) * 0.92
        n.vy = (n.vy + driftY + returnY) * 0.92
        n.x += n.vx * dt * 60 * 0.3
        n.y += n.vy * dt * 60 * 0.3

        // Subtle cursor attraction (not repulsion) for nearby nodes
        const dx = sm.x - n.x
        const dy = sm.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 1) {
          const d = Math.sqrt(d2)
          const pull = (1 - d / CURSOR_RADIUS) * 0.15
          n.vx += (dx / d) * pull * dt * 60
          n.vy += (dy / d) * pull * dt * 60
        }
      }

      // Draw connections (static, pre-computed)
      ctx.lineCap = 'round'
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let c = 0; c < a.connections.length; c++) {
          const j = a.connections[c]
          if (j <= i) continue // avoid duplicates
          const b = nodes[j]

          const abx = b.x - a.x
          const aby = b.y - a.y
          const dist = Math.sqrt(abx * abx + aby * aby)

          // Check if either node is near cursor
          const aNearCursor =
            (sm.x - a.x) ** 2 + (sm.y - a.y) ** 2 < CURSOR_RADIUS * CURSOR_RADIUS
          const bNearCursor =
            (sm.x - b.x) ** 2 + (sm.y - b.y) ** 2 < CURSOR_RADIUS * CURSOR_RADIUS
          const active = aNearCursor || bNearCursor

          const alpha = Math.max(0, 0.12 - dist * 0.0003) * (active ? 2.5 : 1)
          const col = active ? EDGE_ACTIVE_COLOR : EDGE_COLOR

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)},${alpha.toFixed(3)})`
          ctx.lineWidth = active ? 0.8 : 0.5
          ctx.stroke()
        }
      }

      // Draw cursor connection (only 1-2 nearest nodes)
      if (sm.x > 0 && sm.x < w && sm.y > 0 && sm.y < h) {
        const nearest: { idx: number; dist: number }[] = []
        for (let i = 0; i < nodes.length; i++) {
          const dx = sm.x - nodes[i].x
          const dy = sm.y - nodes[i].y
          const d2 = dx * dx + dy * dy
          if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
            nearest.push({ idx: i, dist: d2 })
          }
        }
        nearest.sort((a, b) => a.dist - b.dist)
        const take = Math.min(2, nearest.length)

        for (let k = 0; k < take; k++) {
          const n = nodes[nearest[k].idx]
          const fade = 1 - Math.sqrt(nearest[k].dist) / CURSOR_RADIUS
          const alpha = fade * 0.25
          ctx.beginPath()
          ctx.moveTo(sm.x, sm.y)
          ctx.lineTo(n.x, n.y)
          ctx.strokeStyle = `rgba(130,200,255,${alpha.toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }

        // Spawn occasional pulse along cursor connections
        if (Math.random() < 0.02 && nearest.length > 0) {
          const target = nodes[nearest[0].idx]
          pulsesRef.current.push({
            fromIdx: -1,
            toIdx: nearest[0].idx,
            t: 0,
            speed: 0.6 + Math.random() * 0.4,
          })
        }
      }

      // Draw signal pulses along edges
      const pulses = pulsesRef.current
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pu = pulses[p]
        pu.t += dt * pu.speed

        if (pu.t >= 1) {
          pulses.splice(p, 1)
          continue
        }

        let sx: number, sy: number, ex: number, ey: number
        if (pu.fromIdx === -1) {
          // From cursor
          sx = sm.x
          sy = sm.y
          ex = nodes[pu.toIdx].x
          ey = nodes[pu.toIdx].y
        } else {
          sx = nodes[pu.fromIdx].x
          sy = nodes[pu.fromIdx].y
          ex = nodes[pu.toIdx].x
          ey = nodes[pu.toIdx].y
        }

        const px = sx + (ex - sx) * pu.t
        const py = sy + (ey - sy) * pu.t
        const alpha = Math.sin(pu.t * Math.PI) * 0.7

        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140,210,255,${alpha.toFixed(3)})`
        ctx.fill()
      }

      // Spawn pulses along static edges occasionally
      if (Math.random() < 0.008) {
        const i = Math.floor(Math.random() * nodes.length)
        const a = nodes[i]
        if (a.connections.length > 0) {
          const j = a.connections[Math.floor(Math.random() * a.connections.length)]
          pulsesRef.current.push({
            fromIdx: i,
            toIdx: j,
            t: 0,
            speed: 0.4 + Math.random() * 0.3,
          })
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = sm.x - n.x
        const dy = sm.y - n.y
        const d2 = dx * dx + dy * dy
        const nearCursor = d2 < CURSOR_RADIUS * CURSOR_RADIUS
        const boost = nearCursor ? (1 - Math.sqrt(d2) / CURSOR_RADIUS) : 0

        const r = n.radius * (1 + boost * 0.4)
        const col = nearCursor
          ? NODE_ACTIVE_COLOR.map((c, k) => c + (NODE_COLOR[k] - c) * (1 - boost))
          : NODE_DIM_COLOR.map((c, k) => c + (NODE_COLOR[k] - c) * 0.3)

        // Glow
        const glowR = r * (3 + boost * 3)
        const glowAlpha = 0.08 + boost * 0.15
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        gradient.addColorStop(0, `rgba(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)},${glowAlpha.toFixed(3)})`)
        gradient.addColorStop(1, `rgba(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)},0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        const pulse = 1 + Math.sin(t * 1.5 + n.seed) * 0.08
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)},${(0.7 + boost * 0.3).toFixed(3)})`
        ctx.fill()
      }

      // Cursor orb
      if (sm.x > 0 && sm.x < w && sm.y > 0 && sm.y < h) {
        const orbGrad = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, 24)
        orbGrad.addColorStop(0, 'rgba(140,210,255,0.18)')
        orbGrad.addColorStop(0.5, 'rgba(140,210,255,0.06)')
        orbGrad.addColorStop(1, 'rgba(140,210,255,0)')
        ctx.beginPath()
        ctx.arc(sm.x, sm.y, 24, 0, Math.PI * 2)
        ctx.fillStyle = orbGrad
        ctx.fill()

        const orbPulse = 2.2 + Math.sin(t * 2.5) * 0.4
        ctx.beginPath()
        ctx.arc(sm.x, sm.y, orbPulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180,225,255,0.7)'
        ctx.fill()
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchmove', onTouch)
      canvas.removeEventListener('touchend', onLeave)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [initNodes])

  return (
    <div className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}

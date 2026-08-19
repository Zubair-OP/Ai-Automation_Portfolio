'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Quality {
  nodes: number
  dust: number
  dpr: number
  coarse: boolean
  reduced: boolean
}

function detectQuality(): Quality {
  if (typeof window === 'undefined') {
    return { nodes: 170, dust: 40, dpr: 1.75, coarse: false, reduced: false }
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency ?? 8
  const low = coarse || cores <= 4
  return {
    nodes: low ? 92 : 170,
    dust: low ? 20 : 40,
    dpr: low ? 1 : Math.min(window.devicePixelRatio, 1.75),
    coarse,
    reduced,
  }
}

/**
 * Bright core with a wide soft halo — reads as a glowing neuron body.
 */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 128
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.16, 'rgba(255,255,255,0.92)')
  g.addColorStop(0.42, 'rgba(255,255,255,0.3)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

const X_BOUND = 21
const Y_BOUND = 12
const Z_BOUND = 4.5
const LINK_DIST = 5.4
const CURSOR_RADIUS = 6.6
const MAX_CURSOR_LINKS = 7
const CLUSTERS = 8

/** Electric blue palette — nodes, edges, pulses and cursor orb. */
const C_BLUE = [0.16, 0.42, 0.95] // resting node
const C_BLUE_ACTIVE = [0.55, 0.8, 1.0] // node near cursor
const C_EDGE = [0.22, 0.5, 1.0]
const C_CURSOR = [0.7, 0.9, 1.0]

function generateNodes(count: number) {
  const home = new Float32Array(count * 3)
  const pos = new Float32Array(count * 3)
  const vel = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const radius = new Float32Array(count)

  const centers = Array.from({ length: CLUSTERS }, () => ({
    x: (Math.random() * 2 - 1) * X_BOUND * 0.72,
    y: (Math.random() * 2 - 1) * Y_BOUND * 0.72,
    z: (Math.random() * 2 - 1) * Z_BOUND * 0.8,
  }))

  for (let i = 0; i < count; i++) {
    let x: number
    let y: number
    let z: number
    // ~60% of nodes cluster into "neural tissue", the rest form sparse long-range links
    if (Math.random() < 0.6) {
      const c = centers[Math.floor(Math.random() * centers.length)]
      x = THREE.MathUtils.clamp(c.x + (Math.random() * 2 - 1) * 3.4, -X_BOUND, X_BOUND)
      y = THREE.MathUtils.clamp(c.y + (Math.random() * 2 - 1) * 3.4, -Y_BOUND, Y_BOUND)
      z = THREE.MathUtils.clamp(c.z + (Math.random() * 2 - 1) * 1.6, -Z_BOUND, Z_BOUND)
    } else {
      x = (Math.random() * 2 - 1) * X_BOUND
      y = (Math.random() * 2 - 1) * Y_BOUND
      z = (Math.random() * 2 - 1) * Z_BOUND
    }
    home[i * 3] = x
    home[i * 3 + 1] = y
    home[i * 3 + 2] = z
    pos[i * 3] = x
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = z
    seed[i] = Math.random() * Math.PI * 2
    radius[i] = 0.9 + Math.random() * 0.6
  }
  return { home, pos, vel, seed, radius, count }
}

function NeuralField({ quality, active }: { quality: Quality; active: { current: boolean } }) {
  const { viewport, pointer } = useThree()

  const group = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pulsesRef = useRef<THREE.Points>(null)
  const dustRef = useRef<THREE.Points>(null)
  const cursorOrbRef = useRef<THREE.Sprite>(null)

  const cursorWorld = useRef(new THREE.Vector3(0, 0, 0))
  const target = useRef(new THREE.Vector3(0, 0, 0))
  const t0 = useRef(Math.random() * 100)

  const glow = useMemo(makeGlowTexture, [])

  const sim = useMemo(() => generateNodes(quality.nodes), [quality.nodes])

  // Edges + line buffers (pre-allocated)
  const links = useMemo(() => {
    const { count } = sim
    const edges: [number, number][] = []
    for (let a = 0; a < count; a++) {
      for (let b = a + 1; b < count; b++) {
        const ax = sim.home[a * 3]
        const ay = sim.home[a * 3 + 1]
        const az = sim.home[a * 3 + 2]
        const bx = sim.home[b * 3]
        const by = sim.home[b * 3 + 1]
        const bz = sim.home[b * 3 + 2]
        const dx = ax - bx
        const dy = ay - by
        const dz = az - bz
        if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
          edges.push([a, b])
          if (edges.length >= 620) break
        }
      }
      if (edges.length >= 620) break
    }

    const total = edges.length + MAX_CURSOR_LINKS
    const positions = new Float32Array(total * 2 * 3)
    const colors = new Float32Array(total * 2 * 3)
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e]
      const a3 = a * 3
      const b3 = b * 3
      const e6 = e * 6
      positions[e6] = sim.home[a3]
      positions[e6 + 1] = sim.home[a3 + 1]
      positions[e6 + 2] = sim.home[a3 + 2]
      positions[e6 + 3] = sim.home[b3]
      positions[e6 + 4] = sim.home[b3 + 1]
      positions[e6 + 5] = sim.home[b3 + 2]
      colors[e6] = C_EDGE[0]
      colors[e6 + 1] = C_EDGE[1]
      colors[e6 + 2] = C_EDGE[2]
      colors[e6 + 3] = C_EDGE[0]
      colors[e6 + 4] = C_EDGE[1]
      colors[e6 + 5] = C_EDGE[2]
    }
    for (let e = edges.length; e < total; e++) {
      const e6 = e * 6
      positions[e6] = positions[e6 + 3] = 9999
      positions[e6 + 1] = positions[e6 + 4] = 9999
      positions[e6 + 2] = positions[e6 + 5] = 9999
    }
    return { edges, total, positions, colors }
  }, [sim])

  // Pulse dots — one travelling signal per edge, plus cursor-edge pulses
  const pulses = useMemo(() => {
    const n = links.edges.length + MAX_CURSOR_LINKS
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    const phase = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      phase[i] = Math.random()
      const i3 = i * 3
      positions[i3] = positions[i3 + 1] = positions[i3 + 2] = 9999
    }
    return { positions, colors, phase, n }
  }, [links.edges.length])

  // Node point buffers (pre-filled so static/reduced-motion renders too)
  const pointBuffers = useMemo(() => {
    const { count } = sim
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = sim.home[i * 3]
      positions[i * 3 + 1] = sim.home[i * 3 + 1]
      positions[i * 3 + 2] = sim.home[i * 3 + 2]
      colors[i * 3] = C_BLUE[0]
      colors[i * 3 + 1] = C_BLUE[1]
      colors[i * 3 + 2] = C_BLUE[2]
    }
    return { positions, colors }
  }, [sim])

  // Dust layer — faint background starfield
  const dustBuffers = useMemo(() => {
    const n = quality.dust
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * X_BOUND * 1.3
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * Y_BOUND * 1.25
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 8 - 2
      colors[i * 3] = 0.12
      colors[i * 3 + 1] = 0.2
      colors[i * 3 + 2] = 0.42
    }
    return { positions, colors, n }
  }, [quality.dust])

  useFrame(({ clock }) => {
    if (!active.current) return
    if (quality.reduced) return

    const t = clock.getElapsedTime() + t0.current
    const dt = Math.min(clock.getDelta(), 0.05)

    // Smooth cursor interpolation — never instant
    const tx = (pointer.x * viewport.width) / 2
    const ty = (pointer.y * viewport.height) / 2
    target.current.set(quality.coarse ? 0 : tx, quality.coarse ? 0 : ty, 0)
    cursorWorld.current.lerp(target.current, 0.05)
    const cx = cursorWorld.current.x
    const cy = cursorWorld.current.y

    // Depth parallax: whole network tilts and shifts as the cursor moves
    if (group.current) {
      group.current.rotation.y = -cx * 0.008
      group.current.rotation.x = cy * 0.006
      group.current.position.x = -cx * 0.012
      group.current.position.y = -cy * 0.012
    }

    const { pos, vel, seed, radius, count } = sim
    const pPos = pointBuffers.positions
    const pCol = pointBuffers.colors

    let nearest: { idx: number; d: number }[] = []

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = pos[i3]
      const y = pos[i3 + 1]
      const z = pos[i3 + 2]
      const s = seed[i]
      const r = radius[i]

      // Gentle autonomous drift around home
      vel[i3] += (Math.sin(t * 0.32 + s) * 0.12 + (sim.home[i3] - x) * 0.0011) * r
      vel[i3 + 1] += (Math.cos(t * 0.28 + s * 1.7) * 0.12 + (sim.home[i3 + 1] - y) * 0.0011) * r
      vel[i3 + 2] += (Math.sin(t * 0.24 + s * 2.3) * 0.06 + (sim.home[i3 + 2] - z) * 0.0011) * r

      // Cursor repulsion — neurons part around the pointer
      if (!quality.coarse) {
        const dx = x - cx
        const dy = y - cy
        const d2 = dx * dx + dy * dy
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 0.0001) {
          const d = Math.sqrt(d2)
          const fall = (1 - d / CURSOR_RADIUS) * 0.5
          vel[i3] += (dx / d) * fall * dt * 60 * 0.38
          vel[i3 + 1] += (dy / d) * fall * dt * 60 * 0.38
        }
      }

      vel[i3] *= 0.962
      vel[i3 + 1] *= 0.962
      vel[i3 + 2] *= 0.962

      const nx = x + vel[i3] * dt * 60 * 0.06
      const ny = y + vel[i3 + 1] * dt * 60 * 0.06
      const nz = z + vel[i3 + 2] * dt * 60 * 0.06
      pos[i3] = nx
      pos[i3 + 1] = ny
      pos[i3 + 2] = nz

      // Parallax by depth
      const pp = 0.014 * (z / Z_BOUND)
      pPos[i3] = nx + cx * pp
      pPos[i3 + 1] = ny + cy * pp
      pPos[i3 + 2] = nz

      // Color — resting blue, bright electric blue near the cursor
      let boost = 0
      if (!quality.coarse) {
        const dx = nx - cx
        const dy = ny - cy
        const d2 = dx * dx + dy * dy
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
          boost = (1 - Math.sqrt(d2) / CURSOR_RADIUS) * 0.95
        }
      }
      pCol[i3] = C_BLUE[0] + (C_BLUE_ACTIVE[0] - C_BLUE[0]) * boost
      pCol[i3 + 1] = C_BLUE[1] + (C_BLUE_ACTIVE[1] - C_BLUE[1]) * boost
      pCol[i3 + 2] = C_BLUE[2] + (C_BLUE_ACTIVE[2] - C_BLUE[2]) * boost

      if (!quality.coarse) {
        const dx = nx - cx
        const dy = ny - cy
        nearest.push({ idx: i, d: dx * dx + dy * dy })
      }
    }

    const geo = pointsRef.current?.geometry as THREE.BufferGeometry | undefined
    if (geo) {
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
    }

    // ---- Edges ----
    const lPos = links.positions
    const lCol = links.colors
    const { edges } = links

    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e]
      const a3 = a * 3
      const b3 = b * 3
      const dx = pPos[a3] - pPos[b3]
      const dy = pPos[a3 + 1] - pPos[b3 + 1]
      const dz = pPos[a3 + 2] - pPos[b3 + 2]
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz)

      const e6 = e * 6
      if (d < LINK_DIST) {
        const alpha = 1 - d / LINK_DIST
        // edges closer to the cursor glow brighter
        let cBoost = 0
        if (!quality.coarse) {
          const mx = (pPos[a3] + pPos[b3]) / 2
          const my = (pPos[a3 + 1] + pPos[b3 + 1]) / 2
          const mdx = mx - cx
          const mdy = my - cy
          const md = Math.sqrt(mdx * mdx + mdy * mdy)
          if (md < CURSOR_RADIUS) cBoost = (1 - md / CURSOR_RADIUS) * 0.55
        }
        const b0 = Math.min(0.95, C_EDGE[0] * (0.45 + alpha * 1.1) + cBoost)
        const b1 = Math.min(0.98, C_EDGE[1] * (0.45 + alpha * 1.1) + cBoost)
        const b2 = Math.min(1, C_EDGE[2] * (0.5 + alpha * 1.1) + cBoost * 1.2)
        lPos[e6] = pPos[a3]
        lPos[e6 + 1] = pPos[a3 + 1]
        lPos[e6 + 2] = pPos[a3 + 2]
        lPos[e6 + 3] = pPos[b3]
        lPos[e6 + 4] = pPos[b3 + 1]
        lPos[e6 + 5] = pPos[b3 + 2]
        lCol[e6] = lCol[e6 + 3] = b0
        lCol[e6 + 1] = lCol[e6 + 4] = b1
        lCol[e6 + 2] = lCol[e6 + 5] = b2
      } else {
        lPos[e6] = lPos[e6 + 3] = 9999
        lPos[e6 + 1] = lPos[e6 + 4] = 9999
        lPos[e6 + 2] = lPos[e6 + 5] = 9999
        lCol[e6] = lCol[e6 + 3] = 0
        lCol[e6 + 1] = lCol[e6 + 4] = 0
        lCol[e6 + 2] = lCol[e6 + 5] = 0
      }
    }

    // ---- Cursor to neuron links ----
    const base = edges.length
    let picks: { idx: number; d: number }[] = []
    if (!quality.coarse) {
      nearest.sort((p, q) => p.d - q.d)
      picks = nearest.slice(0, MAX_CURSOR_LINKS)
    }
    for (let k = 0; k < MAX_CURSOR_LINKS; k++) {
      const e6 = (base + k) * 6
      const hit = picks[k] && picks[k].d < CURSOR_RADIUS * CURSOR_RADIUS
      if (hit) {
        const n = picks[k].idx
        const n3 = n * 3
        const fade = 1 - Math.sqrt(picks[k].d) / CURSOR_RADIUS
        const v = C_CURSOR[0] * (0.35 + fade * 0.65)
        const v1 = C_CURSOR[1] * (0.35 + fade * 0.65)
        const v2 = C_CURSOR[2] * (0.35 + fade * 0.65)
        lPos[e6] = cx
        lPos[e6 + 1] = cy
        lPos[e6 + 2] = 0
        lPos[e6 + 3] = pPos[n3]
        lPos[e6 + 4] = pPos[n3 + 1]
        lPos[e6 + 5] = pPos[n3 + 2]
        lCol[e6] = lCol[e6 + 3] = v
        lCol[e6 + 1] = lCol[e6 + 4] = v1
        lCol[e6 + 2] = lCol[e6 + 5] = v2
      } else {
        lPos[e6] = lPos[e6 + 3] = 9999
        lPos[e6 + 1] = lPos[e6 + 4] = 9999
        lPos[e6 + 2] = lPos[e6 + 5] = 9999
        lCol[e6] = lCol[e6 + 3] = 0
        lCol[e6 + 1] = lCol[e6 + 4] = 0
        lCol[e6 + 2] = lCol[e6 + 5] = 0
      }
    }

    const lgeo = linesRef.current?.geometry as THREE.BufferGeometry | undefined
    if (lgeo) {
      lgeo.attributes.position.needsUpdate = true
      lgeo.attributes.color.needsUpdate = true
    }

    // ---- Signal pulses travelling along every visible edge ----
    const puPos = pulses.positions
    const puCol = pulses.colors
    const pulseN = pulses.n
    const phase = pulses.phase
    const pulseSpeed = 0.5

    for (let e = 0; e < pulseN; e++) {
      const i3 = e * 3
      if (e < edges.length) {
        const [a, b] = edges[e]
        const a3 = a * 3
        const b3 = b * 3
        const dx = pPos[a3] - pPos[b3]
        const dy = pPos[a3 + 1] - pPos[b3 + 1]
        const dz = pPos[a3 + 2] - pPos[b3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < LINK_DIST) {
          const prog = (t * pulseSpeed * (0.7 + phase[e] * 0.6) + phase[e]) % 1
          puPos[i3] = pPos[a3] + (pPos[b3] - pPos[a3]) * prog
          puPos[i3 + 1] = pPos[a3 + 1] + (pPos[b3 + 1] - pPos[a3 + 1]) * prog
          puPos[i3 + 2] = pPos[a3 + 2] + (pPos[b3 + 2] - pPos[a3 + 2]) * prog
          puCol[i3] = 0.45
          puCol[i3 + 1] = 0.78
          puCol[i3 + 2] = 1.0
        } else {
          puPos[i3] = puPos[i3 + 1] = puPos[i3 + 2] = 9999
          puCol[i3] = puCol[i3 + 1] = puCol[i3 + 2] = 0
        }
      } else if (!quality.coarse) {
        // pulses firing from the cursor toward linked neurons
        const k = e - edges.length
        const pick = picks[k]
        if (pick && pick.d < CURSOR_RADIUS * CURSOR_RADIUS) {
          const n3 = pick.idx * 3
          const prog = (t * pulseSpeed * 1.5 + phase[e]) % 1
          puPos[i3] = cx + (pPos[n3] - cx) * prog
          puPos[i3 + 1] = cy + (pPos[n3 + 1] - cy) * prog
          puPos[i3 + 2] = pPos[n3 + 2] * prog
          puCol[i3] = 0.85
          puCol[i3 + 1] = 0.95
          puCol[i3 + 2] = 1.0
        } else {
          puPos[i3] = puPos[i3 + 1] = puPos[i3 + 2] = 9999
          puCol[i3] = puCol[i3 + 1] = puCol[i3 + 2] = 0
        }
      } else {
        puPos[i3] = puPos[i3 + 1] = puPos[i3 + 2] = 9999
        puCol[i3] = puCol[i3 + 1] = puCol[i3 + 2] = 0
      }
    }

    const pgeo = pulsesRef.current?.geometry as THREE.BufferGeometry | undefined
    if (pgeo) {
      pgeo.attributes.position.needsUpdate = true
      pgeo.attributes.color.needsUpdate = true
    }

    // ---- Cursor orb (the cursor is a neuron) ----
    if (cursorOrbRef.current) {
      if (quality.coarse) {
        cursorOrbRef.current.visible = false
      } else {
        cursorOrbRef.current.visible = true
        cursorOrbRef.current.position.set(cx, cy, 0)
        const breathe = 1.15 + Math.sin(t * 3.2) * 0.18
        cursorOrbRef.current.scale.set(2.4 * breathe, 2.4 * breathe, 1)
      }
    }

    // Dust slow drift
    const dustGeo = dustRef.current?.geometry as THREE.BufferGeometry | undefined
    if (dustGeo) {
      const dp = dustGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < dustBuffers.n; i++) {
        const i3 = i * 3
        dp.array[i3] += Math.sin(t * 0.1 + i) * 0.004
        dp.array[i3 + 1] += Math.cos(t * 0.08 + i * 2) * 0.004
      }
      dp.needsUpdate = true
    }
  })

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointBuffers.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointBuffers.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.55}
          map={glow}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[links.colors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulses.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pulses.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          map={glow}
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustBuffers.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustBuffers.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={glow}
          vertexColors
          transparent
          opacity={0.5}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <sprite ref={cursorOrbRef}>
        <spriteMaterial
          map={glow}
          color="#7CC4FF"
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}

export function NeuralCanvas({ className }: { className?: string }) {
  const [quality] = useState(detectQuality)
  const active = useRef(true)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = container.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      active.current = entry.isIntersecting
    })
    io.observe(el)
    const onVis = () => {
      active.current = !document.hidden
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div ref={container} className={className} aria-hidden="true">
      <Canvas
        frameloop={quality.reduced ? 'demand' : 'always'}
        dpr={quality.dpr}
        camera={{ position: [0, 0, 26], fov: 48, near: 0.1, far: 80 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <NeuralField quality={quality} active={active} />
      </Canvas>
    </div>
  )
}
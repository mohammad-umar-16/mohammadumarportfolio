
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function spawnScale(elapsed, delay, duration = 0.9) {
  const t = THREE.MathUtils.clamp((elapsed - delay) / duration, 0, 1);
  return t <= 0 ? 0 : easeOutBack(t);
}

function Bar({ length = 1.15, position, rotationZ, thickness = 0.16 }) {
  return (
    <mesh position={position} rotation={[0, 0, rotationZ]}>
      <boxGeometry args={[length, thickness, thickness]} />
      <meshStandardMaterial color="#0A1815" emissive="#4ECDA4" emissiveIntensity={0.85} roughness={0.15} metalness={0.8} />
    </mesh>
  );
}

function Chevron({ flip = 1, barLength = 1.15 }) {
  const half = barLength / 2;
  const angle = Math.PI / 4;
  return (
    <group scale={[flip, 1, 1]}>
      <Bar length={barLength} position={[half * Math.cos(angle), half * Math.sin(angle), 0]} rotationZ={angle} />
      <Bar length={barLength} position={[half * Math.cos(angle), -half * Math.sin(angle), 0]} rotationZ={-angle} />
    </group>
  );
}

function BarWire({ length = 1.15, position, rotationZ }) {
  return (
    <mesh position={position} rotation={[0, 0, rotationZ]}>
      <boxGeometry args={[length, 0.16, 0.16]} />
      <meshBasicMaterial color="#4ECDA4" wireframe transparent opacity={0.15} />
    </mesh>
  );
}
function ChevronWire({ flip = 1, barLength = 1.15 }) {
  const half = barLength / 2;
  const angle = Math.PI / 4;
  return (
    <group scale={[flip, 1, 1]}>
      <BarWire length={barLength} position={[half * Math.cos(angle), half * Math.sin(angle), 0]} rotationZ={angle} />
      <BarWire length={barLength} position={[half * Math.cos(angle), -half * Math.sin(angle), 0]} rotationZ={-angle} />
    </group>
  );
}

function CodeGlyph({ mouse }) {
  const groupRef = useRef();
  const scaleRef = useRef();
  const smoothed = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.06;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.35 + smoothed.current.x * 0.5;
      groupRef.current.rotation.x = -smoothed.current.y * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (scaleRef.current) {
      const s = spawnScale(t, 0, 1.1);
      scaleRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={scaleRef}>
      <group ref={groupRef} position={[1.2, 0, 0]}>
        <group position={[-1.5, 0, 0]}><Chevron flip={1} /></group>
        <Bar length={1.7} position={[0, 0, 0]} rotationZ={-Math.PI / 5} thickness={0.15} />
        <group position={[1.5, 0, 0]}><Chevron flip={-1} /></group>

        <group scale={1.15} position={[0, 0, -0.3]}>
          <group position={[-1.5, 0, 0]}><ChevronWire flip={1} /></group>
          <BarWire length={1.7} position={[0, 0, 0]} rotationZ={-Math.PI / 5} />
          <group position={[1.5, 0, 0]}><ChevronWire flip={-1} /></group>
        </group>
      </group>
    </group>
  );
}

const iconMat = (color = "#4ECDA4", intensity = 0.7) => ({
  color: "#0A1815", emissive: color, emissiveIntensity: intensity, roughness: 0.2, metalness: 0.7,
});

function useOrbitFrame(ref, position, orbit, spawnDelay, baseScale = 1) {
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const t = elapsed * orbit.speed + orbit.offset;
    if (ref.current) {
      ref.current.position.set(
        position[0] + Math.cos(t) * orbit.radius,
        position[1] + Math.sin(t * 0.7) * (orbit.radius * 0.3),
        position[2] + Math.sin(t) * orbit.radius
      );
      ref.current.rotation.y = t * 0.4;
      const s = spawnScale(elapsed, spawnDelay) * baseScale;
      ref.current.scale.setScalar(s);
    }
  });
}

function BrowserWindow({ position, orbit, spawnDelay }) {
  const ref = useRef();
  useOrbitFrame(ref, position, orbit, spawnDelay);
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.85, 0.6, 0.04]} />
        <meshStandardMaterial {...iconMat("#4ECDA4", 0.5)} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.9, 0.65, 0.02]} />
        <meshBasicMaterial color="#4ECDA4" wireframe transparent opacity={0.25} />
      </mesh>
      {[-0.32, -0.24, -0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0.03]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={i === 1 ? "#E8A33D" : "#4ECDA4"} />
        </mesh>
      ))}
    </group>
  );
}

function DatabaseStack({ position, orbit, spawnDelay }) {
  const ref = useRef();
  useOrbitFrame(ref, position, orbit, spawnDelay, 0.55);
  return (
    <group ref={ref}>
      {[0, 0.22, 0.44].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.12, 16]} />
          <meshStandardMaterial {...iconMat(i === 1 ? "#E8A33D" : "#4ECDA4", 0.6)} />
        </mesh>
      ))}
    </group>
  );
}

function GitBranch({ position, orbit, spawnDelay }) {
  const ref = useRef();
  useOrbitFrame(ref, position, orbit, spawnDelay, 0.6);
  const nodes = [[0, -0.3, 0], [0, 0, 0], [0.28, 0.3, 0], [-0.28, 0.3, 0]];
  return (
    <group ref={ref}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial {...iconMat(i === 0 ? "#E8A33D" : "#4ECDA4", 0.7)} />
        </mesh>
      ))}
      <mesh position={[0, -0.15, 0]}><cylinderGeometry args={[0.012, 0.012, 0.3, 6]} /><meshBasicMaterial color="#4ECDA4" transparent opacity={0.4} /></mesh>
      <mesh position={[0.14, 0.15, 0]} rotation={[0, 0, -0.9]}><cylinderGeometry args={[0.012, 0.012, 0.34, 6]} /><meshBasicMaterial color="#4ECDA4" transparent opacity={0.4} /></mesh>
      <mesh position={[-0.14, 0.15, 0]} rotation={[0, 0, 0.9]}><cylinderGeometry args={[0.012, 0.012, 0.34, 6]} /><meshBasicMaterial color="#4ECDA4" transparent opacity={0.4} /></mesh>
    </group>
  );
}

function TerminalIcon({ position, orbit, spawnDelay }) {
  const ref = useRef();
  const cursorRef = useRef();
  useOrbitFrame(ref, position, orbit, spawnDelay);
  useFrame(({ clock }) => {
    if (cursorRef.current) {
      cursorRef.current.material.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 4) * 0.4 + 0.4;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.7, 0.5, 0.04]} />
        <meshStandardMaterial {...iconMat("#4ECDA4", 0.45)} />
      </mesh>
      <mesh position={[-0.2, 0.02, 0.03]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.14, 0.03, 0.01]} />
        <meshBasicMaterial color="#4ECDA4" />
      </mesh>
      <mesh position={[-0.2, -0.06, 0.03]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.14, 0.03, 0.01]} />
        <meshBasicMaterial color="#4ECDA4" />
      </mesh>
      <mesh ref={cursorRef} position={[0.05, -0.02, 0.03]}>
        <boxGeometry args={[0.1, 0.06, 0.01]} />
        <meshBasicMaterial color="#E8A33D" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function OrbitingShape({ radius, speed, offset, geometry, spawnDelay }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const t = elapsed * speed + offset;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * (radius * 0.35), Math.sin(t) * radius);
      ref.current.rotation.x = t * 0.7;
      ref.current.rotation.y = t * 0.5;
      ref.current.scale.setScalar(spawnScale(elapsed, spawnDelay));
    }
  });
  return (
    <mesh ref={ref}>
      {geometry}
      <meshBasicMaterial color="#E8A33D" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function ConnectionLine({ from, position, orbit, spawnDelay, pulseColor = "#E8A33D" }) {
  const lineRef = useRef();
  const dotRef = useRef();
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const t = elapsed * orbit.speed + orbit.offset;
    const ix = position[0] + Math.cos(t) * orbit.radius;
    const iy = position[1] + Math.sin(t * 0.7) * (orbit.radius * 0.3);
    const iz = position[2] + Math.sin(t) * orbit.radius;

    const posAttr = geometry.attributes.position;
    posAttr.array[0] = from[0]; posAttr.array[1] = from[1]; posAttr.array[2] = from[2];
    posAttr.array[3] = ix; posAttr.array[4] = iy; posAttr.array[5] = iz;
    posAttr.needsUpdate = true;

    const s = Math.min(spawnScale(elapsed, spawnDelay), 1);
    if (lineRef.current) lineRef.current.material.opacity = 0.16 * Math.max(s, 0);

    const active = elapsed > spawnDelay;
    if (dotRef.current) {
      if (active) {
        const phase = ((elapsed - spawnDelay) % 2.2) / 2.2;
        dotRef.current.position.set(
          THREE.MathUtils.lerp(ix, from[0], phase),
          THREE.MathUtils.lerp(iy, from[1], phase),
          THREE.MathUtils.lerp(iz, from[2], phase)
        );
        dotRef.current.material.opacity = Math.sin(phase * Math.PI) * 0.85 * s;
      } else {
        dotRef.current.material.opacity = 0;
      }
    }
  });

  return (
    <>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#4ECDA4" transparent opacity={0} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={pulseColor} transparent opacity={0} />
      </mesh>
    </>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#4ECDA4" />
      <pointLight position={[-6, -3, -4]} intensity={20} color="#E8A33D" />
      <pointLight position={[0, 0, 6]} intensity={12} color="#4ECDA4" />
      <fog attach="fog" args={['#0B0F0E', 8, 18]} />

      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.4}>
        <CodeGlyph mouse={mouse} />
      </Float>

      <OrbitingShape radius={3.4} speed={0.4} offset={0} spawnDelay={0.9} geometry={<octahedronGeometry args={[0.14, 0]} />} />

      <BrowserWindow position={[1.2, 1.8, -1]} orbit={{ radius: 1.1, speed: 0.25, offset: 0 }} spawnDelay={0.2} />
      <DatabaseStack position={[3.6, -0.4, -1.5]} orbit={{ radius: 0.9, speed: 0.3, offset: 1.8 }} spawnDelay={0.4} />
      <GitBranch position={[-1.6, 1.6, -1]} orbit={{ radius: 0.8, speed: 0.35, offset: 3.4 }} spawnDelay={0.6} />
      <TerminalIcon position={[1.0, -1.9, -1]} orbit={{ radius: 1.0, speed: 0.28, offset: 5.1 }} spawnDelay={0.8} />
      <ConnectionLine from={[1.2, 0, 0]} position={[1.2, 1.8, -1]} orbit={{ radius: 1.1, speed: 0.25, offset: 0 }} spawnDelay={0.9} />
      <ConnectionLine from={[1.2, 0, 0]} position={[3.6, -0.4, -1.5]} orbit={{ radius: 0.9, speed: 0.3, offset: 1.8 }} spawnDelay={1.1} pulseColor="#4ECDA4" />
      <ConnectionLine from={[1.2, 0, 0]} position={[-1.6, 1.6, -1]} orbit={{ radius: 0.8, speed: 0.35, offset: 3.4 }} spawnDelay={1.3} />
      <ConnectionLine from={[1.2, 0, 0]} position={[1.0, -1.9, -1]} orbit={{ radius: 1.0, speed: 0.28, offset: 5.1 }} spawnDelay={1.5} pulseColor="#4ECDA4" />
      
      <Sparkles count={60} scale={9} size={1.5} speed={0.25} color="#4ECDA4" opacity={0.4} />

      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.08} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = { x, y };
  };

  return (
    <div ref={containerRef} className="absolute inset-0" onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [2.4, 0, 9], fov: 42 }}
        dpr={1}
        gl={{ antialias: true }}
        frameloop={inView ? 'always' : 'never'}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
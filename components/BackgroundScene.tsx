import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, Torus, Stars, Cylinder, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  slideIndex: number;
}

/**
 * The "Muse Core" - A central object that morphs based on the story chapter
 */
function MorphingCore({ slideIndex }: { slideIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);

  // Smooth transition state
  const targetConfig = useRef({ 
    distort: 0.3, 
    speed: 1.5, 
    color: new THREE.Color("#4f46e5"), 
    scale: 1,
    roughness: 0.1,
    metalness: 0.8
  });

  useFrame((state, delta) => {
    // 1. Determine Target State based on Slide
    switch (slideIndex) {
      case 0: // Intro: Gold Liquid
        targetConfig.current = { 
          distort: 0.3, speed: 2, color: new THREE.Color("#fbbf24"), scale: 2.2, roughness: 0.1, metalness: 0.9 
        };
        break;
      case 1: // Problem: Red Chaos
        targetConfig.current = { 
          distort: 0.8, speed: 10, color: new THREE.Color("#ef4444"), scale: 1.8, roughness: 0.4, metalness: 0.2 
        };
        break;
      case 2: // Vision: Green Structure
        targetConfig.current = { 
          distort: 0.2, speed: 1, color: new THREE.Color("#10b981"), scale: 2, roughness: 0.1, metalness: 0.8 
        };
        break;
      case 3: // Agents: Purple Intelligent
        targetConfig.current = { 
          distort: 0.4, speed: 3, color: new THREE.Color("#8b5cf6"), scale: 1.5, roughness: 0.2, metalness: 0.7 
        };
        break;
      case 4: // Truth: Cyan Crystal (Clear, Sharp)
        targetConfig.current = { 
          distort: 0.0, speed: 0, color: new THREE.Color("#06b6d4"), scale: 1.8, roughness: 0.0, metalness: 1.0 
        };
        break;
      case 5: // Push: Orange Energetic Pulse
        targetConfig.current = { 
          distort: 0.6, speed: 8, color: new THREE.Color("#f97316"), scale: 1.6, roughness: 0.2, metalness: 0.8 
        };
        break;
      case 6: // Demo: Deep Blue Tech
        targetConfig.current = { 
          distort: 0.2, speed: 2, color: new THREE.Color("#1e3a8a"), scale: 1.8, roughness: 0.3, metalness: 0.6 
        };
        break;
      case 7: // Value: Silver Stable
        targetConfig.current = { 
          distort: 0.1, speed: 0.5, color: new THREE.Color("#94a3b8"), scale: 2.0, roughness: 0.1, metalness: 0.9 
        };
        break;
      case 8: // Roadmap: Dark Matter
        targetConfig.current = { 
          distort: 0.5, speed: 4, color: new THREE.Color("#4c1d95"), scale: 1.5, roughness: 0.4, metalness: 0.5 
        };
        break;
      default: // Access: Back to Gold
        targetConfig.current = { 
          distort: 0.3, speed: 2, color: new THREE.Color("#fbbf24"), scale: 2.2, roughness: 0.1, metalness: 0.9 
        };
    }

    // 2. Lerp values
    const lerpSpeed = 2.5 * delta;
    if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetConfig.current.distort, lerpSpeed);
        materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetConfig.current.speed, lerpSpeed);
        materialRef.current.color.lerp(targetConfig.current.color, lerpSpeed);
        materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, targetConfig.current.roughness, lerpSpeed);
        materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, targetConfig.current.metalness, lerpSpeed);
    }
    if (meshRef.current) {
       const s = targetConfig.current.scale;
       meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), lerpSpeed);
       // Rotate slightly
       meshRef.current.rotation.x += delta * 0.1;
       meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#fbbf24"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

/** Slide 3: Satellites (Agents) */
function Satellites({ visible }: { visible: boolean }) {
    const group = useRef<THREE.Group>(null!);
    useFrame((state, delta) => {
        if (!group.current) return;
        const targetScale = visible ? 1 : 0;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
        group.current.rotation.y += delta * 0.5;
    });
    return (
        <group ref={group} scale={[0,0,0]}>
            <Float speed={5} rotationIntensity={2} floatIntensity={2} position={[3, 1, 0]}><Sphere args={[0.4, 32, 32]}><meshStandardMaterial color="#6366f1" emissive="#4338ca" emissiveIntensity={2} toneMapped={false}/></Sphere></Float>
            <Float speed={4} rotationIntensity={2} floatIntensity={2} position={[-3, -1, 1]}><Sphere args={[0.4, 32, 32]}><meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={2} toneMapped={false}/></Sphere></Float>
            <Float speed={6} rotationIntensity={2} floatIntensity={2} position={[0, 3, -1]}><Sphere args={[0.4, 32, 32]}><meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={2} toneMapped={false}/></Sphere></Float>
        </group>
    );
}

/** Slide 4: Scanner Ring (Truth Seeking) */
function ScannerRing({ visible }: { visible: boolean }) {
    const ring = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (!ring.current) return;
        if (!visible) {
             ring.current.visible = false;
             return;
        }
        ring.current.visible = true;
        // Scan up and down
        ring.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 2.5;
        ring.current.rotation.x = Math.PI / 2;
        ring.current.rotation.z += 0.02;
    });
    return (
        <Torus ref={ring} args={[2.5, 0.05, 16, 100]} visible={false}>
            <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={5} toneMapped={false} transparent opacity={0.8} />
        </Torus>
    );
}

const Wave: React.FC<{ delay: number }> = ({ delay }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = (state.clock.elapsedTime + delay) % 3;
        const scale = t * 2 + 1.5;
        const opacity = 1 - t/3;
        mesh.current.scale.set(scale, scale, scale);
        // @ts-ignore
        mesh.current.material.opacity = Math.max(0, opacity);
    });
    return (
        <Torus ref={mesh} args={[1, 0.02, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
            <meshStandardMaterial color="#f97316" transparent opacity={1} emissive="#f97316" emissiveIntensity={2} />
        </Torus>
    );
};

/** Slide 5: Pulse Shockwaves (Push Notification) */
function Shockwaves({ visible }: { visible: boolean }) {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
         if (!group.current) return;
         if (!visible) {
             group.current.visible = false;
             return;
         }
         group.current.visible = true;
         group.current.rotation.x = Math.PI / 2.5; // Tilt slightly
    });

    return (
        <group ref={group} visible={false}>
             {[0, 1, 2].map(i => (
                 <Wave key={i} delay={i * 1} />
             ))}
        </group>
    );
}

/** Slide 6: Tech Shell (Demo/Engine) */
function TechShell({ visible }: { visible: boolean }) {
    const group = useRef<THREE.Group>(null!);
    useFrame((state, delta) => {
        if (!group.current) return;
        if (!visible) {
             group.current.visible = false;
             return;
        }
        group.current.visible = true;
        group.current.rotation.y -= delta * 0.5;
        group.current.rotation.x += delta * 0.2;
    });

    return (
        <group ref={group} visible={false}>
             <mesh>
                <icosahedronGeometry args={[2.2, 1]} />
                <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.3} emissive="#3b82f6" emissiveIntensity={0.5} />
             </mesh>
             <mesh rotation={[0.5, 0, 0]}>
                <icosahedronGeometry args={[2.6, 0]} />
                <meshStandardMaterial color="#1e40af" wireframe transparent opacity={0.1} />
             </mesh>
        </group>
    );
}

/** Slide 7: Data Stream (Value/Delivery) */
function DataStream({ visible }: { visible: boolean }) {
    const count = 40;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 15,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 5,
            speed: 0.5 + Math.random() * 2,
            scale: 0.2 + Math.random() * 0.4
    })), []);

    useFrame((state, delta) => {
        if (!mesh.current || !visible) {
             if (mesh.current) mesh.current.visible = visible;
             return;
        }
        mesh.current.visible = true;
        
        particles.forEach((p, i) => {
            p.y += p.speed * delta;
            if (p.y > 10) p.y = -10; // Reset to bottom
            
            dummy.position.set(p.x, p.y, p.z);
            dummy.rotation.x += delta;
            dummy.rotation.y += delta * 0.5;
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} />
        </instancedMesh>
    );
}

/** Slide 1/9: Chaos Particles (Red/Gold) */
function ChaosDebris({ visible, color = "#ef4444" }: { visible: boolean, color?: string }) {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => new Array(count).fill(0).map(() => ({
            position: [(Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*10],
            rotation: [Math.random()*Math.PI, Math.random()*Math.PI, 0],
            scale: Math.random()*0.5
    })), []);

    useFrame((state) => {
        if (!mesh.current || !visible) {
             if (mesh.current) mesh.current.visible = visible;
             return;
        }
        mesh.current.visible = true;
        particles.forEach((p, i) => {
            const time = state.clock.getElapsedTime();
            dummy.position.set(p.position[0] + Math.sin(time+i), p.position[1] + Math.cos(time+i), p.position[2]);
            dummy.rotation.set(p.rotation[0]+time, p.rotation[1]+time, p.rotation[2]);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
            <tetrahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
        </instancedMesh>
    );
}

export default function BackgroundScene({ slideIndex }: SceneProps) {
  const CameraRig = ({ index }: { index: number }) => {
      useFrame((state) => {
          const { x, y } = state.pointer;
          let targetPos = new THREE.Vector3(0, 0, 8);
          // Camera choreography
          if (index === 0) targetPos.set(0, 0, 7);
          if (index === 1) targetPos.set(0, 0, 6);
          if (index === 2) targetPos.set(4, 0, 8); 
          if (index === 3) targetPos.set(0, 2, 9);
          if (index === 4) targetPos.set(0, 0, 6); // Truth: Close up for scan
          if (index === 5) targetPos.set(0, 0, 10); // Push: Wide for waves
          if (index === 6) targetPos.set(-4, 0, 8); // Demo
          if (index === 7) targetPos.set(0, -2, 10); // Value: Low angle looking up
          if (index >= 8) targetPos.set(0, 0, 8); // Roadmap & End

          state.camera.position.lerp(new THREE.Vector3(targetPos.x + x * 0.5, targetPos.y + y * 0.5, targetPos.z), 0.05);
          state.camera.lookAt(0, 0, 0);
      });
      return null;
  }

  // Warp Speed effect for Roadmap (Slide 8)
  const starSpeed = slideIndex === 8 ? 20 : 0.5;

  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <CameraRig index={slideIndex} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={5} color={slideIndex === 5 ? "#f97316" : "#4f46e5"} />
        
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={starSpeed} />

        <MorphingCore slideIndex={slideIndex} />
        
        {/* Slide 1: Problem - Red Chaos */}
        <ChaosDebris visible={slideIndex === 1} color="#ef4444" />
        
        {/* Slide 3: Agents - Satellites */}
        <Satellites visible={slideIndex === 3} />
        
        {/* Slide 4: Truth - Scanner */}
        <ScannerRing visible={slideIndex === 4} />
        
        {/* Slide 5: Push - Shockwaves */}
        <Shockwaves visible={slideIndex === 5} />
        
        {/* Slide 6: Demo - Tech Shell */}
        <TechShell visible={slideIndex === 6} />

        {/* Slide 7: Value - Data Stream */}
        <DataStream visible={slideIndex === 7} />

        {/* Slide 9: End - Golden Dust */}
        <ChaosDebris visible={slideIndex === 9} color="#fbbf24" />

      </Canvas>
    </div>
  );
}
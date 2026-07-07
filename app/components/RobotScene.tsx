"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Float, PresentationControls, useAnimations } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function RobotModel() {
  const { scene, animations } = useGLTF("/assets/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]].play();
      }
    }
  }, [actions]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <primitive object={scene} scale={1.8} position={[0, -1.5, 0]} />
    </Float>
  );
}

export default function RobotScene() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#e8481a" />
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <RobotModel />
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/robot_playground.glb");

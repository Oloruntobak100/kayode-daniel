"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

vec3 layer(vec2 uv, vec2 center, vec3 col, float radius, float seed, vec2 mouseDelta) {
  vec2 d = uv - center - mouseDelta * 0.12;
  float r = length(d);
  float wobble = fbm(vec2(seed * 2.7, seed * 1.9) + uv * 3.4 + uTime * 0.11);
  float breathe = sin(uTime * 0.42 + seed * 6.2831) * 0.035;
  float rr = radius + wobble * 0.07 + breathe;
  float m = smoothstep(rr + 0.18, rr - 0.22, r);
  float edge = smoothstep(rr - 0.03, rr + 0.28, r);
  float a = m * (1.0 - edge * 0.62);
  return col * a;
}

void main() {
  vec2 uv = vUv;
  vec2 mouse = uMouse;

  vec3 bg = vec3(0.980392, 0.980392, 0.972549);

  vec2 toward = (mouse - uv);
  vec2 drift = toward * 0.22;

  vec3 acc = vec3(0.0);

  acc += layer(uv, vec2(0.22 + sin(uTime * 0.17) * 0.04, 0.62), vec3(0.78, 0.62, 1.00), 0.29, 1.15, drift);
  acc += layer(uv, vec2(0.74 + cos(uTime * 0.13) * 0.045, 0.36), vec3(1.00, 0.58, 0.52), 0.31, 2.35, drift);
  acc += layer(uv, vec2(0.46, 0.80 + sin(uTime * 0.1) * 0.035), vec3(0.55, 0.92, 0.78), 0.26, 3.8, drift);
  acc += layer(uv, vec2(0.86, 0.72), vec3(1.00, 0.86, 0.52), 0.23, 4.45, drift);
  acc += layer(uv, vec2(0.14, 0.26), vec3(0.72, 0.82, 1.00), 0.24, 5.15, drift);
  acc += layer(uv, vec2(0.54, 0.20), vec3(0.92, 0.58, 0.84), 0.21, 6.05, drift);

  float strength = clamp(length(acc), 0.0, 1.0);
  vec3 tinted = bg + acc * 0.52;

  float fog = smoothstep(0.75, 1.0, strength);
  vec3 color = mix(tinted, tinted * 1.03, fog * 0.08);

  gl_FragColor = vec4(color, 1.0);
}
`;

function FluidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmooth = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    mouseSmooth.current.lerp(mouseTarget.current, 0.07);
    mat.uniforms.uMouse.value.copy(mouseSmooth.current);
  });

  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 5], zoom: 100, near: 0.1, far: 1000 }}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="h-full w-full"
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
}

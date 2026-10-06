"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/*
 * Moving grainy gradient behind the about quote. The fragment shader is adapted from "Grainient" by
 * React Bits (https://reactbits.dev), Copyright (c) 2026 David Haz, used under the MIT + Commons Clause
 * licence (https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). Changes: a fourth colour (the top
 * row blends aqua → amber, the bottom row navy → violet), fixed settings, and no ogl dependency.
 *
 * Without WebGL 2 the CSS colour fields underneath (.glow_field) stay visible instead.
 */
const SETTINGS = {
  timeSpeed: 0.25,
  colorBalance: 0.12,
  warpStrength: 1,
  warpFrequency: 5,
  warpSpeed: 2,
  warpAmplitude: 50,
  blendAngle: 0,
  blendSoftness: 0.05,
  rotationAmount: 500,
  noiseScale: 2,
  grainAmount: 0.1,
  grainScale: 2,
  contrast: 1.12,
  gamma: 1,
  saturation: 1,
  zoom: 0.9,
};
const COLORS = { amber: "#FFC24D", violet: "#6A4CFF", navy: "#0E1A33", aqua: "#33C8F5" };
/** Shown for reduced motion: a frame where all four colours are on screen. */
const STILL_TIME = 14;

const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed, uColorBalance, uWarpStrength, uWarpFrequency, uWarpSpeed, uWarpAmplitude, uBlendAngle,
  uBlendSoftness, uRotationAmount, uNoiseScale, uGrainAmount, uGrainScale, uContrast, uGamma, uSaturation, uZoom;
uniform vec3 uColor1, uColor2, uColor3, uColor4;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
vec2 hash(vec2 p) { p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37))); return fract(sin(p) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float n = mix(mix(dot(-1.0 + 2.0 * hash(i), f), dot(-1.0 + 2.0 * hash(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
                mix(dot(-1.0 + 2.0 * hash(i + vec2(0, 1)), f - vec2(0, 1)), dot(-1.0 + 2.0 * hash(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
  return 0.5 + 0.5 * n;
}
void main() {
  float t = iTime * uTimeSpeed;
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 tuv = (uv - 0.5) / max(uZoom, 0.001);

  float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) * uNoiseScale);
  tuv.y *= 1.0 / ratio;
  tuv *= Rot(radians((degree - 0.5) * uRotationAmount + 180.0));
  tuv.y *= ratio;

  float amplitude = uWarpAmplitude / max(uWarpStrength, 0.001);
  float warpTime = t * uWarpSpeed;
  tuv.x += sin(tuv.y * uWarpFrequency + warpTime) / amplitude;
  tuv.y += sin(tuv.x * (uWarpFrequency * 1.5) + warpTime) / (amplitude * 0.5);

  float b = uColorBalance, s = max(uBlendSoftness, 0.0);
  float blendX = (tuv * Rot(radians(uBlendAngle))).x;
  float e0 = -0.3 - b - s, e1 = 0.2 - b + s, v0 = 0.5 - b + s, v1 = -0.3 - b - s;
  vec3 bottom = mix(uColor3, uColor2, S(e0, e1, blendX));
  vec3 top = mix(uColor4, uColor1, S(e0, e1, blendX));
  vec3 col = mix(bottom, top, S(v0, v1, tuv.y));

  vec2 grainUv = uv * max(uGrainScale, 0.001);
  col += (fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uGrainAmount;

  col = (col - 0.5) * uContrast + 0.5;
  col = mix(vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), col, uSaturation);
  col = pow(max(col, 0.0), vec3(1.0 / max(uGamma, 0.001)));
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

export function AboutGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = ref.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, alpha: false });
    if (!root || !canvas || !gl) return;

    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vertex = shader(gl.VERTEX_SHADER, VERTEX);
    const fragment = shader(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const floats: [string, number][] = [
      ["uTimeSpeed", SETTINGS.timeSpeed], ["uColorBalance", SETTINGS.colorBalance], ["uWarpStrength", SETTINGS.warpStrength],
      ["uWarpFrequency", SETTINGS.warpFrequency], ["uWarpSpeed", SETTINGS.warpSpeed], ["uWarpAmplitude", SETTINGS.warpAmplitude],
      ["uBlendAngle", SETTINGS.blendAngle], ["uBlendSoftness", SETTINGS.blendSoftness], ["uRotationAmount", SETTINGS.rotationAmount],
      ["uNoiseScale", SETTINGS.noiseScale], ["uGrainAmount", SETTINGS.grainAmount], ["uGrainScale", SETTINGS.grainScale],
      ["uContrast", SETTINGS.contrast], ["uGamma", SETTINGS.gamma], ["uSaturation", SETTINGS.saturation], ["uZoom", SETTINGS.zoom],
    ];
    floats.forEach(([name, value]) => gl.uniform1f(uniform(name), value));
    gl.uniform3fv(uniform("uColor1"), rgb(COLORS.amber));
    gl.uniform3fv(uniform("uColor2"), rgb(COLORS.violet));
    gl.uniform3fv(uniform("uColor3"), rgb(COLORS.navy));
    gl.uniform3fv(uniform("uColor4"), rgb(COLORS.aqua));
    const resolution = uniform("iResolution");
    const time = uniform("iTime");

    const still = prefersReducedMotion();
    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(time, still ? STILL_TIME : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      // A soft gradient doesn't need full resolution: draw at 3/4 size and let the browser scale it up.
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.75;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      draw(performance.now());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    root.classList.add("is-webgl");

    // Animate only while on screen and the tab is visible.
    let frame = 0;
    let onScreen = false;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const update = () => {
      const run = !still && onScreen && !document.hidden;
      if (run && !frame) frame = requestAnimationFrame(loop);
      if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", update);
      root.classList.remove("is-webgl");
    };
  }, []);

  return (
    <div ref={ref} className="home-about_glow" data-parallax="scale" aria-hidden="true">
      <div className="glow_field">
        <i className="glow_blob is-cobalt" />
        <i className="glow_blob is-aqua" />
        <i className="glow_blob is-signal" />
        <i className="glow_blob is-violet" />
      </div>
      <canvas ref={canvasRef} className="glow_canvas" />
    </div>
  );
}

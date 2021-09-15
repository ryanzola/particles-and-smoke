import * as THREE from 'three'

import vertex from '../shaders/particles/vertex.glsl'
import fragment from '../shaders/particles/fragment.glsl'

export default class Particles {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.resources = this.experience.resources

    this.count = 2000

    if(this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'particles'
      })

      this.debugFolder.addInput(
        this,
        'count',
        { min: 100, max: 1000000, step: 1 }
      )
      .on('change', () => {
        this.setGeometry()
        this.points.geometry = this.geometry
      })
    }

    this.setGeometry()
    this.setMaterial()
    this.setPoints()
  }

  setGeometry() {
    if(this.geometry) {
      this.geometry.dispose()
    }

    this.geometry = new THREE.BufferGeometry()

    const postitionArray = new Float32Array(this.count * 3)
    const progressArray = new Float32Array(this.count)
    const scaleArray = new Float32Array(this.count)
    const alphaArray = new Float32Array(this.count)

    for(let i = 0; i < this.count; i++) {
      postitionArray[i * 3 + 0] = (Math.random() - 0.5) * 20
      postitionArray[i * 3 + 1] = 0
      postitionArray[i * 3 + 2] = (Math.random() - 0.5) * 10

      scaleArray[i] = Math.random()
      progressArray[i] = Math.random()
      alphaArray[i] = Math.random()
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(postitionArray, 3))
    this.geometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scaleArray, 1))
    this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressArray, 1))
    this.geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1))
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uPerlinFrequency: { value: 0.17 },
        uPerlinMultiplier: { value: 1 },
        uPixelRatio: { value: Math.min(Math.max(window.devicePixelRatio), 2) },
        uProgressSpeed: { value: 0.00001 },
        uSize: { value: 25.0 },
        uMask: { value: this.resources.items.particleMaskTexure }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    })

    if(this.debug) {
      this.debugFolder
        .addInput(
          this.material.uniforms.uSize, 
          'value',
          { min: 0, max: 200, step: 1, label: 'uSize' }
        )
        
      this.debugFolder
        .addInput(
          this.material.uniforms.uProgressSpeed,
          'value',
          { min: 0, max: 0.00003, step: 0.00001, label: 'uProgressSpeed' }
        )

      this.debugFolder
        .addInput(
          this.material.uniforms.uPerlinFrequency,
          'value',
          { min: 0, max: 0.5, step: 0.01, label: 'uPerlinFrequency'}
        )

      this.debugFolder
        .addInput(
          this.material.uniforms.uPerlinMultiplier,
          'value',
          { min: 0, max: 2, step: 0.01, label: 'uPerlinMultiplier' }
        )
    }
  }
  
  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material)
    this.points.position.y = - 5
    this.scene.add(this.points)
  }

  update() {
    if(this.material)
      this.material.uniforms.uTime.value = this.time.elapsed
  }
}
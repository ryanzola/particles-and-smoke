import * as THREE from 'three'

export default class Smoke {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.resources = this.experience.resources
    this.world = this.experience.world

    if(this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'smoke'
      })
    }

    this.count = 10;
    this.group = new THREE.Group()
    this.group.position.y = - 2
    this.scene.add(this.group)

    this.setGeometry()
    this.setColor()
    this.setItems()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
  }

  setColor() {
    this.color = {}

    this.color.value = '#1a2036'
    this.color.instance = new THREE.Color(this.color.value)

    if(this.debug) {
      this.debugFolder.addInput(
        this.color,
        'value',
        {
          label: 'color'
        }
      )
      .on('change', () => {
        this.color.instance.set(this.color.value)
      })
    }
  }
  
  setItems() {
    this.items = []

    for(let i = 0; i < this.count; i++) {
      const item = {}

      item.floatingSpeed = Math.random() * 0.0005
      item.rotationSpeed = (Math.random() - 0.5) * Math.random() * 0.001

      this.material = new THREE.MeshBasicMaterial({
        depthWrite: false,
        transparent: true,
        blending: THREE.AdditiveBlending,
        alphaMap: this.resources.items.smokeTexture,
        opacity: 0.05 + Math.random() * 0.2
      })

      this.material.color = this.color.instance 

      
      // mesh
      const scale = 3 + Math.random() * 3

      item.mesh = new THREE.Mesh(this.geometry, this.material)
      item.mesh.scale.set(scale, scale, scale)
      item.mesh.position.x = (Math.random() - 0.5) * 10 

      // save
      this.group.add(item.mesh)
      this.items.push(item)
    }
  } 

  resize() {

  }

  update() {
    const elapsedTime = this.time.elapsed + 123456789.123

    this.color.instance.copy(this.world.gradient.colors.start.instance)
    this.color.instance.lerp(new THREE.Color(0xffffff), 0.2)

    for(const _item of this.items) {
      _item.mesh.rotation.z = elapsedTime * _item.rotationSpeed
      _item.mesh.position.y = Math.sin(elapsedTime * _item.floatingSpeed)
    }
  }
}
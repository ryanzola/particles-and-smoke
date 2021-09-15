import * as THREE from 'three'
import Gradient from './Utils/Gradient'
import Particles from './Utils/Particles'
import Smoke from './Utils/Smoke'
import Vignette from './Utils/Vignette'

export default class World
{
    constructor(_options)
    {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setGradient()
                this.setSmoke()
                this.setVignette()
                this.setParticles()
            }
        })
    }

    setGradient() {
        this.gradient = new Gradient()
    }

    setParticles() {
        this.particles = new Particles()
    }

    setSmoke() {
        this.smoke = new Smoke()
    }

    setVignette() {
        this.vignette = new Vignette()
    }

    resize()
    {
        if(this.smoke)
            this.smoke.resize()
    }

    update()
    {
        if(this.gradient)
            this.gradient.update()

        if(this.particles)
            this.particles.update()

        if(this.smoke)
            this.smoke.update()
    }

    destroy()
    {
    }
}
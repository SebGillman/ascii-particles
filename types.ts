import { asciify } from "./utils.ts";

export class Particle {
  x: number;
  y: number;
  intensity: number;
  lifetime: number;

  constructor(x: number, y: number, intensity: number, lifetime: number) {
    this.x = x;
    this.y = y;
    this.intensity = intensity;
    this.lifetime = lifetime;
  }
}

export class ParticleParams {
  X: number;
  Y: number;
  maxIntensity: number;
  maxLifetime: number;

  constructor(X: number, Y: number, maxIntensity: number, maxLifetime: number) {
    this.X = X;
    this.Y = Y;
    this.maxIntensity = maxIntensity;
    this.maxLifetime = maxLifetime;
  }
}

export class ParticleSystem {
  params: ParticleParams;
  particles: Particle[];

  constructor(params: ParticleParams) {
    this.params = params;
    this.particles = [];
  }

  generateSymbols(): string[][] {
    const intensityGrid: number[][] = new Array(this.params.Y)
      .fill(null)
      .map(() => new Array(this.params.X * 2 + 1).fill(0));

    for (const particle of this.particles) {
      if (particle.y >= this.params.Y || particle.lifetime <= 0) {
        continue;
      }

      intensityGrid[particle.y][particle.x + this.params.X] +=
        particle.intensity;
    }

    const newSymbols: string[][] = [];
    for (const intensityRow of intensityGrid) {
      newSymbols.push(
        intensityRow.map((intensity) => {
          return asciify(intensity, this.params.maxIntensity);
        })
      );
    }

    return newSymbols;
  }

  update(): void {
    this.particles = this.particles
      .map((particle) => {
        const newX = particle.x + Math.round(Math.random() * 8 - 4);
        const newY = particle.y + 1;
        const newIntensity = Math.floor(
          (particle.intensity * (particle.lifetime - 1)) / particle.lifetime
        );
        const newLifetime = particle.lifetime - 1;

        return new Particle(newX, newY, newIntensity, newLifetime);
      })
      .filter((element) => {
        return !(element.y >= this.params.Y || element.lifetime <= 0);
      });

    for (
      let cx = Math.floor(-0.5 * this.params.X);
      cx <= Math.floor(0.5 * this.params.X);
      cx = cx + 1
    ) {
      const intensity = Math.floor(
        (Math.random() *
          (this.params.maxIntensity * (this.params.X - Math.abs(cx)))) /
          this.params.X
      );
      const lifetime = Math.floor(
        this.params.maxLifetime / 2 + Math.random() * this.params.maxLifetime
      );

      this.particles.push(new Particle(cx, 0, intensity, lifetime));
    }
    return;
  }
}

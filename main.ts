import { ParticleParams, ParticleSystem } from "./types.ts";

async function timeOut(millis: number) {
  await new Promise((res) => setTimeout(res, millis));
}

if (import.meta.main) {
  const X = 75;
  const Y = 50;
  const maxIntensity = 1000;
  const maxLifetime = 10;

  const params = new ParticleParams(X, Y, maxIntensity, maxLifetime);

  const system = new ParticleSystem(params);

  for (let iteration = 0; iteration < 10000; iteration++) {
    system.update();

    let res = system
      .generateSymbols()
      .reverse()
      .map((row) => row.join(""))
      .join("\n");
    for (let i = 0; i < Y; i++) {
      res += "\x1b[F";
    }
    console.log(res);

    await timeOut(80);
  }
}

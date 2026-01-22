import fftjs from "fft-js";
const { fft, util } = fftjs;
// Asumo que 'eventos' es un objeto de base de datos que puede usar 'find'
import { eventos } from "../models/nodoModel.js";

// En un entorno Node/ES module, esto debería estar dentro de una función async si usas await
export async function processData(id) {
  // <-- Agregado async
  // const data = eventos.find(); // FIX: Esto puede ser asíncrono

  const data = await eventos.findOne({ trigger: id }); // Ejemplo para Mongoose

  if (!data || data.length === 0) {
    console.log("No hay eventos en la base de datos");
    // process.exit(); // O manejar el error de otra manera
    return; // Salir de la función
  }
  const formula = (v) => (v / 28) * 1000;

  const ejeXValores = data.eje_x.map((p) => Number(p.value)) || 0;
  const ejeYValores = data.eje_y.map((p) => Number(p.value)) || 0;
  const ejeZValores = data.eje_z.map((p) => Number(p.value)) || 0;
  const vectorSumaValores = data.vector_suma.map((p) => Number(p.value) || 0);

  const N_original = ejeXValores.length;
  console.log("noriginal", N_original);

  let sampleRate = data.sample_rate_detected;
  console.log("sampleRate detectado:", sampleRate);

  if (!sampleRate && data.eje_x.length > 1) {
    const firstDatetime = new Date(data.eje_x[0].datetime);
    const lastDatetime = new Date(data.eje_x[data.eje_x.length - 1].datetime);
    const durationSeconds = (lastDatetime - firstDatetime) / 1000;
    sampleRate = (data.eje_x.length - 1) / durationSeconds;
    console.log("Sample rate calculado desde datetimes:", sampleRate);
  }

  sampleRate = sampleRate || 4096;
  console.log("sampleRate usado:", sampleRate);

  function padToPowerOfTwo(arr) {
    // Determinar siguiente potencia de 2
    let size = 1;
    while (size < arr.length) size *= 2;

    // Crear arreglo con ceros
    const padded = new Array(size).fill(0);

    // Copiar valores originales
    for (let i = 0; i < arr.length; i++) {
      padded[i] = arr[i];
    }

    return padded;
  }
  function applyHann(data) {
    const N = data.length;
    console.log("N: ", N);
    console.log(Array.isArray(data));
    console.log(data.length);
    console.log(data[0]);
    const out = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1));
      out[i] = data[i] * w;
    }
    return out;
  }

  const hanndataX = applyHann(ejeXValores);
  const hanndataY = applyHann(ejeYValores);
  const hanndataZ = applyHann(ejeZValores);
  const hanndataVectosuma = applyHann(vectorSumaValores);

  const ejeXPadded = padToPowerOfTwo(hanndataX);
  const ejeYPadded = padToPowerOfTwo(hanndataY);
  const ejeZPadded = padToPowerOfTwo(hanndataZ);
  const vectorSumaPadded = padToPowerOfTwo(hanndataVectosuma);

  const lenPadded = ejeXPadded.length;
  //console.log("lenpadded", ejeXValores);
  // Calculamos la FFT en el array PADDED
  //console.log("hanndata: ", hanndata);
  var phasorsX = fft(ejeXPadded);
  var phasorsY = fft(ejeYPadded);
  var phasorsZ = fft(ejeZPadded);
  var phasorsVectosuma = fft(vectorSumaPadded);
  //console.log(phasors);
  const NX = ejeXPadded.length;
  const NY = ejeYPadded.length;
  const NZ = ejeZPadded.length;
  const NV = vectorSumaPadded.length;

  phasorsX = phasorsX.map(([re, im]) => [re / NX / 2, im / NX / 2]);
  phasorsY = phasorsY.map(([re, im]) => [re / NY / 2, im / NY / 2]);
  phasorsZ = phasorsZ.map(([re, im]) => [re / NZ / 2, im / NZ / 2]);
  phasorsVectosuma = phasorsVectosuma.map(([re, im]) => [
    re / NV / 2,
    im / NV / 2,
  ]);
  /* phasorsX = phasorsX.slice(0, NX / 2);
  phasorsY = phasorsY.slice(0, NY / 2);
  phasorsZ = phasorsZ.slice(0, NZ / 2);
  phasorsVectosuma = phasorsVectosuma.slice(0, NV / 2); */

  var frequenciesX = util.fftFreq(phasorsX, 4096);
  var frequenciesY = util.fftFreq(phasorsY, 4096);
  var frequenciesZ = util.fftFreq(phasorsZ, 4096);
  var frequenciesVectosuma = util.fftFreq(phasorsVectosuma, 4096);

  frequenciesX = frequenciesX.slice(0, NX / 2);
  frequenciesY = frequenciesY.slice(0, NY / 2);
  frequenciesZ = frequenciesZ.slice(0, NZ / 2);
  frequenciesVectosuma = frequenciesVectosuma.slice(0, NV / 2);

  var magnitudesX = util.fftMag(phasorsX);
  var magnitudesY = util.fftMag(phasorsY);
  var magnitudesZ = util.fftMag(phasorsZ);
  var magnitudesVectosuma = util.fftMag(phasorsVectosuma);

  var bothX = frequenciesX.map((f, i) => {
    return [f, magnitudesX[i]];
  });
  var bothY = frequenciesY.map((f, i) => {
    return [f, magnitudesY[i]];
  });
  var bothZ = frequenciesZ.map((f, i) => {
    return [f, magnitudesZ[i]];
  });
  var bothVectosuma = frequenciesVectosuma.map((f, i) => {
    return [f, magnitudesVectosuma[i]];
  });

  //const maxval = Math.max(...magnitudes);
  //const maxfreq = frequencies[magnitudes.indexOf(maxval)];
  //console.log("maxfreq: ", maxfreq);
  //console.log("maxval: ", maxval);
  //console.log(both);
  /* console.log("aqui empieza el json");
  console.log(
    "tamaño de magnitudes: ",
    magnitudes.length,
    " tamaño de frecuencias: ",
    frequencies.length,
  ); */
  return JSON.stringify({
    x: { frequencies: frequenciesX, magnitudes: magnitudesX },
    y: { frequencies: frequenciesY, magnitudes: magnitudesY },
    z: { frequencies: frequenciesZ, magnitudes: magnitudesZ },
    vector_suma: {
      frequencies: frequenciesVectosuma,
      magnitudes: magnitudesVectosuma,
    },
  });
}

// Llama a la función principal para ejecutar el código

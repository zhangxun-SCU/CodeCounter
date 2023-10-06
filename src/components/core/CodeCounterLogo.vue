<script setup lang="ts">
import {initShaderProgram} from '@/utils/my-commoms/program.ts';
import {initBuffers} from "@/utils/my-commoms/buffer.ts";
import {onMounted} from "vue";
import {mat4} from '@/assets/js/esm/index.js';

onMounted(() => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const {positionBuffer, colorBuffer} = initBuffers(gl, vertexData, colorData);
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const positionLocation = gl.getAttribLocation(shaderProgram, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  const colorLocation = gl.getAttribLocation(shaderProgram, 'color');
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(shaderProgram);
  gl.enable(gl.DEPTH_TEST);


  const uniformLocation = {
    matrix: gl.getUniformLocation(shaderProgram, 'matrix'),
  };
  let matrix = mat4.create();
  let projectionMatrix = mat4.create();
  let finalMatrix = mat4.create();
  gl.uniformMatrix4fv(uniformLocation.matrix, false, matrix);


  (function render() {
    mat4.rotateX(matrix, matrix, Math.PI / 180);
    mat4.rotateY(matrix, matrix, Math.PI / 180);
    mat4.rotateZ(matrix, matrix, Math.PI / 180);
    mat4.multiply(finalMatrix, projectionMatrix, matrix);
    gl.uniformMatrix4fv(uniformLocation.matrix, false, finalMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
    requestAnimationFrame(render);
  })();

})

const vertex = {
  v1: [-0.5, 0.5, 0.5],
  v2: [0.5, 0.5, 0.5],
  v3: [-0.5, -0.5, 0.5],
  v4: [0.5, -0.5, 0.5],
  v5: [-0.5, 0.5, -0.5],
  v6: [0.5, 0.5, -0.5],
  v7: [-0.5, -0.5, -0.5],
  v8: [0.5, -0.5, -0.5]
};

const vertexData:number[] = [
  // front
  ...vertex.v1,
  ...vertex.v2,
  ...vertex.v3,
  ...vertex.v3,
  ...vertex.v2,
  ...vertex.v1,
  // left
  ...vertex.v1,
  ...vertex.v3,
  ...vertex.v5,
  ...vertex.v5,
  ...vertex.v3,
  ...vertex.v7,
  // right
  ...vertex.v2,
  ...vertex.v4,
  ...vertex.v6,
  ...vertex.v6,
  ...vertex.v4,
  ...vertex.v8,
  // top
  ...vertex.v1,
  ...vertex.v2,
  ...vertex.v5,
  ...vertex.v5,
  ...vertex.v2,
  ...vertex.v6,
  // bottom
  ...vertex.v3,
  ...vertex.v4,
  ...vertex.v7,
  ...vertex.v7,
  ...vertex.v4,
  ...vertex.v8,
  // back
  ...vertex.v5,
  ...vertex.v6,
  ...vertex.v7,
  ...vertex.v7,
  ...vertex.v6,
  ...vertex.v8
];

const colorData:number[] = [

];

function genColor() {
  for(let i = 0; i < 36; ++i) {
    colorData.push(...[Math.random(), Math.random(), Math.random()]);
  }
}

genColor();


let vsSource:string = `
precision highp float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;
uniform mat4 matrix;
void main() {
    vColor = color;
    gl_Position = matrix * vec4(position, 1);
}
`;

let fsSource:string = `
precision highp float;

varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1);
}
`;

defineProps(['size']);

</script>

<template>
<canvas id="canvas">

</canvas>
</template>

<style scoped>

#canvas {
  width: v-bind(size);
  height: v-bind(size);
}

</style>
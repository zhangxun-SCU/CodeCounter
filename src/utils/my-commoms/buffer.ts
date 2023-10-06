function initBuffers(gl, positionData, colorData) {
    const positionBuffer = initBuffer(gl, positionData);
    const colorBuffer = initBuffer(gl, colorData);
    return {
        positionBuffer,
        colorBuffer
    }
}

function initBuffer(gl, data) {
    const buffer = gl.createBuffer();
    bindBufferData(gl, buffer, data);
    return buffer;
}

function bindBufferData(gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
}

export {initBuffers, bindBufferData};
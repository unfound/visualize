// interface WebGLRenderingContext {
//     program?: WebGLProgram;
// }

/**
 * 获取webgl的绘图上下文
 * @param canvas canvas对象
 * @returns webgl的绘图上下文 | null
 */
export function getWebGLContext(canvas: HTMLCanvasElement) {
    return canvas.getContext('webgl')
}

/**
 * 初始化shader程序，创建program对象并赋值给gl.program
 * @param gl GL context
 * @param vshader 顶点着色器
 * @param fshader 片元着色器
 * @returns program成功创建返回true
 */
export function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    const program = createProgram(gl, vshader, fshader)
    if (!program) {
        console.log('Fail to create program')
        return false
    }

    gl.useProgram(program)
    gl.program = program

    return true
}
/**
 * 加载shader并链接program
 * @param gl GL context
 * @param vshader 顶点着色器
 * @param fshader 片元着色器 
 * @returns 创建成功则返回已经加载shader并链接的program，失败则返回null
 */
export function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    // 创建shader对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader)
    if (!vertexShader || !fragmentShader) {
        return null
    }
    // 创建program对象
    const program = gl.createProgram()
    if (!program) {
        return null
    }
    // 激活shader
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    // 链接program
    gl.linkProgram(program)
    // 校验链接结果
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!linked) {
        const error = gl.getProgramInfoLog(program)
        console.log('Failed to link program: ' + error)
        gl.deleteProgram(program)
        gl.deleteShader(fragmentShader)
        gl.deleteShader(vertexShader)
        return null
    }

    return program
}
/**
 * 创建shader对象
 * @param gl GL context
 * @param type shader的类型
 * @param source 着色器程序
 * @returns 返回成功创建的shader对象，失败则返回null
 */
export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    // 创建shader对象
    const shader = gl.createShader(type)
    if (!shader) {
        console.log('unable to create shader')
        return null
    }
    // 设置shader程序
    gl.shaderSource(shader, source)
    // 编译shader
    gl.compileShader(shader)
    // 校验编译结果
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!compiled) {
        const error = gl.getShaderInfoLog(shader)
        console.log('Failed to compile shader: ' + error)
        gl.deleteShader(shader)
        return null
    }

    return shader
}

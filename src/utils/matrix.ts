/**
 * 4*4矩阵类
 * 该类包含等效于OpenGL矩阵堆栈的功能
 * 转换后的矩阵是从右边乘以一个转换矩阵来计算的
 * 矩阵会被计算结果替代
 */

export default class Matrix4 {
    elements: Float32Array

    constructor(opt?: Matrix4 | Float32Array) {
        let src_elements
        const elements = new Float32Array(16)
        if (opt instanceof Matrix4) {
            src_elements = opt.elements
        } else if (opt instanceof Float32Array) {
            src_elements = opt
        }
        if (!src_elements) {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        } else {
            for (let i = 0; i < 16; i++) {
                elements[i] = src_elements[i]
            }
            this.elements = elements
        }
    }
    /**
     * 设置单位矩阵
     */
    setIdentity() {
        const els = this.elements
        els[0] = 1; els[4] = 0; els[8] = 0; els[12] = 0;
        els[1] = 0; els[5] = 1; els[9] = 0; els[13] = 0;
        els[2] = 0; els[6] = 0; els[10] = 1; els[14] = 0;
        els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        return this
    }

    /**
     * 复制目标矩阵, 目标矩阵和生成的结果矩阵可能会指向同一个引用
     */
    set(src: Matrix4) {
        if (src.elements === this.elements) {
            return this
        }

        for (let i = 0; i < 16; i++) {
            this.elements[i] = src.elements[i]
        }

        return this
    }
    /**
     * 复制目标矩阵，目标矩阵和生成的结果矩阵肯定不指向同一引用
     */
    clone(src: Matrix4) {
        const elements = new Float32Array(16)
        for (let i = 0; i < 16; i++) {
            elements[i] = src.elements[i]
        }
        this.elements = elements

        return this
    }
    /**
     * 右乘一个矩阵
     */
    multiply(other: Matrix4) {
        // 如果两个矩阵指向同一个引用的话, 克隆一份
        if (this.elements === other.elements) {
            this.clone(other)
        }
        const a = this.elements
        const b = other.elements
        let ai0: number, ai1: number, ai2: number, ai3: number

        for (let i = 0; i < 4; i++) {
            ai0 = a[i]; ai1 = a[i + 4]; ai2 = a[i + 8]; ai3 = a[i + 12];
            a[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            a[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            a[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            a[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }

        return this
    }
    /**
     * 右乘一个矩阵
     */
    concat = this.multiply
    /**
     * 转置矩阵
     */
    transpose() {
        const els = this.elements
        let n: number

        n = els[1]; els[1] = els[4]; els[4] = n;
        n = els[2]; els[2] = els[8]; els[8] = n;
        n = els[3]; els[3] = els[12]; els[12] = n;
        n = els[6]; els[6] = els[9]; els[9] = n;
        n = els[7]; els[7] = els[13]; els[13] = n;
        n = els[11]; els[11] = els[14]; els[14] = n;

        return this
    }
    /**
     * 计算给定矩阵的逆矩阵并设置到this中
     */
    setInverseOf(other: Matrix4) {
        let det: number
        const s = other.elements
        const d = this.elements
        const inv = new Float32Array(16)

        inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
            + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
        inv[4] = - s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
            - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
        inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
            + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
        inv[12] = - s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
            - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];

        inv[1] = - s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
            - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
        inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
            + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
        inv[9] = - s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
            - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
        inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
            + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];

        inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
            + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
        inv[6] = - s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
            - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
        inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
            + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
        inv[14] = - s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
            - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];

        inv[3] = - s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
            - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
        inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
            + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
        inv[11] = - s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
            - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
        inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
            + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];

        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }

        det = 1 / det;
        for (let i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }

        return this;
    }
    /**
     * 计算当前矩阵的逆矩阵
     */
    invert() {
        return this.setInverseOf(this)
    }
    /**
     * 设置正交投影矩阵
     * @param left 剪切平面左侧的坐标
     * @param right 剪切平面右侧的坐标
     * @param bottom 剪切平面下侧的坐标
     * @param top 剪切平面上侧的坐标
     * @param near 到较近深度剪裁平面的距离 如果平面位于观察者后面，则此值为负
     * @param far 到更远深度剪切平面的距离 如果平面位于观察者后面，则此值为负
     * @return this
     */
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        if (left === right || bottom === top || near === far) {
            throw 'null frustum'
        }

        let rw = 1 / (right - left)
        let rh = 1 / (top - bottom)
        let rd = 1 / (far - near)

        const els = this.elements
        els[0] = 2 * rw;
        els[1] = 0;
        els[2] = 0;
        els[3] = 0;

        els[4] = 0;
        els[5] = 2 * rh;
        els[6] = 0;
        els[7] = 0;

        els[8] = 0;
        els[9] = 0;
        els[10] = -2 * rd;
        els[11] = 0;

        els[12] = -(right + left) * rw;
        els[13] = -(top + bottom) * rh;
        els[14] = -(far + near) * rd;
        els[15] = 1;

        return this
    }
    /**
     * 右乘正交投影矩阵
     * @param left 剪切平面左侧的坐标
     * @param right 剪切平面右侧的坐标
     * @param bottom 剪切平面下侧的坐标
     * @param top 剪切平面上侧的坐标
     * @param near 到较近深度剪裁平面的距离 如果平面位于观察者后面，则此值为负
     * @param far 到更远深度剪切平面的距离 如果平面位于观察者后面，则此值为负
     * @return this
     */
    ortho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        return this.multiply(new Matrix4().setOrtho(left, right, bottom, top, near, far))
    }
    /**
     * 设置透视投影矩阵
     * @param left 剪切平面左侧的坐标
     * @param right 剪切平面右侧的坐标
     * @param bottom 剪切平面下侧的坐标
     * @param top 剪切平面上侧的坐标
     * @param near 到较近深度剪裁平面的距离 必须为正
     * @param far 到更远深度剪切平面的距离 必须为正
     * @return this
     */
    setFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        if (left === right || bottom === top || near === far) {
            throw 'null frustum'
        }

        if (near <= 0) {
            throw 'near <= 0';
        }

        if (far <= 0) {
            throw 'far <= 0';
        }

        let rw = 1 / (right - left)
        let rh = 1 / (top - bottom)
        let rd = 1 / (far - near)

        const els = this.elements

        els[0] = 2 * near * rw;
        els[1] = 0;
        els[2] = 0;
        els[3] = 0;

        els[4] = 0;
        els[5] = 2 * near * rh;
        els[6] = 0;
        els[7] = 0;

        els[8] = (right + left) * rw;
        els[9] = (top + bottom) * rh;
        els[10] = -(far + near) * rd;
        els[11] = -1;

        els[12] = 0;
        els[13] = 0;
        els[14] = -2 * near * far * rd;
        els[15] = 0;

        return this
    }
    /**
     * 右乘透视投影矩阵
     * @param left 剪切平面左侧的坐标
     * @param right 剪切平面右侧的坐标
     * @param bottom 剪切平面下侧的坐标
     * @param top 剪切平面上侧的坐标
     * @param near 到较近深度剪裁平面的距离 必须为正
     * @param far 到更远深度剪切平面的距离 必须为正
     * @return this
     */
    frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        return this.multiply(new Matrix4().setFrustum(left, right, bottom, top, near, far))
    }
    /**
     * 通过fovy和aspect来设置透视投影矩阵
     * @param fovy 可视空间上下边之间的夹角
     * @param aspect 可视空间的宽高比（width/height）
     * @param near 到较近深度剪裁平面的距离 必须为正
     * @param far 到更远深度剪切平面的距离 必须为正
     * @return this
     */
    setPerspective(fovy: number, aspect: number, near: number, far: number) {
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }

        fovy = Math.PI * fovy / 180 / 2
        let s = Math.sin(fovy)
        if (s === 0) {
            throw 'null frustum'
        }

        let rd = 1 / (far - near)
        let ct = Math.cos(fovy) / s

        const els = this.elements
        els[0] = ct / aspect;
        els[1] = 0;
        els[2] = 0;
        els[3] = 0;

        els[4] = 0;
        els[5] = ct;
        els[6] = 0;
        els[7] = 0;

        els[8] = 0;
        els[9] = 0;
        els[10] = -(far + near) * rd;
        els[11] = -1;

        els[12] = 0;
        els[13] = 0;
        els[14] = -2 * near * far * rd;
        els[15] = 0;

        return this
    }
    /**
     * 右乘透视投影矩阵
     * @param fovy 可视空间上下边之间的夹角
     * @param aspect 可视空间的宽高比（width/height）
     * @param near 到较近深度剪裁平面的距离 必须为正
     * @param far 到更远深度剪切平面的距离 必须为正
     * @return this
     */
    perspective(fovy: number, aspect: number, near: number, far: number) {
        return this.multiply(new Matrix4().setPerspective(fovy, aspect, near, far))
    }
    /**
     * 设置缩放矩阵
     * @param x x轴缩放比例
     * @param y y轴缩放比例
     * @param z z轴缩放比例
     * @returns this
     */
    setScale(x: number, y: number, z: number) {
        const els = this.elements
        els[0] = x; els[4] = 0; els[8] = 0; els[12] = 0;
        els[1] = 0; els[5] = y; els[9] = 0; els[13] = 0;
        els[2] = 0; els[6] = 0; els[10] = z; els[14] = 0;
        els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        return this
    }
    /**
     * 右乘缩放矩阵
     * @param x x轴缩放比例
     * @param y y轴缩放比例
     * @param z z轴缩放比例
     * @returns this
     */
    scale(x: number, y: number, z: number) {
        const els = this.elements
        els[0] *= x; els[4] *= y; els[8] *= z;
        els[1] *= x; els[5] *= y; els[9] *= z;
        els[2] *= x; els[6] *= y; els[10] *= z;
        els[3] *= x; els[7] *= y; els[11] *= z;
        return this
    }
    /**
     * 设置平移矩阵
     * @param x x轴的偏移量
     * @param y y轴的偏移量
     * @param z z轴的偏移量
     * @returns this
     */
    setTranslate(x: number, y: number, z: number) {
        const els = this.elements
        els[0] = 1; els[4] = 0; els[8] = 0; els[12] = x;
        els[1] = 0; els[5] = 1; els[9] = 0; els[13] = y;
        els[2] = 0; els[6] = 0; els[10] = 1; els[14] = z;
        els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        return this
    }
    /**
     * 右乘平移矩阵
     * @param x x轴的偏移量
     * @param y y轴的偏移量
     * @param z z轴的偏移量
     * @returns this
     */
    translate(x: number, y: number, z: number) {
        const els = this.elements
        els[12] += els[0] * x + els[4] * y + els[8] * z;
        els[13] += els[1] * x + els[5] * y + els[9] * z;
        els[14] += els[2] * x + els[6] * y + els[10] * z;
        els[15] += els[3] * x + els[7] * y + els[11] * z;
        return this
    }
    /**
     * 设置旋转矩阵
     * 旋转轴向量可能未初始化
     * @param angle 绕旋转轴旋转角度 角度制
     * @param x 旋转轴向量的x分量
     * @param y 旋转轴向量的y分量
     * @param z 旋转轴向量的z分量
     * @returns this
     */
    setRotate(angle: number, x: number, y: number, z: number) {
        angle = Math.PI * angle / 180
        const els = this.elements
        let s = Math.sin(angle)
        let c = Math.cos(angle)

        if (0 !== x && 0 === y && 0 === z) {
            // Rotation around X axis
            if (x < 0) {
                s = -s;
            }
            els[0] = 1; els[4] = 0; els[8] = 0; els[12] = 0;
            els[1] = 0; els[5] = c; els[9] = -s; els[13] = 0;
            els[2] = 0; els[6] = s; els[10] = c; els[14] = 0;
            els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        } else if (0 === x && 0 !== y && 0 === z) {
            // Rotation around Y axis
            if (y < 0) {
                s = -s;
            }
            els[0] = c; els[4] = 0; els[8] = s; els[12] = 0;
            els[1] = 0; els[5] = 1; els[9] = 0; els[13] = 0;
            els[2] = -s; els[6] = 0; els[10] = c; els[14] = 0;
            els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        } else if (0 === x && 0 === y && 0 !== z) {
            // Rotation around Z axis
            if (z < 0) {
                s = -s;
            }
            els[0] = c; els[4] = -s; els[8] = 0; els[12] = 0;
            els[1] = s; els[5] = c; els[9] = 0; els[13] = 0;
            els[2] = 0; els[6] = 0; els[10] = 1; els[14] = 0;
            els[3] = 0; els[7] = 0; els[11] = 0; els[15] = 1;
        } else {
            // Rotation around another axis
            const len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                const rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            const nc = 1 - c;
            const xy = x * y;
            const yz = y * z;
            const zx = z * x;
            const xs = x * s;
            const ys = y * s;
            const zs = z * s;

            els[0] = x * x * nc + c;
            els[1] = xy * nc + zs;
            els[2] = zx * nc - ys;
            els[3] = 0;

            els[4] = xy * nc - zs;
            els[5] = y * y * nc + c;
            els[6] = yz * nc + xs;
            els[7] = 0;

            els[8] = zx * nc + ys;
            els[9] = yz * nc - xs;
            els[10] = z * z * nc + c;
            els[11] = 0;

            els[12] = 0;
            els[13] = 0;
            els[14] = 0;
            els[15] = 1;
        }
        return this
    }
    /**
     * 右乘旋转矩阵
     * 旋转轴向量可能未初始化
     * @param angle 绕旋转轴旋转角度 角度制
     * @param x 旋转轴向量的x分量
     * @param y 旋转轴向量的y分量
     * @param z 旋转轴向量的z分量
     * @returns this
     */
    rotate(angle: number, x: number, y: number, z: number) {
        return this.multiply(new Matrix4().setRotate(angle, x, y, z));
    }
    /**
     * 设置视图矩阵
     * @param eyeX 视点的x坐标
     * @param eyeY 视点的y坐标
     * @param eyeZ 视点的z坐标
     * @param centerX 观察点的x坐标
     * @param centerY 观察点的y坐标
     * @param centerZ 观察点的z坐标
     * @param upX 上方向的x分量
     * @param upY 上方向的y分量
     * @param upZ 上方向的z分量
     * @returns this
     */
    setLookAt(
        eyeX: number, eyeY: number, eyeZ: number,
        centerX: number, centerY: number, centerZ: number,
        upX: number, upY: number, upZ: number,
    ) {
        let fx = centerX - eyeX;
        let fy = centerY - eyeY;
        let fz = centerZ - eyeZ;

        // Normalize f.
        const rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Calculate cross product of f and up.
        let sx = fy * upZ - fz * upY;
        let sy = fz * upX - fx * upZ;
        let sz = fx * upY - fy * upX;

        // Normalize s.
        const rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;

        // Calculate cross product of s and f.
        const ux = sy * fz - sz * fy;
        const uy = sz * fx - sx * fz;
        const uz = sx * fy - sy * fx;

        // Set to this.
        const els = this.elements;
        els[0] = sx;
        els[1] = ux;
        els[2] = -fx;
        els[3] = 0;

        els[4] = sy;
        els[5] = uy;
        els[6] = -fy;
        els[7] = 0;

        els[8] = sz;
        els[9] = uz;
        els[10] = -fz;
        els[11] = 0;

        els[12] = 0;
        els[13] = 0;
        els[14] = 0;
        els[15] = 1;

        return this.translate(-eyeX, -eyeY, -eyeZ)
    }
    /**
     * 右乘视图矩阵
     * @param eyeX 视点的x坐标
     * @param eyeY 视点的y坐标
     * @param eyeZ 视点的z坐标
     * @param centerX 观察点的x坐标
     * @param centerY 观察点的y坐标
     * @param centerZ 观察点的z坐标
     * @param upX 上方向的x分量
     * @param upY 上方向的y分量
     * @param upZ 上方向的z分量
     * @returns this
     */
    lookAt(
        eyeX: number, eyeY: number, eyeZ: number,
        centerX: number, centerY: number, centerZ: number,
        upX: number, upY: number, upZ: number,
    ) {
        return this.multiply(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ))
    }
    /**
     * Multiply the matrix for project vertex to plane from the right.
     * @param plane The array[A, B, C, D] of the equation of plane "Ax + By + Cz + D = 0".
     * @param light The array which stored coordinates of the light. if light[3]=0, treated as parallel light.
     * @return this
     */
    dropShadow(plane: number[], light: number[]) {
        const mat = new Matrix4()
        const els = mat.elements
        const dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

        els[0] = dot - light[0] * plane[0];
        els[1] = - light[1] * plane[0];
        els[2] = - light[2] * plane[0];
        els[3] = - light[3] * plane[0];

        els[4] = - light[0] * plane[1];
        els[5] = dot - light[1] * plane[1];
        els[6] = - light[2] * plane[1];
        els[7] = - light[3] * plane[1];

        els[8] = - light[0] * plane[2];
        els[9] = - light[1] * plane[2];
        els[10] = dot - light[2] * plane[2];
        els[11] = - light[3] * plane[2];

        els[12] = - light[0] * plane[3];
        els[13] = - light[1] * plane[3];
        els[14] = - light[2] * plane[3];
        els[15] = dot - light[3] * plane[3];

        return this.multiply(mat)
    }
    /**
     * Multiply the matrix for project vertex to plane from the right.(Projected by parallel light.)
     * @param normX, normY, normZ The normal vector of the plane.(Not necessary to be normalized.)
     * @param planeX, planeY, planeZ The coordinate of arbitrary points on a plane.
     * @param lightX, lightY, lightZ The vector of the direction of light.(Not necessary to be normalized.)
     * @return this
     */
    dropShadowDirectionally(
        normX: number, normY: number, normZ: number,
        planeX: number, planeY: number, planeZ: number,
        lightX: number, lightY: number, lightZ: number,
    ) {
        const a = planeX * normX + planeY * normY + planeZ * normZ;
        return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
    }
    /**
     * Multiply the three-dimensional vector.
     * @param vec3  The multiply vector
     * @return The result of multiplication(Float32Array)
     */
    multiplyVector3(vec3: Vector3) {
        const els = this.elements
        const v3 = vec3.elements
        const v = new Vector3()
        const result = v.elements

        result[0] = v3[0] * els[0] + v3[1] * els[4] + v3[2] * els[8] + els[11];
        result[1] = v3[0] * els[1] + v3[1] * els[5] + v3[2] * els[9] + els[12];
        result[2] = v3[0] * els[2] + v3[1] * els[6] + v3[2] * els[10] + els[13];

        return v
    }
    /**
     * Multiply the four-dimensional vector.
     * @param vec4  The multiply vector
     * @return The result of multiplication(Float32Array)
     */
    multiplyVector4(vec4: Vector4) {
        var els = this.elements;
        var v4 = vec4.elements;
        var v = new Vector4();
        var result = v.elements;

        result[0] = v4[0] * els[0] + v4[1] * els[4] + v4[2] * els[8] + v4[3] * els[12];
        result[1] = v4[0] * els[1] + v4[1] * els[5] + v4[2] * els[9] + v4[3] * els[13];
        result[2] = v4[0] * els[2] + v4[1] * els[6] + v4[2] * els[10] + v4[3] * els[14];
        result[3] = v4[0] * els[3] + v4[1] * els[7] + v4[2] * els[11] + v4[3] * els[15];

        return v;
    };
}

export class Vector3 {
    elements: Float32Array

    constructor(opt?: Vector3 | Float32Array) {
        let src_elements
        const elements = new Float32Array(3)
        if (opt instanceof Vector3) {
            src_elements = opt.elements
        } else if (opt instanceof Float32Array) {
            src_elements = opt
        }
        if (!src_elements) {
            this.elements = new Float32Array([0, 0, 0])
        } else {
            for (let i = 0; i < 3; i++) {
                elements[i] = src_elements[i]
            }
            this.elements = elements
        }
    }
    /**
     * 归一化
     */
    normalize() {
        const v = this.elements;
        let c = v[0], d = v[1], els = v[2], g = Math.sqrt(c * c + d * d + els * els);
        if (g) {
            if (g == 1)
                return this;
        } else {
            v[0] = 0; v[1] = 0; v[2] = 0;
            return this;
        }
        g = 1 / g;
        v[0] = c * g; v[1] = d * g; v[2] = els * g;
        return this
    }
}

export class Vector4 {
    elements: Float32Array

    constructor(opt?: Vector4 | Float32Array) {
        let src_elements
        const elements = new Float32Array(4)
        if (opt instanceof Vector4) {
            src_elements = opt.elements
        } else if (opt instanceof Float32Array) {
            src_elements = opt
        }
        if (!src_elements) {
            this.elements = new Float32Array([0, 0, 0, 1])
        } else {
            for (let i = 0; i < 4; i++) {
                elements[i] = src_elements[i]
            }
            this.elements = elements
        }
    }
}
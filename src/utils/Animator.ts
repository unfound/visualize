// interface TimingParams {
//     duration: number
//     iterations: number
// }

export class Timing {
    startTime: number = Date.now()
    constructor (
        public duration: number,
        public iterations: number,
        public easing: (t: number) => number = p => p
    ) {}

    get time(): number {
        return Date.now() - this.startTime
    }

    get p(): number {
        const progress = Math.min(this.time / this.duration, this.iterations)
        return this.isFinished ? 1 : this.easing(progress % 1)
    }

    get isFinished(): boolean {
        return this.time / this.duration >= this.iterations
    }
}

type Update = (...args: any[]) => any

export default class Animator extends Timing {
    // constructor (public duration: number, public iterations: number) {}

    animate(target: any, update: Update) {
        let frameIndex = 0
        const timing = new Timing(this.duration, this.iterations, this.easing)

        return new Promise(resolve => {
            function next() {
                if (update(target, frameIndex, timing) !== false && !timing.isFinished) {
                    requestAnimationFrame(next)
                } else {
                    resolve(timing)
                }

                frameIndex++
            }

            next()
        })
    }
}
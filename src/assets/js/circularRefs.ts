// FERNANDO: uma função que recebe outra função, isso se tornou necessário porque há referência cruzada no seu código

export const circularRefs: CircularRefs = {
    startCheckingAudioPlaying() {
        throw new Error('startCheckingAudioPlaying not defined yet')
    },
    getStrobeActive() {
        throw new Error('getStrobeActive not defined yet')
    },
    getTapBPM() {
        throw new Error('getTapBPM not defined yet')
    },
}

export interface CircularRefs {
    startCheckingAudioPlaying: () => void
    getStrobeActive: () => boolean
    getTapBPM: () => number
}

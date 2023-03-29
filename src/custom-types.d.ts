
declare module "*.png" {
    export type Png = unknown & "PNG"
    const content: Png;
    export default content;
}

declare module "web-audio-peak-meter" {
    declare interface TrackMeterNode {

    }
    declare function createMeterNode(
        trackSource: MediaElementAudioSourceNode|MediaStreamAudioSourceNode,
        audioContext: AudioContext
    ): TrackMeterNode;
    declare function createMeter(
        trackAudioMeter: HTMLDivElement | webAudioPeakMeter.TrackMeterNode,
        trackMeterNode: TrackMeterNode, options: {
            dbRange?: number
            peakHoldDuration?: number
        }
    ): void;
}

declare const toastr: {
    success(message: string, title: strin): void
    info(message: string, title: strin): void
    error(message: string, title: strin): void
    options: {
        "closeButton": boolean,
        "debug": boolean,
        "newestOnTop": boolean,
        "progressBar": boolean,
        "positionClass": "toast-top-right",
        "preventDuplicates": boolean,
        "onclick": null | (() => void),
        "showDuration": string,
        "hideDuration": string,
        "timeOut": string,
        "extendedTimeOut": string,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

declare type Timer = NodeJS.Timer

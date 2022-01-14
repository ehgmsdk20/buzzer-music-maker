const RAMP_VALUE = 0.00001;

class Sound {
    constructor(options) {
        if (!options) options = {};
        const hasWindow = typeof window !== 'undefined';
        if (hasWindow) {
            this.audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            this.waveType = options.waveType || 'sawtooth';
            this.volume = options.volume || 0.2;
        }
    }

    init() {
        this.oscillator = this.audioContext.createOscillator();
        this.gain = this.audioContext.createGain();

        this.oscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
        this.oscillator.type = this.waveType;
    }

    play(freqValue, duration) {
        this.init();
        const currentTime = this.audioContext.currentTime;
        this.oscillator.frequency.value = freqValue;
        this.gain.gain.setValueAtTime(this.volume, currentTime);
        this.gain.gain.exponentialRampToValueAtTime(
            RAMP_VALUE,
            currentTime + duration
        );


        this.oscillator.start(currentTime);
        this.oscillator.stop(currentTime + duration);
    }
}

export default Sound;

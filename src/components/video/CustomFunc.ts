export const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    return stream
};

export const stopStream = (stream: MediaStream) => {
    if (stream) {
        stream.getTracks().forEach(track => {
            track.stop();
            stream.removeTrack(track);
        });
    }
};

export const getAudioContext = () => {
    return new Promise((resolve, reject) => {
        const AudioContext = window.AudioContext;
        if (AudioContext) {
            const audioContext = new AudioContext();
            resolve(audioContext);
        } else {
            reject(new Error('Web Audio API not supported'));
        }
    });
};

export const getUserMedia = (constraints: any) => {
    return navigator.mediaDevices.getUserMedia(constraints);
};

export const drawWaveform = (analyser: any, canvas: any) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const width = canvas.width;
    const height = canvas.height;

    analyser.getByteTimeDomainData(dataArray);

    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'rgb(200, 200, 200)';
    canvasContext.fillRect(0, 0, width, height);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';

    canvasContext.beginPath();

    const sliceWidth = (width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasContext.lineTo(width, height / 2);
    canvasContext.stroke();
};
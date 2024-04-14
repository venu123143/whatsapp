// import { useState, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// const useWaveSurfer = ({ waveRef }: { waveRef: React.MutableRefObject<HTMLDivElement | null> }) => {

//     const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
//     useEffect(() => {
//         if (!waveSurfer && waveRef.current) {
//             console.log(waveRef);

//             const newWaveSurfer = WaveSurfer.create({
//                 container: waveRef.current,
//                 waveColor: "#848488",
//                 progressColor: "red",
//                 barWidth: 2,
//                 audioRate: 1,
//                 barGap: 2,
//                 height: 40,
//                 cursorWidth: 2,
//             });
//             setWaveSurfer(newWaveSurfer);
//         }
//         return () => {
//             // Clean up WaveSurfer instance if component unmounts
//             if (waveSurfer) {
//                 waveSurfer.destroy();
//             }
//         };
//     }, [waveRef]);

//     // return [waveSurfer, waveRef] as const;
//     return waveSurfer
// };

// export default useWaveSurfer;   


import { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import RecordPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.record.min.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'

const useWaveSurfer = (waveRef: React.MutableRefObject<HTMLDivElement | null>, scrollingWaveform: boolean = false) => {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (!waveSurfer && waveRef.current) {
            const newWaveSurfer = WaveSurfer.create({
                container: waveRef.current,
                waveColor: "#848488",
                progressColor: "red",
                barWidth: 2,
                audioRate: 1,
                barGap: 2,
                height: 40,
                cursorWidth: 2,
                plugins: [
                    RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false }),
                ],
            });
            setWaveSurfer(newWaveSurfer);
        }

        return () => {
            // Clean up WaveSurfer instance if component unmounts
            if (waveSurfer) {
                waveSurfer.destroy();
            }
        };
    }, [waveRef]);

    // return [waveSurfer, waveRef] as const;
    return waveSurfer
};

export default useWaveSurfer;

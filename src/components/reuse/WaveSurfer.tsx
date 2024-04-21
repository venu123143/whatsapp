

import { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'

const useWaveSurfer = (waveRef: React.MutableRefObject<HTMLDivElement | null>, right: boolean = false) => {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (!waveSurfer && waveRef.current) {
            const newWaveSurfer = WaveSurfer.create({
                container: waveRef.current,
                waveColor: right === true ? "#cacaca" : "#cacaca",
                progressColor: right === true ? "#FFD700" : "#00a884",
                barWidth: 2,
                autoScroll: false,
                audioRate: 1,
                barGap: 2,
                height: 40,
                cursorWidth: 2
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

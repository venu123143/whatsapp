export const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    return stream
};
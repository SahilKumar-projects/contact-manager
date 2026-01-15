import { useEffect, useRef, useState } from "react";

export default function VoicemailRecorder({
  contactId,
  onUploadVoicemail,
}) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  /* TIMER */
  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  /* START RECORDING */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });

      await onUploadVoicemail(contactId, blob, seconds);

      chunksRef.current = [];
      setSeconds(0);
    };

    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  };

  /* STOP RECORDING */
  const stopRecording = () => {
    recorderRef.current.stop();
    recorderRef.current.stream
      .getTracks()
      .forEach((t) => t.stop());

    setRecording(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {!recording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-rose-500 text-white rounded-xl"
        >
          Record Voicemail
        </button>
      ) : (
        <>
          <span className="text-sm text-gray-500">
            Recording… {seconds}s
          </span>
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
}

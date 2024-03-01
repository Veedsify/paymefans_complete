"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import swal from "sweetalert";

interface VideoStreamerProps {
    className?: string;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    useEffect(() => {
        let stream: MediaStream | null = null;

        const fetchVideoStream = async () => {
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.error("Camera and microphone access not supported!");
                    return;
                }

                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    },
                    audio: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing video stream:", error);
            }
        };

        fetchVideoStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnoad = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnoad);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnoad);
        };
    }, []);


    return (
        <>
            <video ref={videoRef} className={className} autoPlay />
        </>
    );
};

export default VideoStreamer;

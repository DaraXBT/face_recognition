"use client";

import {useRef, useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import Image from "next/image";

interface VideoFeedProps {
  isRecognizing: boolean;
}

export default function VideoFeed({isRecognizing}: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isRecognizing) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isRecognizing]);

  const startCamera = async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setError("Your browser does not support accessing the camera.");
      return;
    }

    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(videoStream);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err: unknown) {
      console.error("Error accessing the camera:", err);
      let errorMessage = "Unable to access the camera. ";
      if (err instanceof Error) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          errorMessage +=
            "Please grant camera permissions in your browser settings.";
        } else if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          errorMessage +=
            "No camera device found. Please ensure a camera is connected.";
        } else if (
          err.name === "NotReadableError" ||
          err.name === "TrackStartError"
        ) {
          errorMessage += "Camera may be in use by another application.";
        } else {
          errorMessage +=
            "An unexpected error occurred: " + (err.message || err.name);
        }
      } else {
        errorMessage += "An unknown error occurred.";
      }
      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
        {isRecognizing ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Video feed is inactive</p>
          </div>
        )}
        {/* The 'transform scale-x-[-1]' class flips the video horizontally */}
        {isRecognizing && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
            Recognizing...
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center items-center space-x-4">
        <Image
          src="https://gic.itc.edu.kh/img/itc_logo.png"
          alt="ITC Logo"
          width={100}
          height={100}
          className="h-12 w-auto"
        />
        <Image
          src="https://gic.itc.edu.kh/img/logo.png"
          alt="GIC Logo"
          width={100}
          height={100}
          className="h-12 w-auto"
        />
      </div>
    </div>
  );
}

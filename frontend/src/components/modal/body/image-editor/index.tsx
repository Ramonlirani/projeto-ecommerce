import { canvasPreview } from "@/helpers/canvas-preview";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function InputFileImageAlbum() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const scale = 1;
  const rotate = 0;
  const aspect = Number(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      hiddenAnchorRef.current!.href = blobUrlRef.current;
      hiddenAnchorRef.current!.click();
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <>
      <div className="Crop-Controls p-5">
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <div className="flex items-center p-5">
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              width={350}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <>
            <div className="p-5">
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="">
        <button onClick={onDownloadCropClick}>Salvar foto</button>
        <a
          ref={hiddenAnchorRef}
          download
          style={{
            position: "absolute",
            visibility: "hidden",
          }}
        >
          Hidden download
        </a>
        <p>Imagem editada</p>
      </div>
    </>
  );
}

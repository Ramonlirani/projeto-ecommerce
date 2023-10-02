import React, { useState, useRef } from "react";
import { ArrowUturnRightIcon } from "@heroicons/react/20/solid";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";

import { canvasPreview } from "@/helpers/canvas-preview";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { Button } from "../button";

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

interface ImageEditorProps {
  onSave: (editedImage: string) => void;
}

export default function ImageEditorAlbum({ onSave }: ImageEditorProps) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotate, setRotate] = useState(0);
  const scale = 1;
  const aspect = Number(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const handleRotateClick = () => {
    if (rotate === 360) {
      setRotate(0);
    } else {
      setRotate(rotate + 90);
    }
  };

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

  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          resolve(base64String);
        } else {
          reject("Erro ao carregar a imagem");
        }
      };
      reader.onerror = () => {
        reject("Erro ao carregar a imagem");
      };
      reader.readAsDataURL(blob);
    });
  }

  function resetInformation() {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
    setRotate(0);
  }
  async function handleSave() {
    if (completedCrop && previewCanvasRef.current) {
      previewCanvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to create blob");
        }
        const base64 = await blobToBase64(blob);
        resetInformation();
        onSave(base64);
      });
    }
  }

  return (
    <>
      <div className="p-7 mt-10">
        <div className="Crop-Control">
          <label className="relative inline-flex items-center rounded-md h-10 cursor-pointer bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100">
            <span className="mx-2">Selecione uma imagem</span>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
        {imgSrc ? (
          <p className="pb-4 text-center font-bold tracking-tight text-gray-700">
            Veja como sua foto vai ficar
          </p>
        ) : (
          ""
        )}
        {!!imgSrc && (
          <>
            <div className="lg:grid lg:grid-cols-2 items-center w-full">
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
                  className="w-full"
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              {!!completedCrop && (
                <>
                  <div className="ml-auto">
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        width: completedCrop.width,
                        height: completedCrop.height,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleRotateClick}
                disabled={!imgSrc}
                id="rotate-input"
                className="flex items-center space-x-2 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-w-[150px]"
              >
                <p className="leading-none text-green-500">Girar a imagem</p>
                <ArrowUturnRightIcon
                  width={20}
                  className="h-5 w-5 fill-green-500"
                  aria-hidden="true"
                />
              </button>
              <div className="flex-grow"></div>
              <Button onClick={handleSave}>Salvar foto</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

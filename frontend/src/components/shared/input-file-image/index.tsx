import { ChangeEvent, useEffect, useState } from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { Input } from "../input";
import { useResetFileInformation } from "@/hooks/zustand/reset-file-information";

interface InputFileImageProps {
  formName: string;
  label?: string;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  isRequired?: boolean;
}
export function InputFileImage({
  formName,
  label = "Escolher foto",
  setValue,
  error,
  isRequired = false,
}: InputFileImageProps) {
  const { setResetFileInformation } = useResetFileInformation();
  const [showCompressImageSizeMessage, setShowCompressImageSizeMessage] =
    useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setResetFileInformation(() => {
      setFileName("");
      setShowCompressImageSizeMessage(false);
    });
  }, [setResetFileInformation]);

  function handleFileAdded(event: ChangeEvent<HTMLInputElement>) {
    const data = event?.target?.files;
    if (!data || !data.length) return;

    const file = data[0];

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const image = new Image();
      setFileName("");
      const fileSizeMB = Number((file.size / (1024 * 1024)).toFixed(2));

      if (fileSizeMB > 5) {
        setShowCompressImageSizeMessage(true);
        toast.warn("Forneça uma imagem com tamanho menor que 5 MB");
        return;
      }

      image.onload = () => {
        setShowCompressImageSizeMessage(false);
        setFileName(file.name);
        setValue(formName, image.src);
      };

      image.src = e.target!.result as string;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="w-full">
      <Input
        id="choose-person-photo"
        divClasses="hidden"
        label="Foto da pessoa falecida"
        type="file"
        onChange={handleFileAdded}
        accept="image/*"
      />

      <div>
        <label
          htmlFor="choose-person-photo"
          className="cursor-pointer inline-flex items-center rounded-md bg-indigo-50 px-3.5 h-12 text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          {label + (isRequired ? " *" : "")}
        </label>
        {fileName && (
          <p className="text-gray-600 text-sm mt-3">
            Nova imagem:{" "}
            <span className="text-green-600 font-bold">{fileName}</span>
          </p>
        )}
        {showCompressImageSizeMessage && (
          <p className="text-gray-600 mt-3">
            <b>Sugestão</b>: acesse{" "}
            <Link href="https://tinypng.com/" target="_blank">
              <span className="text-green-600 font-bold">esse site</span>
            </Link>{" "}
            para diminuir o tamanho da sua imagem
          </p>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </div>
  );
}

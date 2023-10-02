import { usePermission } from "@/hooks/zustand/permission";
import Link from "next/link";
import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";

const modelNameDictionary: any = {
  service: "Serviços",
  user: "Usuário",
  saleAlbum: "Álbum para venda",
  album: "Álbuns",
  permission: "Nível de acesso",
  faq: "Faqs",
  faqCategory: "Categorias do Faq",
};
interface CreateButtonProps {
  children: ReactNode;
  modelName: string;
  url: string;
  dataTooltipContent?: string;
}
export function CreateButton({ children, modelName, url }: CreateButtonProps) {
  const userHasPermission = usePermission().userHasPermission(
    "CREATE",
    modelName
  );

  return userHasPermission ? (
    <div className="sm:flex-none">
      <Link
        href={url}
        className="block rounded-md bg-tomilho-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-tomilho-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomilho-600"
        data-tooltip-id="tooltipId-create-button"
        data-tooltip-content={`Adicionar ${modelNameDictionary[modelName]}`}
      >
        {children}
      </Link>
      <Tooltip id="tooltipId-create-button" />
    </div>
  ) : null;
}

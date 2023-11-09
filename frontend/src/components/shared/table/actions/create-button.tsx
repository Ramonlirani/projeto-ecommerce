import { usePermission } from "@/hooks/zustand/permission";
import Link from "next/link";
import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";

const modelNameDictionary: any = {
  service: "Serviços",
  user: "Usuário",
  product: "produtos novos",
  productCategory: "Categoria do produto",
  subcategories: "subcategorias do produto",
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
        className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        data-tooltip-id="tooltipId-create-button"
        data-tooltip-content={`Adicionar ${modelNameDictionary[modelName]}`}
      >
        {children}
      </Link>
      <Tooltip id="tooltipId-create-button" />
    </div>
  ) : null;
}

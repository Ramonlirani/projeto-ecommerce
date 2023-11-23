import { ProductCategory } from "@/interfaces/ProductCategory";
import { SubCategory } from "@/interfaces/SubCategory";

interface BreadcrumbsProps {
  subcategories: SubCategory[];
  productCategory: ProductCategory;
}

export default function Breadcrumbs({
  subcategories,
  productCategory,
}: BreadcrumbsProps) {
  const breadcrumb = {
    options: [
      { id: 0, name: "Home", href: "/" },
      { id: productCategory?.id, name: productCategory?.name, href: "#" },
      {
        id: subcategories?.map((index) => index?.id).join(),
        name: subcategories?.map((item) => item?.name).join(),
        href: "#",
      },
    ],
  };

  return (
    <>
      {breadcrumb.options.map((breadcrumb) => (
        <li key={breadcrumb.id}>
          <div className="flex items-center">
            <a
              href={breadcrumb.href}
              className="mr-4 text-sm font-medium text-gray-900"
            >
              {breadcrumb.name}
            </a>
            <svg
              viewBox="0 0 6 20"
              aria-hidden="true"
              className="h-5 w-auto text-gray-300"
            >
              <path
                d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                fill="currentColor"
              />
            </svg>
          </div>
        </li>
      ))}
    </>
  );
}

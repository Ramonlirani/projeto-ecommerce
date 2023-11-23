import { ReactElement, useEffect, useState } from "react";

import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";

import Breadcrumbs from "@/components/shared/breadcrumbs";
import InputIncrement from "@/components/shared/input-increment";
import { CardProduct } from "@/components/shared/card-product";
import { useRouter } from "next/router";
import fetchJson from "@/lib/fetch-json";
import { Product } from "@/interfaces/Product";
import Image from "next/image";
import { formatNumber } from "@/helpers/format-number";
import { SubCategory } from "@/interfaces/SubCategory";
import { ProductCategory } from "@/interfaces/ProductCategory";

const products = [
  {
    id: 1,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Convite clássico",
    href: "#",
    price: "R$ 32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 3,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 4,
    name: "Convite clássico",
    href: "#",
    price: "R$ 42",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
];

interface PageProps {
  product: Product[];
}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productCategory, setProductCategory] =
    useState<ProductCategory | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[] | null>([]);

  const productId = router.query.id;
  const sumTotal = product ? product.discount + product.price : 0;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof productId === "string") {
          const productData: {
            error: boolean;
            Product: Product;
            ProductCategory: ProductCategory;
            Subcategories: SubCategory[];
          } = await fetchJson(`/products/${productId}`);

          if (
            productData &&
            productData.Product &&
            productData.Product.name &&
            productData.Product.price
          ) {
            setSubcategories(productData.Subcategories);
            setProductCategory(productData.ProductCategory);
            setProduct(productData.Product);
          } else {
            console.error("Invalid product data structure:", productData);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              <Breadcrumbs
                subcategories={subcategories || ([] as SubCategory[])}
                productCategory={productCategory || ({} as ProductCategory)}
              />
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  {product.discount > 0 && (
                    <p className="text-xl line-through">
                      {formatNumber({ number: sumTotal })}
                    </p>
                  )}
                  <p className="text-xl font-medium text-off-red">
                    {formatNumber({ number: product.price })}
                  </p>
                </div>
                <p className="underline">ver parcelas</p>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>
                <div className="flex justify-center">
                  <Image
                    key={product.id}
                    src={product.imageUrl}
                    alt="Imagem do produto"
                    width={500}
                    height={500}
                    style={{ objectFit: "fill" }}
                    className="object-fill"
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                {/* Product details */}
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900 ">
                    Descrição
                  </h2>

                  <div className="prose prose-sm mt-4 mb-8 text-gray-500">
                    {product.shortDescription}
                  </div>
                  <div className="mt-6">
                    <h2 className="text-sm font-medium text-gray-900">
                      Tamanhos disponíveis
                    </h2>
                    <div className="flex space-x-2">
                      {product.size.split(",").map((letter, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 border-2 flex items-center justify-center transition-all ${
                            selectedSize === letter ? "bg-black text-white" : ""
                          }`}
                          onClick={() => handleSizeClick(letter)}
                        >
                          <p className="text-sm">{letter}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <form>
                  {/* Quantity */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Quantidade
                      </h2>
                    </div>
                    <InputIncrement />
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Adicionar à sacola
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full ">
              <h2 className="text-bold text-3xl text-black border-b border-gray-200 py-3 pt-32 ">
                Descrição Geral
              </h2>
              <p className="pt-12 text-gray-500">{product.description}</p>
            </div>
            <h2 className="text-bold text-3xl text-black border-b border-gray-200 py-3 pt-32">
              É do seu gosto? Então veja estes produtos similares
            </h2>
            <div className="grid grid-cols-1 gap-y-4 pt-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              {products.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

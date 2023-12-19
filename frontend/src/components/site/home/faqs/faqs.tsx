import { FaqCategory } from "@/interfaces/FaqCategory";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

interface FaqsProps {
  faqCategories: FaqCategory[];
}

export default function Faqs({ faqCategories }: FaqsProps) {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:py-32 lg:px-8 lg:py-6">
        <div className=" divide-y divide-black/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-black">
            Perguntas mais frequentes
          </h2>
          {faqCategories.length ? (
            faqCategories.map((faqCategory) => (
              <div key={faqCategory.id}>
                <p className="mt-10 text-xl font-bold text-black">
                  {faqCategory.name}
                </p>
                <dl className=" space-y-6 divide-y divide-gray-900/10">
                  {faqCategory.faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-black">
                              <span className="text-base font-semibold leading-7">
                                {faq.question}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <MinusSmallIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmallIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <p className="text-base leading-7 text-black">
                              {faq.answer}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            ))
          ) : (
            <p className="pt-4 text-lg text-black">
              Nenhuma pergunta cadastrada
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

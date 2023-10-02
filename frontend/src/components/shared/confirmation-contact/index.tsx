import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../button";
import { Input } from "../input";

interface ConfirmationProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const schema = z.object({
  keyWord: z.string().nonempty({ message: "Palavra chave obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function ConfirmationContact({
  open,
  setOpen,
  onConfirm,
  isLoading = false,
}: ConfirmationProps) {
  const [enableConfirmButton, setEnableConfirmButton] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const watchKeyWord = watch("keyWord");

  useEffect(() => {
    if (watchKeyWord === "enviar") {
      setEnableConfirmButton(true);
    } else {
      setEnableConfirmButton(false);
    }
  }, [watchKeyWord]);

  function handleConfirm() {
    onConfirm();
    setEnableConfirmButton(false);
    reset();
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-10 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form>
                  <div>
                    <p className="text-gray-600 mb-5">
                      Para confirmar o envio da mensagem digite{" "}
                      <span className="font-bold text-green-600">enviar</span>
                    </p>
                    <Input
                      placeholder="Digite aqui"
                      error={errors.keyWord}
                      {...register("keyWord")}
                    />
                  </div>

                  <div className="mt-5 flex gap-4 items-center justify-end">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancelar
                    </button>

                    <Button
                      type="submit"
                      onClick={handleConfirm}
                      isLoading={isLoading}
                      disabled={!enableConfirmButton}
                      className="bg-white"
                    >
                      <p className="flex items-center gap-4">
                        Continuar <ArrowRightIcon width={14} />
                      </p>
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

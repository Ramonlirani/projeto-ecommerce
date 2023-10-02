import { Loading } from "../loading";
import { Logo } from "../logo";

export function SpinnerLogo() {
  return (
    <div className="flex justify-center items-center h-screen relative flex-col gap-y-24">
      <Logo />

      <Loading size="xl" />

      <div
        className="absolute inset-x-0 top-1 -z-10 transform-gpu overflow-hidden blur-3xl "
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#369a41] to-[#0c6340] opacity-30  sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

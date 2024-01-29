import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/header";

describe("Header", () => {
  it("should have Product text", () => {
    render(<Header />);

    const myElem = screen.getByText("Contate-nos");

    expect(myElem).toBeInTheDocument();
  });

  it("should have Product text", () => {
    render(<Header />);
    const myElem = screen.getByText("Contate-nos");

    expect(myElem).toBeInTheDocument();
  });
});

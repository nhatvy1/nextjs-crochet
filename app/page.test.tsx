import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// next/image cần mock khi chạy trong jsdom
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("Home page", () => {
  it("renders heading 'Design UI'", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Design UI" }),
    ).toBeInTheDocument();
  });

  it("renders getting-started instructions", () => {
    render(<Home />);
    expect(screen.getByText(/to get started/i)).toBeInTheDocument();
  });

  it("renders Deploy Now and Documentation links", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /deploy now/i })).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com"),
    );
    expect(
      screen.getByRole("link", { name: /documentation/i }),
    ).toHaveAttribute("href", expect.stringContaining("nextjs.org"));
  });
});

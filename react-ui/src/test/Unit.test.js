import { render } from "@testing-library/react";

// Import Header component
import Footer from "../components/Footer";

// This simple unit test tests that the heading "iTunes" is rendered successfully on the page
test("renders hyperion blog header", () => {
  render(Footer());
  //const h1 = screen.getByText("Hyperion Blog");
  expect(document.querySelector("p").textContent).toBe(
    "© Copyright Evan Malherbe 2022"
  );
});

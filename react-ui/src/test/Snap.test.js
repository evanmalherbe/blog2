import React from "react";
import Button from "react-bootstrap/Button";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<Button variant="primary">Facebook</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from "react";
import { shallow } from "enzyme";

import Box from "../Box";

describe("Box", () => {
  const doShallow = props => shallow(<Box {...props}>Some content</Box>);

  it("renders", () => {
    const box = doShallow();
    expect(box).toMatchSnapshot();
  });

  it("defaultProp click", () => {
    const clicked = Box.defaultProps.onClick;
    expect(clicked).toBeDefined();
  });
});

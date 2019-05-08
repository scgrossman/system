import React from "react";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Box", () => {
  const doShallow = props => shallow(<Header {...props}>Some content</Header>);

  it("renders", () => {
    const box = doShallow();

    expect(box).toMatchSnapshot();
  });
});

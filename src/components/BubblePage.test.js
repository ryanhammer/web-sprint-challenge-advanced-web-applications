import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

const getBubbleColors = jest.fn();

let testColors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  }
];


test("Renders BubblePage without errors", () => {
  // Finish this test
  render(<BubblePage colors={testColors} />);
});

test("Fetches data and renders the bubbles on mounting", () => {
  // Finish this test
  // Arrange: Render component with initial state of empty colors
  let bubbleColors = [];
  const { rerender } = render(<BubblePage colors={bubbleColors} />);

  // Act
  bubbleColors = (getBubbleColors.mockReturnValueOnce(testColors));


  // Assert: Component will render
  rerender(<BubblePage colors={bubbleColors} />);
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading
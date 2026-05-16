import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import RevealrPage from "@/pages/RevealrPage/RevealrPage";

import { mockQuestions } from "@tests/__mocks__/questions.mock";

jest.mock("@/constants/questions", () => {
  const mockData = jest.requireActual("@tests/__mocks__/questions.mock");
  const { mockQuestions: questions } = mockData;
  return {
    __esModule: true,
    default: questions,
  };
});

const renderPage = (): RenderResult => {
  return render(<RevealrPage />);
};

describe("RevealrPage", () => {
  describe("rendering", () => {
    it("should render all questions from the data source", () => {
      renderPage();
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(mockQuestions.length);
    });

    it("should render each question title", () => {
      renderPage();
      mockQuestions.forEach((question) => {
        expect(screen.getByText(question.title)).toBeInTheDocument();
      });
    });

    it("should not show any description by default", () => {
      renderPage();
      expect(screen.queryAllByRole("region")).toHaveLength(0);
    });

    it("should render a toggle button for each question", () => {
      renderPage();
      expect(screen.getAllByRole("button")).toHaveLength(mockQuestions.length);
    });
  });

  describe("behavior", () => {
    it("should show the description when a question toggle button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getAllByRole("button")[0]!);
      expect(screen.getByRole("region")).toBeInTheDocument();
      expect(screen.getByText(mockQuestions[0]!.info)).toBeInTheDocument();
    });

    it("should hide the description when the toggle button is clicked again", async () => {
      const user = userEvent.setup();
      renderPage();
      const firstButton = screen.getAllByRole("button")[0];
      await user.click(firstButton!);
      await user.click(firstButton!);
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });

    it("should allow multiple questions to be expanded simultaneously", async () => {
      const user = userEvent.setup();
      renderPage();
      const buttons = screen.getAllByRole("button");
      await user.click(buttons[0]!);
      await user.click(buttons[1]!);
      expect(screen.getAllByRole("region")).toHaveLength(2);
    });
  });
});

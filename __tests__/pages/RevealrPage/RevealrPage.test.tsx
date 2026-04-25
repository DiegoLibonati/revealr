import { render, screen } from "@testing-library/react";

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
  });
});

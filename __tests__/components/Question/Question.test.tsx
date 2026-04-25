import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { QuestionProps } from "@/types/props";

import Question from "@/components/Question/Question";

const renderComponent = (props: Partial<QuestionProps> = {}): RenderResult => {
  const defaultProps: QuestionProps = {
    title: "What is React?",
    info: "A UI library for building user interfaces.",
    ...props,
  };
  return render(<Question {...defaultProps} />);
};

describe("Question", () => {
  describe("rendering", () => {
    it("should render the question title", () => {
      renderComponent();
      expect(screen.getByText("What is React?")).toBeInTheDocument();
    });

    it("should not show the description by default", () => {
      renderComponent();
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });

    it("should render the toggle button with aria-expanded false by default", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: /Abrir respuesta: What is React\?/i })
      ).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("behavior", () => {
    it("should show the description when the button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      expect(screen.getByRole("region")).toBeInTheDocument();
      expect(screen.getByText("A UI library for building user interfaces.")).toBeInTheDocument();
    });

    it("should hide the description when the button is clicked again", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      await user.click(screen.getByRole("button", { name: /Cerrar respuesta:/i }));
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });

    it("should set aria-expanded to true when the description is open", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      expect(screen.getByRole("button", { name: /Cerrar respuesta:/i })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });

    it("should update the button aria-label to close when description is open", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      expect(
        screen.getByRole("button", { name: /Cerrar respuesta: What is React\?/i })
      ).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have aria-controls pointing to the description region", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      const button = screen.getByRole("button", { name: /Cerrar respuesta:/i });
      const region = screen.getByRole("region");
      expect(button).toHaveAttribute("aria-controls", region.id);
    });

    it("should label the description region with the question title", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: /Abrir respuesta:/i }));
      expect(screen.getByRole("region", { name: "What is React?" })).toBeInTheDocument();
    });
  });
});

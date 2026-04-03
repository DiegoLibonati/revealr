import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { QuestionProps } from "@/types/props";

import Question from "@/components/Question/Question";

type RenderComponent = {
  container: HTMLElement;
  props: QuestionProps;
};

const renderComponent = (overrides?: Partial<QuestionProps>): RenderComponent => {
  const props: QuestionProps = {
    title: "Do I have to allow the use of cookies?",
    info: "Some info about cookies.",
    ...overrides,
  };

  const { container } = render(<Question {...props} />);

  return { container, props };
};

describe("Question", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the question title", () => {
    renderComponent();
    expect(screen.getByText("Do I have to allow the use of cookies?")).toBeInTheDocument();
  });

  it("should render the toggle button with aria-expanded false initially", () => {
    renderComponent();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("should not show the description initially", () => {
    renderComponent();
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("should include the question title in the button aria-label", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /Do I have to allow the use of cookies\?/ })
    ).toBeInTheDocument();
  });

  it("should show the description after clicking the button", async () => {
    const user = userEvent.setup();
    const { props } = renderComponent();

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("region")).toBeInTheDocument();
    expect(await screen.findByText(props.info)).toBeInTheDocument();
  });

  it("should set aria-expanded to true after clicking the button", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("should hide the description after clicking the button twice", async () => {
    const user = userEvent.setup();
    renderComponent();

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);

    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("should restore aria-expanded to false after closing", async () => {
    const user = userEvent.setup();
    renderComponent();

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

import { useId, useState } from "react";
import { BsPlusCircle, BsPatchMinus } from "react-icons/bs";

import type { JSX } from "react";
import type { QuestionProps } from "@/types/props";

const Question = ({ title, info }: QuestionProps): JSX.Element => {
  const [showDescription, setShowDescription] = useState(false);
  const descriptionId = useId();

  const handleShowInformation: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div
      className="flex items-center justify-center w-[85%] flex-col rounded-lg border-[.1rem] border-white mb-2 md:w-[50%]"
      data-testid="question"
    >
      <div
        className={`flex flex-row items-center justify-between w-full bg-primary p-2 ${
          showDescription ? "rounded-tr-lg rounded-tl-lg" : "rounded-lg"
        }`}
      >
        <h2 className="text-sm font-medium text-white" id={`${descriptionId}-title`}>
          {title}
        </h2>
        <button
          type="button"
          aria-expanded={showDescription}
          aria-controls={descriptionId}
          aria-label={`${showDescription ? "Cerrar" : "Abrir"} respuesta: ${title}`}
          onClick={handleShowInformation}
        >
          {showDescription ? (
            <BsPatchMinus fontWeight={600} fill="#ffffff" aria-hidden="true" />
          ) : (
            <BsPlusCircle fontWeight={600} fill="#ffffff" aria-hidden="true" />
          )}
        </button>
      </div>
      {showDescription ? (
        <p
          id={descriptionId}
          role="region"
          aria-labelledby={`${descriptionId}-title`}
          className={"text-xs p-2 text-justify bg-secondary text-white rounded-br-lg rounded-bl-lg"}
        >
          {info}
        </p>
      ) : null}
    </div>
  );
};

export default Question;

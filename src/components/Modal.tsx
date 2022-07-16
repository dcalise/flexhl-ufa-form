import { MouseEventHandler, useState } from "react";
import { primaryButtonClass } from "../styles";

type Props = {
  buttonClasses: string;
  buttonText: string;
  validate: Function;
  children?: JSX.Element | JSX.Element[];
};

export const Modal: React.FC<Props> = ({
  buttonClasses,
  buttonText,
  validate,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const valid = await validate();
    if (valid) {
      setIsOpen((open) => !open);
    }
  };
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e?.currentTarget) {
      setIsOpen((open) => !open);
    }
  };
  return (
    <>
      <button
        className={buttonClasses}
        type="button"
        data-modal-toggle="popup-modal"
        onClick={handleToggleClick}
      >
        {buttonText}
      </button>

      <div
        id="popup-modal"
        tabIndex={-1}
        className={`bg-gray-800/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center ${
          isOpen ? "flex" : "hidden"
        }`}
        aria-modal="true"
        role="dialog"
        onClick={handleModalClick}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => setIsOpen((open) => !open)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

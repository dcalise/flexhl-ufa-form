import Cleave from "cleave.js/react";
import { Controller } from "react-hook-form";
import { inputClass } from "./styles";

export const Salary = ({ ...rest }) => {
  return (
    <Controller
      {...rest}
      render={({ field: { onChange, onBlur, value } }) => {
        const handleChange = (e) => {
          onChange(e.target.rawValue);
        };
        return (
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm"> $ </span>
            </div>
            <Cleave
              onChange={handleChange}
              onBlur={onBlur}
              className={`${inputClass} pl-6`}
              placeholder="500,000"
              value={value}
              options={{
                numeral: true,
                numeralThousandsGroupStyle: "thousand"
              }}
            />
          </div>
        );
      }}
    />
  );
};

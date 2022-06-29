import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const labelClass = `block text-gray-700 text-sm font-bold mb-2`;
const inputClass = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

const config = {
  cors: "https://cors-anywhere.herokuapp.com/", // <optional> doesn't display the cors error
  formUrl:
    "https://docs.google.com/forms/d/e/1AmwjvAKpXB68Jc4PkPI5CZUe6SrgUGfsifGUDEguFxA/formResponse"
};

const schema = yup
  .object({
    players: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        aav: yup
          .number()
          .min(500000, "The minimum contract AAV is $500,000")
          .max(12500000, "This maximum contract AAV is $12,500,000")
          .required(),
        years: yup
          .number()
          .min(1, "The minimum contract length is 1 year.")
          .max(3, "This maximum contract length is 3 years.")
          .required()
      })
    )
  })
  .required();

type Inputs = {
  players: {
    name: string;
    aav: number;
    years: number;
  }[];
};

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      players: [{ name: "", aav: 0, years: 1 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  });
  console.log(fields.length);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      {fields.map((field, index) => (
        <div className="p-4">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                key={field.id}
                className={inputClass}
                {...register(`players.${index}.name`)}
              />
              {errors?.players?.[index]?.name && (
                <span>This field is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2 justify-end">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="name" className={labelClass}>
                AAV
              </label>
              <input
                id="aav"
                key={field.id}
                className={inputClass}
                {...register(`players.${index}.aav`)}
              />
              {errors?.players?.[index]?.aav && (
                <span>This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="years" className={labelClass}>
                Years
              </label>
              <input
                id="years"
                key={field.id}
                className={inputClass}
                {...register(`players.${index}.years`)}
              />
              {errors?.players?.[index]?.years && (
                <span>This field is required</span>
              )}
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                className="flex-shrink-0 border-transparent border-4 text-red-500 hover:text-red-800 text-sm py-1 px-2 rounded"
                onClick={() => remove(index)}
              >
                Remove player
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        onClick={() =>
          append({
            name: "",
            aav: 0,
            years: 0
          })
        }
      >
        Add another player
      </button>
      <input
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="submit"
      />
    </form>
  );
}

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const config = {
  cors: "https://cors-anywhere.herokuapp.com/", // <optional> doesn't display the cors error
  formUrl: "https://docs.google.com/forms/d/e/<GOOGLE_FORM_ID>/formResponse"
};

const schema = yup
  .object({
    players: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        aav: yup.number().required(),
        years: yup
          .number()
          .required()
          .min(1, "The minimum contract length is 1 year.")
          .max(3, "This maximum contract length is 3 years.")
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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              key={field.id}
              {...register(`players.${index}.name`)}
            />
            {errors?.players?.[index]?.name && (
              <span>This field is required</span>
            )}
          </div>

          <div>
            <label htmlFor="name">AAV</label>
            <input
              id="aav"
              key={field.id}
              {...register(`players.${index}.aav`)}
            />
            {errors?.players?.[index]?.aav && (
              <span>This field is required</span>
            )}
          </div>

          <div>
            <label htmlFor="years">Years</label>
            <input
              id="years"
              key={field.id}
              {...register(`players.${index}.years`)}
            />
            {errors?.players?.[index]?.years && (
              <span>This field is required</span>
            )}
          </div>

          <button type="button" onClick={() => remove(index)}>
            x
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            aav: 0,
            years: 0
          })
        }
      >
        APPEND
      </button>
      <input type="submit" />
    </form>
  );
}

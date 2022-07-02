import * as yup from "yup";

export const schema = yup
  .object({
    gm: yup.string().required("Please enter your name"),
    team: yup.string().required("Please enter your team name"),
    players: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .required("Please enter the player's first and last name"),
        aav: yup
          .number()
          .typeError(
            "Please enter a number without any commas or special characters"
          )
          .required("Please enter a value between 1 and 3")
          .min(500000, "The minimum contract AAV is $500,000")
          .max(12500000, "This maximum contract AAV is $12,500,000"),

        years: yup
          .number()
          .typeError(
            "Please enter a number without any commas or special characters"
          )
          .required()
          .min(1, "The minimum contract length is 1 year.")
          .max(3, "This maximum contract length is 3 years.")
      })
    )
  })
  .required();

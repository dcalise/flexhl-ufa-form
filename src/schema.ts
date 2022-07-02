import * as yup from "yup";

export const schema = yup
  .object({
    gm: yup.string().required("Enter your name"),
    team: yup
      .string()
      .required("Enter the name of the team you are bidding for"),
    players: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Select a player"),
        aav: yup
          .number()
          .typeError("Enter the contract AAV")
          .required()
          .min(500000, "The minimum contract AAV is $500,000")
          .max(12000000, "This maximum contract AAV is $12,500,000"),

        years: yup
          .number()
          .typeError("Select a contract length")
          .required()
          .min(1, "The minimum contract length is 1 year.")
          .max(3, "This maximum contract length is 3 years.")
      })
    )
  })
  .required();

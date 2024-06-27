import * as yup from "yup";

export const schema = yup
  .object({
    gm: yup.string().required("Enter your name"),
    team: yup
      .string()
      .required("Enter the name of the team you are bidding for"),
    players: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Enter a player name"),
        aav: yup
          .number()
          .typeError("Enter the contract AAV")
          .required()
          .min(0.5, "The minimum contract AAV is $0.50M")
          .max(13, "This maximum contract AAV is $13.00M"),

        years: yup
          .number()
          .typeError("Select a contract length")
          .required()
          .min(1, "The minimum contract length is 1 year.")
          .max(3, "This maximum contract length is 3 years."),
      })
    ),
  })
  .required();

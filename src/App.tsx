import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cleave from "cleave.js/dist/cleave-react";
import { schema } from "./schema";
import { Inputs } from "./types";
import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";

const labelClass = `block text-gray-700 text-sm font-bold mb-2`;
const inputClass = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
const primaryButtonClass = `flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`;
const secondaryButtonClass = `flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded`;

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      team: "",
      players: [{ name: "", aav: null, years: null }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = data.players.map((player) => ({
      gm: data.gm,
      team: data.team,
      playerName: player.name,
      aav: player.aav,
      years: player.years
    }));

    try {
      const { data, error } = await supabase.from("ufax2022").insert(payload);

      console.log("data", data);
      console.log("error", error);
    } catch (error) {
      console.log(error);
    }
  };

  const [salaryTotal, setSalaryTotal] = useState(0);
  // const players = watch("players");
  // console.log(players);
  // useEffect(() => {
  //   let total = 0;
  //   players.forEach((player) => {
  //     console.log(typeof player.aav);
  //     total = total + (player.aav || 0);
  //   });

  //   setSalaryTotal(total);
  // }, [players]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto max-w-lg"
      >
        <div className="p-4">
          <h1>Flex Hockey League</h1>
          <h2>UFAX Batch 1</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input id="name" className={inputClass} {...register(`gm`)} />

              {errors?.gm && (
                <span className="text-red-700">{errors?.gm?.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label htmlFor="name" className={labelClass}>
                Team
              </label>
              <select id="name" className={inputClass} {...register(`team`)}>
                <option disabled value="">
                  Please select your team
                </option>
                <option disabled value="">
                  Eastern Conference
                </option>

                <option value="BOS">Boston Bruins</option>
                <option value="BUF">Buffalo Sabres</option>
                <option value="CAR">Carolina Hurricanes</option>
                <option value="CBJ">Columbus Blue Jackets</option>
                <option value="DET">Detroit Red Wings</option>
                <option value="FLA">Florida Panthers</option>
                <option value="MON">Montreal Canadiens</option>
                <option value="NJD">New Jersey Devils</option>
                <option value="NYI">New York Islanders</option>
                <option value="NYR">New York Rangers</option>
                <option value="OTT">Ottawa Senators</option>
                <option value="PHI">Philadelphia Flyers</option>
                <option value="PIT">Pittsburgh Penguins</option>
                <option value="TBL">Tampa Bay Lightning</option>
                <option value="TOR">Toronto Maple Leafs</option>
                <option value="WAS">Washington Capitals</option>
                <option disabled value="">
                  Western Conference
                </option>
                <option value="ANA">Anaheim Ducks</option>
                <option value="ARI">Arizona Coyotes</option>
                <option value="CGY">Calgary Flames</option>
                <option value="CHI">Chicago Blackhawks</option>
                <option value="COL">Colorado Avalanche</option>
                <option value="DAL">Dallas Stars</option>
                <option value="EDMN">Edmonton Oilers</option>
                <option value="LAK">Los Angeles Kings</option>
                <option value="MIN">Minnesota Wild</option>
                <option value="NSH">Nashville Predators</option>
                <option value="SJS">San Jose Sharks</option>
                <option value="SEA">Seattle Kraken</option>
                <option value="STL">St Louis Blues</option>
                <option value="VAN">Vancouver Canucks</option>
                <option value="VGK">Vegas Golden Knights</option>
                <option value="WPG">Winnipeg Jets</option>
              </select>
              {errors?.team && (
                <span className="text-red-700">{errors?.team?.message}</span>
              )}
            </div>
          </div>
        </div>
        {fields.map((field, index) => (
          <div className="p-4">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label htmlFor="name" className={labelClass}>
                  Player Name
                </label>
                <input
                  id="name"
                  key={field.id}
                  className={inputClass}
                  {...register(`players.${index}.name`)}
                />
                {errors?.players?.[index]?.name && (
                  <span className="text-red-700">
                    {errors?.players?.[index]?.name?.message}
                  </span>
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
                  <span className="text-red-700">
                    {errors?.players?.[index]?.aav?.message}
                  </span>
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
                  <span className="text-red-700">
                    {errors?.players?.[index]?.years?.message}
                  </span>
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

        <div className="p-4">
          <div className="mb-2">Total salary: {salaryTotal}</div>

          <button
            type="button"
            className={secondaryButtonClass}
            onClick={() =>
              append({
                name: "",
                aav: null,
                years: null
              })
            }
          >
            Add another player
          </button>
          <input className={primaryButtonClass} type="submit" />
        </div>
      </form>
    </div>
  );
}

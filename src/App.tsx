import Cleave from "cleave.js/dist/cleave-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Salary } from "./Salary";
import { batch } from "./batch";

import { schema } from "./schema";
import { Inputs } from "./types";
import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

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
  const players = watch("players");
  useEffect(() => {
    let total = 0;
    players.forEach((player) => {
      const aav = player.aav ? parseInt(player.aav, 10) : 0;
      total = total + (aav || 0);
    });

    setSalaryTotal(total);
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto max-w-lg"
      >
        <div className="p-4">
          <h1 className="text-3xl">Flex Hockey League</h1>
          <h2 className="text-xl">UFAX Batch 1</h2>
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <select id="name" className={inputClass} {...register(`team`)}>
                  <option value="" disabled>
                    Select your team
                  </option>
                  <option value="" disabled>
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
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    <FiChevronDown className="text-xl" />
                  </span>
                </div>
              </div>
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
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="name"
                    key={field.id}
                    className={inputClass}
                    {...register(`players.${index}.name`)}
                  >
                    <option value="" disabled>
                      Select a player
                    </option>
                    {batch.map((player) => (
                      <option
                        value={player.name}
                      >{`${player.pos} ${player.name} ${player.ov}ov`}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      <FiChevronDown className="text-xl" />
                    </span>
                  </div>
                </div>
                {errors?.players?.[index]?.name && (
                  <span className="text-red-700">
                    {errors?.players?.[index]?.name?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2 justify-end">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label htmlFor="name" className={labelClass}>
                  AAV
                </label>

                <Salary
                  control={control}
                  {...register(`players.${index}.aav`)}
                />

                {errors?.players?.[index]?.aav && (
                  <span className="text-red-700">
                    {errors?.players?.[index]?.aav?.message}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label htmlFor="years" className={labelClass}>
                  Years
                </label>
                <input
                  id="years"
                  key={field.id}
                  className={inputClass}
                  placeholder="1 - 3 years"
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
          <div className="mb-2">
            Total salary:{" "}
            <Cleave
              value={salaryTotal}
              options={{
                numeral: true,
                prefix: "$",
                signBeforePrefix: true,
                numeralThousandsGroupStyle: "thousand"
              }}
            />
          </div>

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

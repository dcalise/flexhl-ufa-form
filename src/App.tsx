import Cleave from "cleave.js/react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from "react-hook-form";
import {
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { batch } from "./batch";

import { schema } from "./schema";
import { Inputs } from "./types";
import { supabase } from "./supabaseClient";
import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { PostgrestError } from "@supabase/supabase-js";

interface ChangeEvent<T> extends React.ChangeEvent<T> {
  target: { rawValue: string } & EventTarget & T;
}

export default function App() {
  const [appState, setAppState] = useState("new");
  const [appErrors, setAppErrors] = useState<PostgrestError | null>(null);
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
      players: [{ name: "", aav: "0M", years: null }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  });
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const payload = formData.players.map((player) => ({
      gm: formData.gm,
      team: formData.team,
      playerName: player.name,
      aav: player.aav ? parseFloat(player.aav) : 0,
      years: player.years ? parseFloat(player.years) : 0
    }));

    const { data, error } = await supabase.from("ufax2022").insert(payload);
    if (error) {
      setAppErrors(error);
      setAppState("failed");
    }
    if (data) {
      setAppState("success");
    }
  };

  const [salaryTotal, setSalaryTotal] = useState(0);
  const players = watch("players");

  // eslint-disable-next-line
  useEffect(() => {
    let total = 0;
    players.forEach((player) => {
      const aav = player.aav ? parseFloat(player.aav) : 0;
      total = total + (aav || 0);
    });

    setSalaryTotal(total);
  });

  return (
    <div>
      {(appState === "new" || appState === "failed") && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto max-w-lg py-10"
        >
          <div className="p-4">
            <h1 className="text-3xl">Flex Hockey League</h1>
            <h2 className="text-xl">UFAX Batch 1</h2>
            <p className="text-lg mt-4">
              Welcome to the annual UFA Extravaganza! You may use the form below
              to bid on as many players as you'd like, however,{" "}
              <strong>
                you must have the available cap space to sign all players that
                you bid on.
              </strong>
            </p>

            <p className="text-lg my-4">
              You can select from the players in the dropdown. These are the
              players available in the current batch. There will be several
              batches. Find more info in Discord.
            </p>

            <p className="text-lg my-4">
              Contracts must range between $500,000 and $12,000,000 and can be a
              maximum of 3 years long. The AAV will be formatted in millions
              with a maximum of two decimal places. For example,{" "}
              <strong>$7.25M is $7,250,000.</strong>
            </p>

            <p className="text-lg my-4">
              Tie Breaker: If the highest bid is tied, the{" "}
              <strong>longer</strong> contract will win. If the length is the
              same, the team with waiver priority (lowest in standings) will win
              the player.
            </p>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <div className="text-gray-500 mb-4 -mt-2">
                  Use the name we know you by. If you are bidding for another
                  team, you can still put your name.
                </div>
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
                  <select
                    id="name"
                    className={inputClass}
                    {...register(`team`)}
                  >
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

                  <Controller
                    control={control}
                    {...register(`players.${index}.aav`)}
                    render={({ field: { onChange, onBlur } }) => {
                      const handleChange = (
                        event: ChangeEvent<HTMLInputElement>
                      ) => {
                        onChange(event.target.rawValue.replace("M", ""));
                      };
                      return (
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <Cleave
                            onChange={handleChange}
                            onBlur={onBlur}
                            className={`${inputClass} pl-6`}
                            placeholder="0.50M"
                            options={{
                              numeral: true,
                              prefix: "M",
                              tailPrefix: true,
                              numeralPositiveOnly: true
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                  {errors?.players?.[index]?.aav && (
                    <span className="text-red-700">
                      {errors?.players?.[index]?.aav?.message}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                  <label htmlFor="years" className={labelClass}>
                    Contract Length
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      id="years"
                      key={field.id}
                      className={inputClass}
                      placeholder="1 - 3 years"
                      {...register(`players.${index}.years`)}
                    >
                      <option value="" disabled>
                        1 - 3 years
                      </option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        <FiChevronDown className="text-xl" />
                      </span>
                    </div>
                  </div>
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

          <div className="p-4 text-center">
            <button
              type="button"
              className={`${secondaryButtonClass}`}
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
          </div>

          <div className="p-4">
            <div className="mb-2 text-lg text-center">
              <div className="text-green-800 font-bold">Total salary:</div>$
              {salaryTotal}M
            </div>

            {appState === "failed" ? (
              <div>
                <div className="text-red-700 mb-2">
                  There was a serverside error upon submission. Please send the
                  below error to the commissioners. You can also screenshot the
                  page to manually submit your bids.
                </div>
                <code>
                  <pre>{JSON.stringify(appErrors, null, 2)}</pre>
                </code>
              </div>
            ) : (
              <div className="p-4 text-center">
                <input className={primaryButtonClass} type="submit" />
              </div>
            )}
          </div>
        </form>
      )}

      {appState === "success" && (
        <div className="w-full mx-auto max-w-lg py-10">
          <h1 className="text-3xl text-gray-800 text-center">
            Thank you, your bids have been successfully submitted.
          </h1>
        </div>
      )}
    </div>
  );
}

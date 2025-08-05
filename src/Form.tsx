import React, { useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import {
  disabledPrimaryButtonClass,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "./styles";

import { PostgrestError } from "@supabase/supabase-js";
import { yupResolver } from "@hookform/resolvers/yup";
import { playerList } from "./data/batch10-player-table";
import { goalieList } from "./data/batch10-goalie-table";

import { schema } from "./schema";
import { Inputs } from "./types";
import { Modal } from "./components/Modal";
import { supabase } from "./supabaseClient";
import { FiChevronDown } from "react-icons/fi";
import { Instructions } from "./components/Instructions";

interface ChangeEvent<T> extends React.ChangeEvent<T> {
  target: { rawValue: string } & EventTarget & T;
}

interface FormProps {
  appState: string;
  setAppState: Function;
  isOpenBatch: boolean;
}

export const Form = ({ appState, setAppState, isOpenBatch }: FormProps) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      team: "",
      players: [{ name: "", aav: "0", years: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appErrors, setAppErrors] = useState<PostgrestError | null>(null);
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsSubmitting(true);
    const payload = formData.players.map((player) => ({
      gm: formData.gm,
      team: formData.team,
      playerName: player.name,
      aav: player.aav ? parseFloat(player.aav) : 0,
      years: player.years ? parseFloat(player.years) : 0,
    }));

    const { data, error } = await supabase
      .from("ufax2025_batch_10")
      .insert(payload);
    if (error) {
      setAppErrors(error);
      setAppState("failed");
    }
    if (data) {
      setAppState("success");
      window.scrollTo(0, 0);
    }
    setIsSubmitting(false);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Instructions />
      <div className="p-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <div className="text-gray-500 mb-4 -mt-2">
              Use the name we know you by. If you are bidding for another team,
              you can still put your name.
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
                <option value="UTA">Utah HC</option>
                <option value="CGY">Calgary Flames</option>
                <option value="CHI">Chicago Blackhawks</option>
                <option value="COL">Colorado Avalanche</option>
                <option value="DAL">Dallas Stars</option>
                <option value="EDM">Edmonton Oilers</option>
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
        <div key={field.id} className="p-4">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label htmlFor="name" className={labelClass}>
                Player Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                {isOpenBatch ? (
                  <input
                    id="name"
                    className={inputClass}
                    {...register(`players.${index}.name`)}
                  />
                ) : (
                  <>
                    <select
                      id="name"
                      className={inputClass}
                      {...register(`players.${index}.name`)}
                    >
                      <option value="" disabled>
                        Select a player
                      </option>
                      {playerList.map((player) => (
                        <option key={player.name} value={player.name}>{`${
                          player.pos === "D" ? "D" : "F"
                        } ${player.name} ${player.OV}ov`}</option>
                      ))}

                      {goalieList.map((player) => (
                        <option
                          key={player.name}
                          value={player.name}
                        >{`G ${player.name} ${player.OV}ov`}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        <FiChevronDown className="text-xl" />
                      </span>
                    </div>
                  </>
                )}
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
                          numeralPositiveOnly: true,
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
              aav: "0",
              years: null,
            })
          }
        >
          Add another player
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2 text-lg text-center">
          <div className="text-green-800 font-bold">Total salary:</div>$
          {salaryTotal.toFixed(2)}M
        </div>

        {appState === "failed" ? (
          <div>
            <div className="text-red-700 mb-2">
              There was a serverside error upon submission. Please send the
              below error to the commissioners. You can also screenshot the page
              to manually submit your bids.
            </div>
            <code>
              <pre>{JSON.stringify(appErrors, null, 2)}</pre>
            </code>
          </div>
        ) : (
          <div className="p-4 text-center">
            <Modal
              buttonClasses={primaryButtonClass}
              validate={trigger}
              buttonText="Submit"
            >
              <h3 className="text-xl text-gray-800">Bid Summary</h3>
              <p className="mb-1">
                Please review your available cap space and your bids before
                submitting.
              </p>

              <table className="w-3/4 mx-auto text-sm text-left my-6">
                <tbody>
                  {players.map(({ name, aav, years }) => (
                    <tr className="bg-white" key={name}>
                      <td className="py-1 px-6">{name}</td>
                      <td className="py-1 px-6 text-right">
                        ${aav}M/{years}y
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mb-2 text-lg text-center">
                <div className="text-green-800 font-bold">Total salary:</div>$
                {salaryTotal.toFixed(2)}M
              </div>
              <button
                disabled={isSubmitting || appState === "success"}
                className={
                  isSubmitting || appState === "success"
                    ? disabledPrimaryButtonClass
                    : primaryButtonClass
                }
                type="submit"
              >
                Confirm
              </button>
            </Modal>
          </div>
        )}
      </div>
    </form>
  );
};

import { playerList } from "./data/batch9-player-table";
import { thClasses, tdClasses, pClasses } from "./styles";

export const PlayerTable = () => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded overflow-hidden">
        <table className="table-auto min-w-full leading-normal overflow-scroll">
          <thead>
            <tr>
              <th className={thClasses}>Skater</th>
              <th className={thClasses}>Pos</th>
              <th className={thClasses}>CK</th>
              <th className={thClasses}>FG</th>
              <th className={thClasses}>DI</th>
              <th className={thClasses}>SK</th>
              <th className={thClasses}>ST</th>
              <th className={thClasses}>EN</th>
              <th className={thClasses}>DU</th>
              <th className={thClasses}>PH</th>
              <th className={thClasses}>FO</th>
              <th className={thClasses}>PA</th>
              <th className={thClasses}>SC</th>
              <th className={thClasses}>DF</th>
              <th className={thClasses}>PS</th>
              <th className={thClasses}>EX</th>
              <th className={thClasses}>LD</th>
              <th className={thClasses}>OV</th>
              <th className={thClasses}>Age</th>
            </tr>
          </thead>
          <tbody>
            {playerList.map((player) => (
              <tr key={player.name}>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.name}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>
                    {player.C || player.L || player.R ? "F" : "D"}
                  </p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.CK}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.FG}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.DI}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.SK}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.ST}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.EN}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.DU}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.PH}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.FO}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.PA}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.SC}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.DF}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.PS}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.EX}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.LD}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.OV}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{player.age}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

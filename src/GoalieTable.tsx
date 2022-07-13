import { goalieList } from "./data/4-goalie-table";
import { thClasses, tdClasses, pClasses } from "./styles";

export const GoalieTable = () => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded overflow-hidden">
        <table className="table-auto min-w-full leading-normal overflow-scroll">
          <thead>
            <tr>
              <th className={thClasses}>Goalie</th>
              <th className={thClasses}>SK</th>
              <th className={thClasses}>DU</th>
              <th className={thClasses}>EN</th>
              <th className={thClasses}>SZ</th>
              <th className={thClasses}>AG</th>
              <th className={thClasses}>RB</th>
              <th className={thClasses}>SC</th>
              <th className={thClasses}>HS</th>
              <th className={thClasses}>RT</th>
              <th className={thClasses}>PH</th>
              <th className={thClasses}>PS</th>
              <th className={thClasses}>EX</th>
              <th className={thClasses}>LD</th>
              <th className={thClasses}>OV</th>
              <th className={thClasses}>Age</th>
            </tr>
          </thead>
          <tbody>
            {goalieList.map((goalie) => (
              <tr key={goalie.name}>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.name}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.SK}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.DU}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.EN}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.SZ}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.AG}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.RB}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.SC}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.HS}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.RT}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.PH}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.PS}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.EX}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.LD}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.OV}</p>
                </td>
                <td className={tdClasses}>
                  <p className={pClasses}>{goalie.AGE}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

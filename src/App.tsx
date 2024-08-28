import { useState } from "react";

// import { PlayerTable } from "./PlayerTable";
// import { GoalieTable } from "./GoalieTable";
import { Form } from "./Form";

export default function App() {
  const [appState, setAppState] = useState("new");

  const isOpenBatch = true;

  return (
    <div className="mx-auto container lg:grid lg:grid-cols-12 lg:gap-4">
      <div className="col-span-12 px-4 py-8">
        <h1 className="text-3xl">Flex Hockey League</h1>
        <h2 className="text-xl">UFAX Batch 10</h2>
      </div>
      <div className="lg:col-span-5">
        {(appState === "new" || appState === "failed") && (
          <Form
            appState={appState}
            setAppState={setAppState}
            isOpenBatch={isOpenBatch}
          />
        )}

        {appState === "success" && (
          <div className="w-full mx-auto max-w-lg py-10">
            <h1 className="text-3xl text-gray-800 text-center">
              Thank you, your bids have been successfully submitted.
            </h1>
          </div>
        )}
      </div>
      {/* <div className="lg:col-span-7">
        <PlayerTable />
        <br />
        <GoalieTable />
      </div> */}
      <div className="col-span-12 py-4 text-gray-400 text-right text-xs">
        v{process.env.REACT_APP_VERSION}
      </div>
    </div>
  );
}

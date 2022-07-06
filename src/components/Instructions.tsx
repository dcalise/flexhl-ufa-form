export const Instructions = () => (
  <div className="px-4">
    <p className="text-lg">
      Welcome to the annual UFA Extravaganza! You may use the form below to bid
      on as many players as you'd like, however,{" "}
      <strong>
        you must have the available cap space to sign all players that you bid
        on.
      </strong>
    </p>

    <p className="text-lg my-4">
      You can select from the players in the dropdown. These are the players
      available in the current batch. There will be several batches. Find more
      info in Discord.
    </p>

    <p className="text-lg my-4">
      Contracts must range between $500,000 and $12,000,000 and can be a maximum
      of 3 years long. The AAV will be formatted in millions with a maximum of
      two decimal places. For example, <strong>$7.25M is $7,250,000.</strong>
    </p>

    <p className="text-lg my-4">
      Tie Breaker: If the highest bid is tied, the <strong>longer</strong>{" "}
      contract will win. If the length is the same, the team with waiver
      priority (lowest in standings) will win the player.
    </p>
  </div>
);

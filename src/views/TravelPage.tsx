import { useState } from "react";
import { Form } from "../components/Form";
import YAML from "yaml";
import Travel from "../components/Travel";
const quests = {
  "": [
    "7656000097055420305",
    "-7959022631105399792",
    "-5431161251827272709",
    "946998934114483299",
  ],
  "Reston & Fairview": [
    "7656000097055420305",
    "-4664309391657875505",
    "1606788516973598093",
    "-6564276519271788131",
    "-8712852306598876069",
    "-8953900199947314003",
  ],
};
export default function TravelPage() {
  const [points, setPoints] = useState(quests["Reston & Fairview"]);
  const [mode, setMode] = useState("distance");
  function submit(points, mode: string) {
    setPoints(points);
    setMode(mode);
  }
  return (
    <>
      <Form route={points} onSubmit={submit} />
      <Travel points={points} mode={mode} />
    </>
  );
}

import { useState } from "react";
import { Form } from "../components/Form";
import YAML from "yaml";
import Travel from "../components/Travel";

export default function TravelPage() {
  const [points, setPoints] = useState();
  const [mode, setMode] = useState();
  const [route, setRoute] = useState<any>([
    "7656000097055420305",
    "-7959022631105399792",
    "-5431161251827272709",
    "946998934114483299",
  ]);
  function submit(points, mode: string) {
    setPoints(points);
    setMode(mode);
  }
  return (
    <>
      <Form route={route} onSubmit={submit} />
      <pre>{YAML.stringify({ points, mode })}</pre>
      <Travel points={points} mode={mode} />
    </>
  );
}

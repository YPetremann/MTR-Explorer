import { TravelForm as Form } from "../components/TravelForm";
import Travel from "../components/Travel";
import Header from "../components/Header";
import Main from "../components/Main";
import { useNavigate, useParams } from "react-router-dom";
const quests = {
  "Destination Vol. 1: Reston & Fairview":
    "7656000097055420305/-4664309391657875505/1606788516973598093/-6564276519271788131/-8712852306598876069/-8953900199947314003",
  "Destination Vol. 2: Lake City":
    "7656000097055420305/-7959022631105399792/-5431161251827272709/946998934114483299",
  "Expedition Vol. 1: Up North":
    "7656000097055420305/-8712852306598876069/-8712852306598876069",
  "Expedition Vol. 2: Down South": "7656000097055420305/-4664309391657875505",
  "Expedition Vol. 3: Hoppin' Around":
    "7656000097055420305/-4664309391657875505",
  "Expedition Vol. 4: The Far Reaches":
    "7656000097055420305/-4664309391657875505",
  "Expedition Vol. 5: Neglected Corner":
    "7656000097055420305/-4664309391657875505",
  "Expedition Vol. 6: A Final Test": "7656000097055420305/-4664309391657875505",
};
const def = quests["Destination Vol. 1: Reston & Fairview"];
export default function TravelPage() {
  const { algo, "*": rest = def } = useParams();
  const navigate = useNavigate();
  const points = rest?.split("/");
  function submit(points, algo: string) {
    navigate(`/travel/${algo}/${points.join("/")}`);
  }
  return (
    <>
      <Header name="Travel">
        <section className="flex flex-col gap-2 italic">
          <p>Favorite paths saved in profile.</p>
        </section>
        <Form route={points} algo={algo} onSubmit={submit} />
      </Header>
      <Main>
        {points.length > 1 && algo && <Travel points={points} algo={algo} />}
      </Main>
    </>
  );
}

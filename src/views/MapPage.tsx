import Header from "../components/Header";
import Main from "../components/Main";
import { useSearchParams } from "react-router-dom";

export default function MapPage() {
  const { stations, platforms, routes, segments, zoom } = useSearchParams();
  return (
    <>
      <Header name="Map">
        <pre>{JSON.stringify(stations, platforms, routes, segments, zoom)}</pre>
      </Header>
      <Main>
        <section className="flex flex-col gap-2">
          <p>This feature will permit to see the network map.</p>
          <p>You will be able to highlight some elements:</p>
          <ul>
            <li>-Stations</li>
            <li>-Platforms</li>
            <li>-Routes</li>
            <li>-Segments</li>
          </ul>
          <p>You also will be able to indicate the way to zoom.</p>
          <ul>
            <li>-Full: will display the full map</li>
            <li>-Highlight: will zoom on highlighted elements</li>
            <li>-Station: will display a quick mapping of the first station</li>
            <li>-Player: will zoom on player</li>
          </ul>
        </section>
      </Main>
    </>
  );
}

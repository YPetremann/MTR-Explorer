import Header from "../components/Header";
import Main from "../components/Main";

export default function ConfigPage() {
  return (
    <>
      <Header name="Incidents">
        {/*<form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="incident_type"
              className="block text-sm font-medium text-gray-700"
            >
              Incident type
            </label>
            <select
              id="incident_type"
              name="incident_type"
              autoComplete="incident_type"
              className=""
            >
              <option>Train never come at station</option>
              <option>Platform is inaccessible in a station</option>
              <option>A platform or exit is inapropriatly indicated</option>
              <option>A train always delay between two stations</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="incident_station"
              className="block text-sm font-medium text-gray-700"
            >
              Station
            </label>
            <select
              id="incident_station"
              name="incident_station"
              autoComplete="incident_station"
              className=""
            >
              <option>Admiralty</option>
              <option>Airport</option>
              <option>AsiaWorld-Expo</option>
              <option>Austin</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="incident_route"
              className="block text-sm font-medium text-gray-700"
            >
              Route
            </label>
            <select
              id="incident_route"
              name="incident_route"
              autoComplete="incident_route"
              className=""
            >
              <option>Island Line</option>
              <option>South Island Line</option>
              <option>Tsuen Wan Line</option>
              <option>Tung Chung Line</option>
            </select>
          </div>
        </form>*/}
      </Header>
      <Main>
        <section className="flex flex-col gap-2 italic">
          <p>This feature will permit to declare incidents.</p>
          <p>Examples of incidents:</p>
          <ul>
            <li>- Train never come at station</li>
            <li>- Platform is inaccessible in a station</li>
            <li>- A platform or exit is inapropriatly indicated</li>
            <li>- A train always delay between two stations</li>
          </ul>
          <p>Declaring incident will have repercution on the precalculation and on the pathfinding.</p>
          <p>Declaring incident will ease reporting them to server admins.</p>
        </section>
      </Main>
    </>
  );
}

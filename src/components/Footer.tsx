import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-header p-2 text-center text-header">
      <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
        <a
          href="https://github.com/YPetremann/MTR-Explorer/"
          property="dct:title"
          rel="cc:attributionURL noreferrer"
          target="_blank"
        >
          MTR Explorer
        </a>
        <span> by </span>
        <a
          href="https://github.com/YPetremann/"
          property="cc:attributionName"
          rel="cc:attributionURL dct:creator noreferrer"
          target="_blank"
        >
          YPetremann
        </a>
        <span> is licensed under </span>
        <a
          className="inline-block"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          rel="license noopener noreferrer"
          target="_blank"
        >
          <span> CC BY-NC-SA 4.0 </span>
          <Icon icon="ri:creative-commons-fill" className="ml-1 align-text-top text-xl" />
          <Icon icon="ri:creative-commons-by-fill" className="ml-1 align-text-top text-xl" />
          <Icon icon="ri:creative-commons-nc-fill" className="ml-1 align-text-top text-xl" />
          <Icon icon="ri:creative-commons-sa-fill" className="ml-1 align-text-top text-xl" />
        </a>
      </p>
    </footer>
  );
}

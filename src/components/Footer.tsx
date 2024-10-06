export function Footer() {
  return (
    <footer className="bg-header p-2 text-center text-header">
      <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
        <a property="dct:title" rel="cc:attributionURL" href="https://github.com/YPetremann/MTR-Explorer/">
          MTR Explorer
        </a>
        {" by "}
        <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/YPetremann/">
          YPetremann
        </a>
        {" is licensed under "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          className="inline-block"
        >
          {" CC BY-NC-SA 4.0 "}
          <img
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            alt=""
          />
          <img
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            alt=""
          />
          <img
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
            alt=""
          />
          <img
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
            alt=""
          />
        </a>
      </p>
    </footer>
  );
}

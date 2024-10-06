export function Footer() {
  return (
    <footer className="bg-header p-2 text-center text-header">
      <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
        <a href="https://github.com/YPetremann/MTR-Explorer/" property="dct:title" rel="cc:attributionURL">
          MTR Explorer
        </a>
        {" by "}
        <a href="https://github.com/YPetremann/" property="cc:attributionName" rel="cc:attributionURL dct:creator">
          YPetremann
        </a>
        {" is licensed under "}
        <a
          className="inline-block"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          rel="license noopener noreferrer"
          target="_blank"
        >
          {" CC BY-NC-SA 4.0 "}
          <img
            alt=""
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          />
          <img
            alt=""
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          />
          <img
            alt=""
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
          />
          <img
            alt=""
            className="ml-[3px] inline h-[22px] align-text-bottom"
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
          />
        </a>
      </p>
    </footer>
  );
}

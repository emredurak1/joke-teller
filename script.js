const audioElement = document.querySelector(".audio");
const button = document.querySelector(".button");

const toggleButton = function () {
  button.disabled = !button.disabled;
};

const getJoke = async function () {
  let joke = "";
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    const data = await response.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else joke = data.joke;
    tellMe(joke);
    toggleButton();
  } catch (err) {
    console.error(err);
  }
};

const tellMe = function (joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "<apiKey>",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);

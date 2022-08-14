export let makeDark = () => {
  document.documentElement.style.setProperty("--bg", "#333741");
  document.documentElement.style.setProperty("--box", "#475a6f");
  document.documentElement.style.setProperty("--icon", "#f5f7fb");
  $(".fa-moon").toggleClass("hide");
  $(".fa-sun").toggleClass("hide");
};

export let makeWhite = () => {
  document.documentElement.style.setProperty("--bg", "#f5f7fb");
  document.documentElement.style.setProperty("--box", "#fff");
  document.documentElement.style.setProperty("--icon", "#212529");
  $(".fa-moon").toggleClass("hide");
  $(".fa-sun").toggleClass("hide");
};

export let regHideOut = () => {
  $(".regField").fadeOut("swing", () => {
    $(".msgBody").css({ visibility: "visible" });
    $(".msgBody").fadeIn("swing");
  });
};

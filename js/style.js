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

let makeVisible = (elem) => {
  elem.css({ visibility: "visible" });
  elem.css({ opacity: "1" });
  elem.css({ transition: "ease-in 0.2s" });
};

export let regHideOut = () => {
  $(".regField").fadeOut("swing", () => {
    makeVisible($(".msgBody"));
    makeVisible($(".iconDiv"));
    makeVisible($(".nav-items"));
  });
};

export let toggleUserList = () => {
  $(".userDiv").toggleClass("hide");
  if ($(".msgDiv").hasClass("col-9")) {
    $(".msgDiv").removeClass("col-9");
    $(".bar2Icon").css({ transform: "rotate(0deg)" });
  } else {
    $(".msgDiv").addClass("col-9");
    $(".bar2Icon").css({ transform: "rotate(-90deg)" });
  }
};


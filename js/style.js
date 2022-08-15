let signInPrev = $(".signIn").css("transform");
let signUpPrev = $(".signUp").css("transform");
console.log(signInPrev,signUpPrev)
export let signInToSignUp = () => {
  $(".signIn").css({ transform: "translateX(0%)" });
  $(".signUp").css({ transform: "translateX(0%)" });
  $(".signIn").fadeOut(function () {
    $(".heading").text("Sign Up");
    $(".signInBtn").addClass("hide");
    $(".guestBtn").addClass("hide");
    $(".signUpBtn").removeClass("hide");
    $(".backToLogin").removeClass("hide");
    $(".backBtnDiv").removeClass("hide");
    $(".createAccountDiv").css({ display: "none" });
    $(".signIn").fadeIn();
  });
};

export let signUpToSignIn = () =>{
  $(".signIn").css({ transform: signInPrev });
  $(".signUp").css({ transform: signUpPrev });
  $(".signIn").fadeOut(function () {
    $(".heading").text("Sign In");
    $(".signInBtn").removeClass("hide");
    $(".guestBtn").removeClass("hide");
    $(".signUpBtn").addClass("hide");
    $(".backToLogin").addClass("hide");
    $(".backBtnDiv").addClass("hide");
    $(".createAccountDiv").css({ display: "flex" });
    $(".signIn").fadeIn();
  });
}

export let makeDark = () => {
  document.documentElement.style.setProperty("--bg", " #333741");
  document.documentElement.style.setProperty("--box", " #475a6f");
  document.documentElement.style.setProperty("--icon", " #f5f7fb");
  $(".fa-moon").toggleClass("hide");
  $(".fa-sun").toggleClass("hide");
};

export let makeWhite = () => {
  document.documentElement.style.setProperty("--bg", " #f5f7fb");
  document.documentElement.style.setProperty("--box", " #fff");
  document.documentElement.style.setProperty("--icon", " #212529");
  $(".fa-moon").toggleClass("hide");
  $(".fa-sun").toggleClass("hide");
};

let makeVisible = (elem) => {
  elem.css({ visibility: "visible" });
  elem.css({ opacity: "1" });
  elem.css({ transition: "ease-in 0.2s" });
};

export let regHideOut = () => {
  $(".signInUpBox").fadeOut("swing", () => {
    makeVisible($(".msgBody"));
    makeVisible($(".navbar"));
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

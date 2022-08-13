export let appendMyChat = (msg) => {
  if (msg) {
    let $myDiv = $("<div>", { class: "row" });
    let $myDivText = $("<pre>", { class: "myChat ms-auto" });
    let $time = $("<div>", { class: "time" });
    $myDivText.text(msg);
    $time.text(new Date().toLocaleTimeString());
    $myDiv.append($myDivText);
    $myDiv.append($time);
    $(".msgData").append($myDiv);
  }
};

export let appendOtherChat = (msg, userName) => {
  let $otherDiv = $("<div>", { class: "row" });
  let $otherDivName = $("<div>", { class: "name text-capitalize" });
  let $otherDivLogo = $("<div>", { class: "userLogo" });
  let $otherDivText = $("<pre>", { class: "otherChat me-auto" });
  let $time = $("<div>", { class: "otherTime p-0" });
  $time.text(new Date().toLocaleTimeString());
  $otherDivLogo.html(`<i class="fa-solid fa-user"></i>`);
  $otherDiv.append($otherDivName);
  $otherDiv.append($otherDivLogo);
  $otherDiv.append($otherDivText);
  $otherDiv.append($time);
  $otherDivName.text(userName);
  $otherDivText.text(msg);
  $(".msgData").append($otherDiv);
};

export let appendMyImg = (imgSrc) => {
  let $myDiv = $("<div>", { class: "row" });
  let $myDivImg = $("<div>", { class: "col-lg-5 col-md-7 col-9 ms-auto imgBody mt-2" });
  let $myImg = $("<img>", { class: "img", src: imgSrc });
  let $time = $("<div>", { class: "time" });
  $time.text(new Date().toLocaleTimeString());
  $myDivImg.append($myImg);
  $myDivImg.append($time);
  $myDiv.append($myDivImg);
  $(".msgData").append($myDiv);
};

export let appendOtherImg = (imgSrc,userName) => {
  let $otherDiv = $("<div>", { class: "row" });
  let $otherDivName = $("<div>", { class: "name text-capitalize" });
  let $otherDivLogo = $("<div>", { class: "userLogo" });
  let $otherDivImg = $("<div>", { class: "col-lg-5 col-md-7 col-9 imgBody me-auto" });
  let $otherImg = $("<img>", { class: "img", src: imgSrc });
  let $time = $("<div>", { class: "otherTime" });
  $time.text(new Date().toLocaleTimeString());
  $otherDivLogo.html(`<i class="fa-solid fa-user"></i>`);
  $otherDivImg.append($otherImg);
  $otherDiv.append($otherDivName);
  $otherDiv.append($otherDivLogo);
  $otherDiv.append($otherDivImg);
  $otherDiv.append($time);
  $otherDivName.text(userName);
  $(".msgData").append($otherDiv);
};

export let notification = (userName, event) => {
  let $notifyDiv = $("<div>", { class: "notification" });
  $notifyDiv.text(userName + " " + event + " the chat");
  $(".msgData").append($notifyDiv);
};
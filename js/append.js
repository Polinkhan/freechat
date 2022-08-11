export let appendMyChat = (msg) => {
  if (msg) {
    let $myDiv = $("<div>", { class: "row" });
    let $myDivText = $("<div>", { class: "myChat ms-auto" });
    $myDivText.text(msg);
    $myDiv.append($myDivText);
    $(".msgData").append($myDiv);
  }
};

export let appendOtherChat = (msg, userName) => {
  let $otherDiv = $("<div>", { class: "row" });
  let $otherDivName = $("<div>", { class: "name text-capitalize" });
  let $otherDivLogo = $("<div>", { class: "userLogo" });
  let $otherDivText = $("<div>", { class: "otherChat me-auto" });
  $otherDivLogo.html(`<i class="fa-solid fa-user"></i>`);
  $otherDiv.append($otherDivName);
  $otherDiv.append($otherDivLogo);
  $otherDiv.append($otherDivText);
  $otherDivName.text(userName);
  $otherDivText.text(msg);
  $(".msgData").append($otherDiv);
};

export let notification = (userName) => {
  let $notifyDiv = $("<div>", { class: "notification" });
  $notifyDiv.text(userName+" joined the chat")
  $(".msgData").append($notifyDiv);
};

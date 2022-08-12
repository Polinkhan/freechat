export let appendMyChat = (msg) => {
  if (msg) {
    let $myDiv = $("<div>", { class: "row" });
    let $myDivText = $("<div>", { class: "myChat ms-auto" });
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
  let $otherDivText = $("<div>", { class: "otherChat me-auto" });
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

export let notification = (userName,event) => {
  let $notifyDiv = $("<div>", { class: "notification" });
  $notifyDiv.text(userName+ " " + event +" the chat")
  $(".msgData").append($notifyDiv);
};

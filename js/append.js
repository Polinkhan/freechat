export let appendMyChat = (msg) => {
  if (msg) {
    let $outherDiv = $("<div>", { class: "row" });
    let $innerDiv1 = $("<div>", { class: "myChat ms-auto" });
    let $innerDiv2 = $("<div>", { class: "time" });
    $innerDiv1.text(msg);
    $innerDiv2.text(new Date().toLocaleTimeString());
    $outherDiv.append($innerDiv1);
    $outherDiv.append($innerDiv2);
    $(".msgData").append($outherDiv);
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

export let appendOtherImg = (imgSrc, userName) => {
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

export let userInfo = (imgSrc, userName, userId) => {
  let t_id = "type" + userId;
  let $masterDiv = $("<div>", { class: "row user g-0", id: userId });
  let $outerDiv1 = $("<div>", { class: "avater col-3 col-md-3 col-sm-12 py-3" });
  let $outerDiv2 = $("<div>", { class: "labelName col my-auto py-3" });
  let $outerDiv3 = $("<div>", { class: "col-2 labelTime text-muted my-auto" });
  let $OD1Content = $("<img>", { class: "img-fluid", src: imgSrc });
  let $OD2Content = $("<div>", { class: "row flex-column px-2" });
  let $OD2CofContent1 = $("<div>", { class: "col-12 fs-6 fw-bold userNName" });
  let $OD2CofContent2 = $("<div>", { class: "col-12 typingIndicator text-muted", id: t_id });
  $OD2CofContent1.text(userName);
  $OD2CofContent2.text("Online");
  $outerDiv3.text(getCurrentTime());
  $(".userList").append($masterDiv);
  $masterDiv.append($outerDiv1);
  $masterDiv.append($outerDiv2);
  $masterDiv.append($outerDiv3);
  $outerDiv1.append($OD1Content);
  $outerDiv2.append($OD2Content);
  $OD2Content.append($OD2CofContent1);
  $OD2Content.append($OD2CofContent2);
};

export let notification = (userName, event) => {
  let $notifyDiv = $("<div>", { class: "notification" });
  $notifyDiv.text(userName + " " + event + " the chat");
  $(".msgData").append($notifyDiv);
};

let getCurrentTime = () => {
  let date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return date.slice(0, -3);
};

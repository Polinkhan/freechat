import { appendMyChat, appendOtherChat, notification } from "./append.js";
import { getRandomUserName } from "./data.js";
import { socket } from "./cliant.js";

let scrollDown = () => {
  $(".msgBox").animate({ scrollTop: $(".msgBox").get(0).scrollHeight }, 0);
};

$(document).ready(function () {
  let userName;
  let typerId = [];
  let typerName = [];

  $(".chatField").fadeOut(0);

  $(".theme_icon").click(function () {
    if (!$(".icon_check").is(":checked")) $(".body").addClass("night");
    else $(".body").removeClass("night");
  });

  $("#registry").submit(function () {
    userName = $(".userName").val();
    if (!userName) userName = "Anonymous";
    $(".fa-circle").removeClass("hide");
    $(".userNameBody").html(userName);
    $(".regField").fadeOut("swing", () => {
      $(".chatField").fadeIn("swing");
    });
    socket.emit("new-user-joined", userName);
  });

  $(".shuffle").click(function () {
    $(".userName").val(getRandomUserName());
  });

  $(".typingArea").keyup(function (e) {
    if (e.key == "enter") socket.emit("stopTyping", userName);
    else if ($(".typingArea").val()) socket.emit("typing", userName);
    else socket.emit("stopTyping", userName);
  });

  $(".sendBtn").click(function () {
    appendMyChat($(".typingArea").val());

    socket.emit("stopTyping", userName);
    socket.emit("send", $(".typingArea").val());

    $(".typingArea").val("");
    $(".typingArea").focus();
    scrollDown();
  });

  socket.on("receive", ({ massege, name }) => {
    if (massege) {
      appendOtherChat(massege, name);
      scrollDown();
    }
  });

  socket.on("user-joined", (userName) => {
    notification(userName,"joined");
  });
  socket.on("userLeave", (userName) => {
    notification(userName,"left");
  });

  socket.on("userIsTyping", (user, id, userData) => {
    if (!typerId.includes(id)) {
      typerId.push(id);
      typerName.push(userData[id]);
    }
    if (typerName.length) $(".typingIndicator").html(typerName + ` is typing <img class="typingGif" src="./assets/dots.gif">`);
  });

  socket.on("userStopedTyping", (id, userData) => {
    typerId.splice(typerId.indexOf(id), 1);
    typerName.splice(typerName.indexOf(userData[id]), 1);

    if (typerName.length) $(".typingIndicator").text(typerName + " is typing...");
    else $(".typingIndicator").text("");
  });
});

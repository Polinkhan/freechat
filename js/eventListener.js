import { appendMyChat, appendOtherChat, notification } from "./append.js";
import { socket } from "./cliant.js";

let scrollDown = () => {
  $(".msgBox").animate({ scrollTop: $(".msgBox").get(0).scrollHeight }, 0);
};

$(document).ready(function () {
  let userName;

  $(".theme_icon").click(function () {
    if (!$(".icon_check").is(":checked")) {
      $(".body").addClass("night");
    } else {
      $(".body").removeClass("night");
    }
  });

  $("#registry").submit(function () {
    userName = $(".userName").val();
    if (!userName) userName = "Anonymous";
    $(".regField").addClass("hide");
    $(".chatField").removeClass("hide");
    $(".userNameBody").text(userName);

    socket.emit("new-user-joined", userName);
  });

  $(".sendBtn").click(function () {
    appendMyChat($(".typingArea").val());

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
  socket.on("user-joined",(userName)=>{
    notification(userName);
  })
});

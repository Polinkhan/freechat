import { appendMyChat, appendOtherChat, appendMyImg, appendOtherImg, notification } from "./append.js";
import { getRandomUserName } from "./data.js";
import { socket } from "./cliant.js";

let scrollDown = () => {
  $(".msgBox").animate({ scrollTop: $(".msgBox").get(0).scrollHeight }, 0);
};

$(document).ready(function () {
  let userName;
  let typerId = [];
  let typerName = [];
  let compressedImgData;
  let originalImgData;

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

  $(".typingArea").keypress(function (e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      $(".sendBtn").click();
      socket.emit("stopTyping", userName);
    } else if ($(".typingArea").val()) socket.emit("typing", userName);
    else socket.emit("stopTyping", userName);
  });

  $(".imgUpload").change(function () {
    if ($(".imgUpload").val()) {
      const reader = new FileReader();
      let canvas = $("<canvas>")[0];
      let ctx = canvas.getContext("2d");
      reader.readAsDataURL($(".imgUpload")[0].files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        originalImgData = reader.result;
        img.onload = () => {
          let height = img.naturalHeight;
          let width = img.naturalWidth;
          canvas.width = 720;
          canvas.height = canvas.width * (height / width);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          compressedImgData = canvas.toDataURL();
          $(".imgPreview").attr("src", compressedImgData);
          $(".uploadIcon").addClass("hide");
          $(".imgPreviewBox").removeClass("hide");
        };
        console.log($(".imgPreview")[0].src);
      };
    }
  });

  $(".close").click(function () {
    compressedImgData = undefined;
    $(".imgUpload").val("");
    $(".uploadIcon").removeClass("hide");
    $(".imgPreviewBox").addClass("hide");
  });

  $(".sendBtn").click(function () {
    appendMyChat($(".typingArea").val());

    if (compressedImgData) {
      socket.emit("sendImg", compressedImgData);
      appendMyImg(compressedImgData);
      compressedImgData = undefined;
      $(".imgUpload").val("");
      $(".uploadIcon").removeClass("hide");
      $(".imgPreviewBox").addClass("hide");
    }

    socket.emit("stopTyping", userName);
    socket.emit("send", $(".typingArea").val());
    $(".typingArea").val("");
    $(".typingArea").css("height", "0px");
    $(".typingArea").focus();
    scrollDown();
  });

  socket.on("receive", ({ massege, name }) => {
    if (massege) {
      console.log(massege);
      appendOtherChat(massege, name);
      scrollDown();
    }
  });

  socket.on("receiveImg", (imgSrc, userName) => {
    appendOtherImg(imgSrc, userName);
    console.log(userName);
    scrollDown();
  });

  socket.on("user-joined", (userName) => {
    if (userName) notification(userName, "joined");
  });
  socket.on("userLeave", (userName) => {
    if (userName) notification(userName, "left");
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

    if (typerName.length) $(".typingIndicator").html(typerName + ` is typing <img class="typingGif" src="./assets/dots.gif">`);
    else $(".typingIndicator").text("");
  });
});

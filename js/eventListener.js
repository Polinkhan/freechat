import { appendMyChat, appendOtherChat, appendMyImg, appendOtherImg, notification } from "./append.js";
import { makeDark, makeWhite, regHideOut, toggleUserList } from "./style.js";
import { getRandomUserName } from "./data.js";
import { socket } from "./cliant.js";

let scrollDown = () => {
  $(".msgData").animate({ scrollTop: $(".msgData").get(0).scrollHeight }, 0);
};

$(document).ready(function () {
  let userName = "Anonymous";
  let typerId = [];
  let typerName = [];
  let compressedImgData;
  let originalImgData;

  $(".themeIcon").click(function () {
    let bgColour = getComputedStyle(document.body).getPropertyValue("--bg");
    if (bgColour === "#f5f7fb") makeDark();
    else makeWhite();
  });

  $(".toggleUserList").click(function () {
    toggleUserList();
  });

  $("#registry").submit(function () {
    userName = $(".userName").val();
    socket.emit("new-user-joined", userName);
    regHideOut();
  });

  $(".shuffle").click(function () {
    $(".userName").val(getRandomUserName());
  });

  $(".typingArea").keypress(function (e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      $(".sendBtnDiv").click();
      socket.emit("stopTyping", userName);
    }
  });

  $(".typingArea").keyup(function (e) {
    if ($(".typingArea").val()) socket.emit("typing", userName);
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
          canvas.width = 360;
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

  $(".sendBtnDiv").click(function () {
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

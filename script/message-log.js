export default function messageLog () {

  const messageLog = document.querySelector(".message-log");
  const messageLogInner = messageLog.querySelector(".inner");
  const messageLogList = messageLog.querySelector(".inner ul");
  const messageLogShowAllButton = messageLog.querySelector(".show-all");

  if (messageLogList.offsetHeight > messageLogInner.offsetHeight) {
    messageLog.classList.add("overflows");
  }

  messageLogShowAllButton.addEventListener("click", function() {
    messageLog.classList.toggle("expanded");
  });
}



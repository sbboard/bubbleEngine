const bubbles = [
  {
    name: "Link 1",
    text: "Filler filler hello filler",
    link: "#",
  },
  {
    name: "Link 2",
    text: "Filler filler hello filler",
    link: "#",
  },
  {
    name: "Link 3",
    text: "Filler filler hello filler",
    link: "#",
  },
  {
    name: "Link 4",
    text: "Filler filler hello filler",
    link: "#",
  },
  {
    name: "Link 5",
    text: "Filler filler hello filler",
    link: "#",
  },
];
const rowSize = 3;
let lastScrollTop = 0;

let bubbleElements = [];

function startBubbles() {
  let tank = document.getElementById("bubbleTank");
  //create bubbles
  bubbles.map((v, i) => {
    //create parent link
    let linkElement = document.createElement("a");
    linkElement.href = v.link;
    linkElement.classList.add("bubble");

    linkElement.onclick = (e) => {
      //forces second click on mobile
      if (linkElement.classList.contains("hovered") == false) {
        e.preventDefault();
      }
    };
    linkElement.onmouseover = () => {
      bubbleElements.map((nv, ni) => {
        if (i != ni) {
          //top row
          if (i < rowSize) {
            if (
              ni == i + rowSize ||
              (ni >= rowSize && ni == i + (rowSize - 1))
            ) {
              nv.classList.add("notHoveredClose");
            } else {
              nv.classList.add("notHoveredFar");
            }
          } else {
            if (
              ni == i - rowSize ||
              (ni < rowSize && ni == i - (rowSize - 1))
            ) {
              nv.classList.add("notHoveredClose");
            } else {
              nv.classList.add("notHoveredFar");
            }
          }
        } else {
          //timeout is so mobile can click and still not be "hovered"
          setTimeout(function () {
            nv.classList.add("hovered");
          }, 1);
        }
      });
    };
    linkElement.onmouseout = () => {
      bubbleElements.map((nv, ni) => {
        if (i != ni) {
          nv.classList.remove("notHoveredClose");
          nv.classList.remove("notHoveredFar");
        } else {
          nv.classList.remove("hovered");
        }
      });
    };

    //create topTin (for overlay effect)
    let topTin = document.createElement("span");
    topTin.classList.add("topTin");
    linkElement.appendChild(topTin);

    //create bubbleInnerWrap
    let bubbleWrap = document.createElement("span");
    bubbleWrap.classList.add("bubInnerWrap");

    //create bubTitle element
    let bubTitle = document.createElement("span");
    bubTitle.innerHTML = v.name;
    bubTitle.classList.add("bubTitle");
    bubbleWrap.appendChild(bubTitle);

    //create bubText element
    let bubText = document.createElement("span");
    bubText.innerHTML = v.text;
    bubText.classList.add("bubText");
    bubbleWrap.appendChild(bubText);

    linkElement.appendChild(bubbleWrap);
    bubbleElements.push(linkElement);
    tank.appendChild(linkElement);
  });
  calculatePlaces();
}

startBubbles();

function calculatePlaces() {
  let bubbleSize = bubbleElements[0].offsetWidth;
  let innerBubblesize = bubbleElements[0].children[1].offsetWidth;
  let edgeSize = (bubbleSize - innerBubblesize) / 2;
  bubbleElements.map((e, i) => {
    let rowNum = Math.floor(i / rowSize) + 1;
    e.style.top = `${(bubbleSize / 2) * (rowNum - 1)}px`;
    if (rowNum % 2 != 0) {
      e.style.left = `${(bubbleSize + innerBubblesize - edgeSize * 2) * i}px`;
    } else {
      e.style.left = `${
        innerBubblesize +
        (bubbleSize + (innerBubblesize - edgeSize * 2)) * (i - rowSize)
      }px`;
    }
  });
}

function bubbleScrollMove(e) {
  console.log(e);
  console.log(window.scrollTop);
}

let scrollTimer;
const timerTime = 100;

window.addEventListener("resize", calculatePlaces);
window.addEventListener(
  "scroll",
  function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      clearTimeout(scrollTimer);
      document.getElementById("tankWrap").classList.remove("scrollUp");
      document.getElementById("tankWrap").classList.add("scrollDown");
      scrollTimer = this.setTimeout(removeScrollClass, timerTime);
    } else {
      clearTimeout(scrollTimer);
      document.getElementById("tankWrap").classList.remove("scrollDown");
      document.getElementById("tankWrap").classList.add("scrollUp");
      scrollTimer = this.setTimeout(removeScrollClass, timerTime);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

function removeScrollClass() {
  document.getElementById("tankWrap").classList.remove("scrollUp");
  document.getElementById("tankWrap").classList.remove("scrollDown");
}

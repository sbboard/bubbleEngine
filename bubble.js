const bubbles = [
  {
    name: "hairy dog 0",
    text: "there was once a big ol hairy dog",
    link: "#",
  },
  {
    name: "hairy dog 1",
    text: "there was once a big ol hairy dog",
    link: "#",
  },
  {
    name: "hairy dog 2",
    text: "there was once a big ol hairy dog",
    link: "#",
  },
  {
    name: "hairy dog 3",
    text: "there was once a big ol hairy dog",
    link: "#",
  },
  {
    name: "hairy dog 4",
    text: "there was once a big ol hairy dog",
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
    // linkElement.dataset.bubNum = i
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
        }
      });
    };
    linkElement.onmouseout = () => {
      bubbleElements.map((nv, ni) => {
        if (i != ni) {
          nv.classList.remove("notHoveredClose");
          nv.classList.remove("notHoveredFar");
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

let scrollTimer
const timerTime = 500

window.addEventListener("resize", calculatePlaces);
window.addEventListener(
  "scroll",
  function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      clearTimeout(scrollTimer)
      document.getElementById("tankWrap").classList.remove("scrollUp")
      document.getElementById("tankWrap").classList.add("scrollDown")
      scrollTimer = this.setTimeout(removeScrollClass, timerTime)
    } else {
      clearTimeout(scrollTimer)
      document.getElementById("tankWrap").classList.remove("scrollDown")
      document.getElementById("tankWrap").classList.add("scrollUp")
      scrollTimer = this.setTimeout(removeScrollClass, timerTime)
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

function removeScrollClass(){
  document.getElementById("tankWrap").classList.remove("scrollUp")
  document.getElementById("tankWrap").classList.remove("scrollDown")
}
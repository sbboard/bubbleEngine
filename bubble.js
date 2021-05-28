const bubbles = [
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
  {
    name: "hairy dog 5",
    text: "there was once a big ol hairy dog",
    link: "#",
  },
];

let bubbleElements = [];

function startBubbles() {
  let tank = document.getElementById("bubbleTank");
  //create bubbles
  bubbles.map((v,i) => {
    //create parent link
    let linkElement = document.createElement("a");
    linkElement.href = v.link;
    linkElement.classList.add("bubble");
    linkElement.dataset.bubNum = i
    linkElement.onmouseover = () => {
      bubbleElements.map((nv,ni) => {
        if(i != ni){
          console.log(nv)
          nv.classList.add("notHovered")
        }
      })
    }
    linkElement.onmouseout = () => {
      bubbleElements.map((nv,ni) => {
        if(i != ni){
          console.log(nv)
          nv.classList.remove("notHovered")
        }
      })
    }

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
  calculatePlaces()
}

startBubbles();

function calculatePlaces(){
  const rowSize = 3;
  let bubbleSize = bubbleElements[0].offsetWidth;
  let innerBubblesize = bubbleElements[0].children[1].offsetWidth;
  let edgeSize = (bubbleSize - innerBubblesize) / 2;
  console.log(bubbleSize, innerBubblesize, edgeSize);
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

window.addEventListener("resize", calculatePlaces);
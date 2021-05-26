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

let bubbleElements = []

function startBubbles() {
  let tank = document.getElementById("bubbleTank");
  //create bubbles
  bubbles.map((v) => {
    //create parent link
    let linkElement = document.createElement("a");
    linkElement.src = v.link;
    linkElement.classList.add("bubble");

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
    bubbleElements.push(linkElement)
    tank.appendChild(linkElement);
  });

  bubbleElements[0].style.left = "200px"
}

startBubbles();
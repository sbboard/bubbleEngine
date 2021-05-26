const yesNo = [true, false];

let profile = {
  name: null,
  email: null,
  age: null,
  gender: null,
  inUS: null,
  diet: null,
  dietOther: null,
  nearBelmar: null,
  doesEx: null,
  commit: null,
  diagnose: [],
  diagnoseOther: null,
  previous: null,
  exercise: null,
  exIntense: null,
  sweat: null,
  dailyBowel: null,
  smoke: null,
  pregnant: null,
  drink: null,
  supplements: null,
  goals: { top: null, mid: null, low: null },
};

const questions = [
  {
    question: "Enter your name",
    answer: "name",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: [],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Select your age range",
    answer: "age",
    category: "basics",
    multipleAnsAllow: false,
    otherOption: false,
    options: ["0-13", "14-18", "19-30", "31-45", "46-65", "65+"],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Enter your email so we can send you results",
    answer: "email",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: [],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Select your gender",
    answer: "gender",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: ["Female", "Male", "Non-binary"],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you reside within the US?",
    answer: "inUS",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "Are you local to Belmar, New Jersey?<br/>(within X miles)",
    answer: "nearBelmar",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: "inUS",
  },
  {
    question:
      "Have you previously been to a function medicine practitioner before?",
    answer: "previous",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "What's your Level of commitment to X?",
    answer: "commit",
    multipleAnsAllow: false,
    otherOption: false,
    category: "basics",
    options: [
      "Skeptical",
      "Interested",
      "Ready to dive in... where do I sign?",
    ],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Check off all you've been diagnosed with",
    answer: "diagnose",
    multipleAnsAllow: true,
    category: "health history",
    otherOption: true,
    options: [
      "Cancer",
      "Lyme",
      "Gut Issues (Celiac)",
      "Neurological (ALS, MS)",
      "Skin Issues (Cystic Acne)",
      "Mystery Illness",
      "Chronic Pain",
      "Hormonal (PCOS, Cycle Issues, Infertility)",
      "Breast Tissue Abnormality",
      "Mental Health (Depression)",
      "None",
    ],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you have pregnancy goals?",
    answer: "pregnant",
    multipleAnsAllow: false,
    category: "basics",
    otherOption: false,
    options: [
      "Hope to be pregnant within 1-2 years",
      "Prenatal (currently pregnant)",
      "Postpartum",
      "None of the above / Not Applicable",
    ],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Does your diet fall into any of these categories?",
    answer: "diet",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: true,
    options: [
      "Vegan",
      "Vegetarian",
      "Paleo",
      "Gluten-Free",
      "Intermittent Fasting",
      "None",
    ],
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you exercise?",
    answer: "doesEx",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "How many times/week do you exercise?",
    answer: "exercise",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: ["0", "1-2", "3-5", "7+"],
    relyOnThisBeingTrue: "doesEx",
  },
  {
    question: "What intensity level is your exercise",
    answer: "exIntense",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: [
      "Low (walking, yoga)",
      "Moderate (jogging, body weight exercises)",
      "Intense (marathon, HIIT, weight lifting)",
    ],
    relyOnThisBeingTrue: "doesEx",
  },
  {
    question: "Do you sweat when you exercise? (If you glisten, mark no)",
    answer: "sweat",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: "doesEx",
  },
  {
    question: "Do you have a daily bowel movement?",
    answer: "dailyBowel",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you smoke?",
    answer: "smoke",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you drink?",
    answer: "drink",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
  {
    question: "Do you take any supplements?",
    answer: "supplements",
    multipleAnsAllow: false,
    category: "lifestyle",
    otherOption: false,
    options: yesNo,
    relyOnThisBeingTrue: null,
  },
];

const quizElement = document.getElementById("quiz");
let currentQ = 0;

function startQuiz() {
  quizElement.innerHTML = null;
  function postQ(isForward) {
    let currentIndex = questions[currentQ];
    if (
      currentIndex.relyOnThisBeingTrue == null ||
      profile[currentIndex.relyOnThisBeingTrue] === "true"
    ) {
      //clear block
      quizBlock.innerHTML = null;

      //create question
      let qHead = document.createElement("h1");
      qHead.innerHTML = currentIndex.question;
      quizBlock.appendChild(qHead);

      ///////////////////////
      // DIFFERENT INPUT TYPES
      /////////////////////////
      //post input
      if (currentIndex.options.length == 0) {
        let qInput = document.createElement("input");
        if (profile[currentIndex.answer] != null) {
          qInput.value = profile[currentIndex.answer];
        }
        qInput.onkeyup = function (e) {
          profile[currentIndex.answer] = e.target.value;
        };
        quizBlock.appendChild(qInput);
      }
      //post radio/check list
      else {
        let qInput = document.createElement("div");
        qInput.id = "radioInputs";
        currentIndex.options.map((v) => {
          let optionWrap = document.createElement("div");
          optionWrap.classList.add("opWrap");
          let rOption = document.createElement("input");
          if (currentIndex.multipleAnsAllow == false) {
            rOption.type = "radio";

            if (profile[currentIndex.answer] != null) {
              if (profile[currentIndex.answer] === v.toString()) {
                rOption.checked = true;
              }
            }
          } else {
            rOption.type = "checkbox";

            if (profile[currentIndex.answer].length > 0) {
              if (profile[currentIndex.answer].indexOf(v) > -1) {
                rOption.checked = true;
              }
            }
          }
          rOption.value = v;
          rOption.name = "currentQ";
          rOption.onclick = function (e) {
            if (currentIndex.multipleAnsAllow == false) {
              profile[currentIndex.answer] = e.target.value;
            } else {
              if (e.target.checked) {
                profile[currentIndex.answer].push(e.target.value);
              } else {
                var index = profile[currentIndex.answer].indexOf(
                  e.target.value
                );
                if (index !== -1) {
                  profile[currentIndex.answer].splice(index, 1);
                }
              }
            }
          };
          let rLabel = document.createElement("label");
          if (typeof v === "boolean") {
            v ? (rLabel.innerHTML = "Yes") : (rLabel.innerHTML = "No");
          } else {
            rLabel.innerHTML = v;
          }
          optionWrap.appendChild(rOption);
          optionWrap.appendChild(rLabel);
          qInput.appendChild(optionWrap);
        });
        /////
        //Other Option
        ///
        if (currentIndex.otherOption == true) {
          //used to submit info on keyup and onclick
          function checkOtherInput() {
            if (
              document.getElementById("otherBtn").checked &&
              document.getElementById("otherInput").value.length > 0
            ) {
              profile[`${currentIndex.answer}Other`] =
                document.getElementById("otherInput").value;
            }
          }
          //creating the element
          let optionWrap = document.createElement("div");
          optionWrap.classList.add("opWrap");
          let rOption = document.createElement("input");
          if (currentIndex.multipleAnsAllow == false) {
            rOption.type = "radio";
          } else {
            rOption.type = "checkbox";
          }

          rOption.value = "Other";
          rOption.name = "currentQ";
          rOption.id = "otherBtn";
          //on click
          rOption.onclick = function (e) {
            checkOtherInput();
          };
          let rLabel = document.createElement("label");
          rLabel.innerHTML = "Other: ";
          let otherInput = document.createElement("input");
          otherInput.id = "otherInput";
          //on keyup
          qInput.onkeyup = function (e) {
            checkOtherInput();
          };

          if (profile[`${currentIndex.answer}Other`] != null) {
            rOption.checked = true;
            otherInput.value = profile[`${currentIndex.answer}Other`];
          }
          optionWrap.appendChild(rOption);
          optionWrap.appendChild(rLabel);
          optionWrap.appendChild(otherInput);
          qInput.appendChild(optionWrap);
        }
        quizBlock.appendChild(qInput);
      }
      //////////////////////////////////////

      //create next / submit
      let btnWrap = document.createElement("div");
      btnWrap.id = "btnWrap";
      let submitBtn = document.createElement("button");
      let backBtn = document.createElement("button");
      if (currentQ < questions.length - 1) {
        submitBtn.innerHTML = "next";
        submitBtn.onclick = submitQ;
        submitBtn.type = "submit";
      } else {
        submitBtn.innerHTML = "next";
        submitBtn.type = "submit";
        submitBtn.onclick = displayPriorityChart;
      }
      if (currentQ > 0) {
        backBtn.innerHTML = "back";
        backBtn.onclick = backQ;
        backBtn.type = "button";
        btnWrap.appendChild(backBtn);
      }
      btnWrap.appendChild(submitBtn);
      quizBlock.appendChild(btnWrap);
    } else {
      let currentIndex = questions[currentQ];
      profile[currentIndex.answer] = "n/a";
      submitQ(isForward);
    }
  }

  function submitQ(isForward) {
    let currentIndex = questions[currentQ];
    if (profile[currentIndex.answer] != null) {
      if (isForward) {
        currentQ++;
        postQ(true);
      } else {
        currentQ = currentQ - 1;
        postQ(false);
      }
    }
  }

  function backQ() {
    currentQ = currentQ - 1;
    postQ(false);
  }

  let quizBlock = document.createElement("form");
  quizBlock.onsubmit = () => {
    return false;
  };
  quizBlock.id = "quizBlock";
  quizElement.appendChild(quizBlock);
  postQ(true);
}

///////////////////////////
// PRIORITY CHART
//////////////////////////

function displayPriorityChart() {
  const goalSelection = [
    "Digestion",
    "Sleep",
    "Fitness",
    "Stress",
    "Mood",
    "Energy",
    "Brain",
    "Mental Health",
    "Mystery Illness",
    "Overall Health & Prevention",
  ];
  const goalRange = 3;
  quizElement.innerHTML = null;
  let goalBlock = document.createElement("div");
  goalBlock.id = "goalBlock";

  //create header
  let headerEl = document.createElement("h1");
  headerEl.innerHTML = `Choose up to ${goalRange} HEALTH GOALS and prioritize importance with 1 = most important`;
  goalBlock.appendChild(headerEl);

  //create table
  let tableWrap = document.createElement("div");
  tableWrap.id = "goalTable";

  //create number key
  let keyWrap = document.createElement("div");
  keyWrap.classList.add("tableRow");
  keyWrap.classList.add("topRow");
  let keyLabel = document.createElement("label");
  keyWrap.appendChild(keyLabel);
  for (let i = 0; i < goalRange; i++) {
    let span = document.createElement("span");
    span.innerHTML = i + 1;
    keyWrap.appendChild(span);
  }
  tableWrap.appendChild(keyWrap);

  let endBtn = document.createElement("button");
  endBtn.disabled = true;

  //create radio buttons
  goalSelection.map((v) => {
    let rowWrap = document.createElement("div");
    rowWrap.classList.add("tableRow");
    let label = document.createElement("label");
    label.innerHTML = v;
    rowWrap.appendChild(label);
    for (let i = 0; i < goalRange; i++) {
      let radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = i + 1;
      radioBtn.dataset.goal = v;
      //on click
      radioBtn.onclick = () => {
        //make sure it's the only one clicked
        let currentElm = document.querySelectorAll('[data-goal="' + v + '"]');
        //assign goal
        switch (i) {
          case 0:
            currentElm[1].checked = false;
            currentElm[2].checked = false;
            profile.goals.top = v;
            break;
          case 1:
            currentElm[0].checked = false;
            currentElm[2].checked = false;
            profile.goals.mid = v;
            break;
          case 2:
            currentElm[0].checked = false;
            currentElm[1].checked = false;
            profile.goals.low = v;
            break;
          default:
            profile.goals.top = v;
            break;
        }
        //check for 3 done
        var checkedBoxes = document.querySelectorAll("input:checked");
        if (checkedBoxes.length > 2) {
          endBtn.disabled = false;
        } else {
          endBtn.disabled = true;
        }
      };
      rowWrap.appendChild(radioBtn);
    }
    tableWrap.appendChild(rowWrap);
  });
  goalBlock.appendChild(tableWrap);

  //create finisj button
  endBtn.onclick = displayResults;
  endBtn.innerHTML = "finish";

  goalBlock.appendChild(endBtn);

  quizElement.appendChild(goalBlock);
}

//////////////////////////////
// RESULTS
/////////////////////////////
function displayResults() {
  let resultsBlock = document.createElement("div");
  console.log(`${profile.name}'s Healing Journey`);
  //detox
  if (profile.sweat == false) {
    console.log(
      "Often overlooked, the body’s detoxification process is vital to keep us feeling our best. If you’re unclear on what detoxification is, perfect examples are sweat and sleep. When you sweat youe body is expelling toxins. When you sleep the space between your cells increases, thus increasing the flow of toxins being flushed out. The primary function of your liver, kidneys, and lungs is detoxification, if they’re bogged down, you’re not expelling toxicity out of your body efficiently. "
    );
  } else {
    console.log(
      `If you’re looking to maintain and/or enhance your body’s detoxification pathways, you need to engage in active sweating! Our favorite method is the infrared sauna where you can sweat out your toxins.`
    );
  }
  if (profile.supplements) {
    console.log(
      `At Integrative Wellness Group, we pride ourselves on testing (not guessing). Through IRT (Integrative Response Testing), our team is able to ___ determine what supplements, services, and therapies will benefit you best at every stage of your wellness journey.`
    );
  }
  console.log("-");
  console.log(profile);
}

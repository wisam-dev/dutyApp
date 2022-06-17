import DutyList from "./model.js";
import { btnColor } from "./btnColor.js";

const form = document.querySelector("form")! as HTMLFormElement;
const missionInput = document.querySelector(
  ".mission-input"
)! as HTMLInputElement;
const missionsContainer = document.querySelector(
  ".tasks--container"
)! as HTMLDivElement;
let missionsArr: NodeListOf<HTMLInputElement> =
  document.querySelectorAll(".mission")!;

const btnClear = document.querySelector(
  ".btn--clear-completed"
)! as HTMLSpanElement;

const btnAll = document.querySelector(".btn--show-all")! as HTMLSpanElement;

const btnActive = document.querySelector(
  ".btn--show-active"
)! as HTMLSpanElement;

const btnCompleted = document.querySelector(
  ".btn--show-completed"
)! as HTMLSpanElement;

const newMission = new DutyList(missionsContainer, missionsArr);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = missionInput.value;
  if (!val) {
    return;
  }
  newMission.createMission(val);

  newMission.activeTasksOutput();

  missionInput.value = "";
  missionInput.blur();
  return false;
});

missionInput.addEventListener("keydown", (e) => {
  const btn = document.querySelector(".btn--submit")! as HTMLButtonElement;
  if (!missionInput.value) {
    btn.disabled = true;
    return;
  }

  btn.disabled = false;
});

document.querySelectorAll(".btn--delete").forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    console.log("h");
    newMission.removeOne(btn.id);
  });
});

btnAll.addEventListener("click", (e) => {
  newMission.getAllLocal();
  newMission.activeTasksOutput();
  btnColor("all");
});

btnActive.addEventListener("click", (e) => {
  newMission.getAllLocal("active");
  newMission.activeTasksOutput();
  btnColor("active");
});

btnCompleted.addEventListener("click", (e) => {
  newMission.getAllLocal("completed");
  newMission.activeTasksOutput();
  btnColor("completed");
});

btnClear.addEventListener("click", (e) => {
  newMission.removeLocal();
});

window.addEventListener("click", (e) => {
  const target = e.target! as HTMLInputElement;
  if (target.classList.contains("active")) {
    target.classList.remove("active");
    target.classList.add("completed");
    newMission.updateLocal(target.id, "completed");
    newMission.activeTasksOutput();
  } else if (target.classList.contains("completed")) {
    target.classList.remove("completed");
    newMission.updateLocal(target.id, "active");
    target.classList.add("active");
    newMission.activeTasksOutput();
  } else return;
});

type btnSort = "all" | "completed" | "active";

const btnAll = document.querySelector(".btn--show-all")! as HTMLSpanElement;

const btnActive = document.querySelector(
  ".btn--show-active"
)! as HTMLSpanElement;

const btnCompleted = document.querySelector(
  ".btn--show-completed"
)! as HTMLSpanElement;

export const btnColor = (btn: btnSort) => {
  const btns = [btnAll, btnActive, btnCompleted];
  btns.forEach((btn) => {
    btn.style.color = "#f2efee";
  });

  if (btn === "completed") {
    btnCompleted.style.color = "#006e7f";
    return;
  }
  if (btn === "active") {
    btnActive.style.color = "#006e7f";

    return;
  }
  if (btn === "all") {
    btnAll.style.color = "#006e7f";
  }
};

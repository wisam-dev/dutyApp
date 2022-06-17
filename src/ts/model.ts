type missionStatus = "completed" | "active";
type missionSort = "all" | "completed" | "active";

class DutyList {
  private keys: string[];
  constructor(
    public container: HTMLDivElement,
    private missions: NodeListOf<HTMLInputElement>
  ) {
    this.getAllLocal();
    this.checkActiive(missions);
    this.activeTasksOutput();
    this.keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("mission")
    );
  }

  public getAllLocal(sort: missionSort = "all") {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("mission")
    );

    this.container.innerHTML = "";

    keys.forEach((key, i) => {
      const val = localStorage.getItem(keys[i])!;

      if (sort === "completed" && val.startsWith("completed")) {
        this.renderMission(val, key);
        return;
      }
      if (sort === "active" && !val.startsWith("completed")) {
        this.renderMission(val, key);
        return;
      }
      if (sort === "all") {
        this.renderMission(val, key);
      }
    });
  }

  public saveLocal(name: string, val: string) {
    localStorage.setItem(name, val);
  }

  public updateLocal(originKey: string, updateedKey: missionStatus) {
    if (localStorage[originKey].startsWith("completed")) {
      localStorage[originKey] = localStorage[originKey].replace(
        "completed ",
        ""
      );
      return;
    }
    localStorage[originKey] = updateedKey + " " + localStorage[originKey];
  }

  public removeLocal() {
    this.keys.forEach((key, i) => {
      if (!localStorage[key].startsWith("completed")) {
        return;
      }
      localStorage.removeItem(key);
    });
    this.container.innerHTML = "";
    this.getAllLocal();
  }

  public removeOne(key: string) {
    localStorage.removeItem(key);
    location.reload();
  }

  public renderMission(val: string, idNum: string) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("mission--container");
    this.container.insertAdjacentElement("beforeend", divContainer);

    const missionCheckbox = document.createElement("input");
    missionCheckbox.type = "checkbox";
    missionCheckbox.name = "mission";
    missionCheckbox.classList.add("mission");

    if (val.startsWith("completed")) {
      missionCheckbox.classList.add("completed");
      missionCheckbox.checked = true;
      val = val.replace("completed ", "");
    } else {
      missionCheckbox.classList.add("active");
    }

    missionCheckbox.id = idNum;

    const missionLabel = document.createElement("label");
    missionLabel.setAttribute("for", missionCheckbox.id);
    missionLabel.innerHTML = val;
    divContainer.insertAdjacentElement("afterbegin", missionLabel);
    divContainer.insertAdjacentElement("afterbegin", missionCheckbox);

    const btnDelete = document.createElement("button");
    btnDelete.id = missionCheckbox.id;
    btnDelete.classList.add("btn--delete");
    btnDelete.innerHTML = "X";
    divContainer.insertAdjacentElement("beforeend", btnDelete);
  }

  public createMission(val: string) {
    const date = new Date(Date.now());
    const id = `mission-${date.getTime()}`;

    this.saveLocal(id, val);
    this.renderMission(val, id);
    location.reload();
  }

  public activeTasksOutput() {
    const idNum = document.querySelectorAll(".active").length;

    document.querySelector(
      ".missions-amount"
    )!.innerHTML = `${idNum} Active Task${idNum > 1 ? `s` : ``}`;
  }

  public checkActiive(missionsArr: NodeListOf<HTMLInputElement>) {
    missionsArr.forEach((mission) => {
      if (mission.classList.contains("active")) {
        return;
      }
      mission.checked = true;
    });
  }
}

export default DutyList;

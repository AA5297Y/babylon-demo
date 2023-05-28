import Unit from "@/unit/Unit";
import Core from "./Core";
import { Vector2 } from "@babylonjs/core";

export default class View {
  core: Core;

  main: HTMLElement;
  selectList: HTMLElement;
  pause: HTMLElement;

  constructor(core: Core) {
    this.core = core;
    
    this.main = document.getElementById("main");
    
    this.initSelectList()
    
    this.pause = document.getElementById("gamePause");
  }

  // selectList
  initSelectList() {
    this.selectList = document.getElementById("selectList");

    this.selectList.onclick = (ev: PointerEvent) => {
      if (ev.target != null) {
        const selectId = (<HTMLElement>ev.target).getAttribute("alt");
        const shift =  this.selectList.getAttribute("shift");

        console.log(selectId);
        this.core.setSelection(this.core.rdySelection[selectId], shift == "true" ? true : false);

        this.clsSelectList();
      }
    }
  }

  setSelectList(list: Unit[], scrVector: Vector2, shift: boolean) {
    let listInHTML = "";
    list.forEach((item, index) => {
      listInHTML += '<div class="selectListItem" alt="' + index + '">' + item.callSign + '</div>'
    })

    this.selectList.classList.remove("invisible");
    this.selectList.innerHTML = listInHTML;

    if (shift) {
      this.selectList.setAttribute("shift", "true");
    } else {
      this.selectList.setAttribute("shift", "false");
    }

    // position selectList
    let x = scrVector.x;
    let y = scrVector.y;

    let listWidth = this.selectList.clientWidth;
    let listHeight = this.selectList.clientHeight;

    if (scrVector.x + listWidth >= this.main.clientWidth) {
      x = x - listWidth;
    }

    if (scrVector.y + listHeight >= this.main.clientHeight) {
      y = y -listHeight;
    }

    this.selectList.style.left = x.toString() + "px";
    this.selectList.style.top = y.toString() + "px";
  }

  clsSelectList() {
    this.selectList.classList.add("invisible");
    this.selectList.innerHTML = "";
  }

  // pause
  viewPause() {
    this.pause.className = '';
  }

  viewUnpause() {
    this.pause.className = 'invisible';
  }
}
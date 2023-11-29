"use strict";

/*
Copyright (c) 2023 muro
This code is released under the MIT License, see LICENSE.
*/

const trigger = document.getElementById("custom-select-menu");
const buttonValue = trigger.querySelector(".value");
const targetId = trigger.getAttribute("aria-controls");
const target = document.getElementById(targetId);
const input = document.querySelectorAll("input[type='checkbox']");
const selectBox = document.getElementById("select-box");

trigger.addEventListener("click", function() {
  const isExpanded = this.getAttribute("aria-expanded");

  if(isExpanded === "true") {
    this.setAttribute("aria-expanded", "false");
    target.setAttribute("aria-hidden", "true");
  } else {
    this.setAttribute("aria-expanded", "true");
    target.setAttribute("aria-hidden", "false");
  }
})

input.forEach((element) => {
  element.addEventListener("click", function() {
    const isChecked = document.querySelectorAll("input:checked");

    if(isChecked.length > 0) {
      isChecked.forEach((elem) => {
        elem.checked = false;
      })
    }
    this.checked = true;
    buttonValue.textContent = this.value;
    trigger.setAttribute("aria-expanded", "false");
    target.setAttribute("aria-hidden", "true");
  })

  element.addEventListener("focus", function() {
    buttonValue.textContent = this.value;
  })
})

selectBox.addEventListener("keydown", function(event) {
  event.preventDefault();
  const downKeyCode = event.key;
  const focusedElement = document.activeElement;

  input.forEach((element, index) => {
    if(element === focusedElement) {
      if(downKeyCode === "ArrowDown") {
        if(index === input.length -1) {
          input[0].focus({ focusVisible: true });
        } else {
          input[index + 1].focus({ focusVisible: true });
        }
      }

      if(downKeyCode === "ArrowUp") {
        if(index === 0) {
          input[input.length - 1].focus({ focusVisible: true });
        } else {
          input[index - 1].focus({ focusVisible: true });
        }
      }

      if(downKeyCode === "Enter") {
        element.click();
      }
    }
  });
})
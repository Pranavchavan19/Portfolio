// /**
//  * @copyright codewithsadee 2023
//  * @author Sadee <codewithsadee24@gmail.com>
//  */

// "use strict";

const $themeBtn = document.querySelector("[data-theme-btn]");


const $HTML = document.documentElement;

let isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

if(sessionStorage.getItem("theme")){
    $HTML.dataset.theme = sessionStorage.getItem("theme");
}else{
    $HTML.dataset.theme = isDark ? "dark" : "light";
    sessionStorage.setItem("theme" , $HTML.dataset.theme);
}

const changeTheme  = () => {
$HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
sessionStorage.setItem("theme" ,$HTML.dataset.theme)
} 

$themeBtn.addEventListener("click", changeTheme);





// tab
const $tabBtn = document.querySelectorAll("[data-tab-btn]");

let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");

let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach(item => {
    item.addEventListener("click", function () {
            lastActiveTab.classList.remove("active");
            lastActiveTabBtn.classList.remove("active");

    const $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
    });
});


// Get the body element and the color-changing text
const htmlElement = document.documentElement;
const colorChangingText = document.querySelector('.color-changing');

// Event listener to toggle themes when clicking the color-changing text
colorChangingText.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('background-image');
  if (currentTheme === 'dark') {
    htmlElement.setAttribute('background-image', 'light');
  } else {
    htmlElement.setAttribute('background-image', 'dark');
  }
});



document.querySelector('.textarea').addEventListener('click', function (event) {
  // Prevent default cursor placement
  event.preventDefault();
  // Focus the textarea and set the cursor at the start
  this.focus();
  this.setSelectionRange(0, 0); // Ensure the cursor is always at the start
});
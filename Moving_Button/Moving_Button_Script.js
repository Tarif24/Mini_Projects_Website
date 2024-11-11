const noBtn = document.getElementById("no-btn");
const mainContainer = document.getElementById("question-app");

const containerRect = mainContainer.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();

noBtn.addEventListener('mouseover', OnNoButtonHover);

function OnNoButtonHover()
{
    const x = Math.floor(Math.random() * (containerRect.width - noBtnRect.width)) + 1;

    const y = Math.floor(Math.random() * (containerRect.height - noBtnRect.height)) + 1;

    noBtn.style.position = "absolute";

    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}
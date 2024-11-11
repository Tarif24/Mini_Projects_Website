const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const mainContainer = document.getElementById("question-app");

const containerRect = mainContainer.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();

let noCtr = 0;

noBtn.addEventListener('mouseover', OnNoButtonHover);
yesBtn.addEventListener('click', () => 
{
    
    if (noCtr == 0)
    {
        alert("ALR THEN HOP ON");
    }
    else if (noCtr <= 5)
    {
        alert("WHY DONT YOU WANNA PLAY WITH ME");
    }
    else if (noCtr <= 10)
    {
        alert("TOOK YOU LONG ENOUGH TO SAY YES");
    }
    else
    {
        alert("WHY DID IT TAKE SO LONG TO SAY YES");
    } 

})

function OnNoButtonHover()
{
    const x = Math.floor(Math.random() * (containerRect.width - noBtnRect.width)) + 1;

    const y = Math.floor(Math.random() * (containerRect.height - noBtnRect.height)) + 1;

    noBtn.style.position = "absolute";

    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    noCtr++;
}
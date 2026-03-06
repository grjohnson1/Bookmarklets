javascript:(function(){

function clean(str){
  return str.trim().replace(/\//g,"").replace(/\s+/g," ");
}

function capitalizeFirstLetterIfAlpha(str){
  if (!str) return str;
  return /^[a-zA-Z]/.test(str)
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str;
}

const url = window.location.href;

function getCompanyNameBetweenUrl(){
  const path = window.location.pathname;
  const match = path.match(/^\/(.*?)\/jobs/);
  return match && match[1] ? clean(match[1]) : "unknown";
}

function getDate(){
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return ""+yyyy+mm+dd;
}

function getText(selector){
  const el = document.querySelector(selector);
  return el ? el.innerText.trim() : "";
}

function extractPayLine(text){
  if(!text) return "???";

  const rangeRegex = /\$\s?\d[\d,]*(?:\.\d+)?\s?(?:k|K)?\s?[-–]\s?\$\s?\d[\d,]*(?:\.\d+)?\s?(?:k|K)?/;
  const rangeMatch = text.match(rangeRegex);

  if(rangeMatch){
    return rangeMatch[0].replace(/\s+/g,"");
  }

  const singleDollarRegex = /\$\s?\d[\d,]*(?:\.\d+)?\s?(?:k|K)?/;
  const singleMatch = text.match(singleDollarRegex);

  if(singleMatch){
    return singleMatch[0].replace(/\s+/g,"");
  }

  return "???";
}

const companyName = capitalizeFirstLetterIfAlpha(getCompanyNameBetweenUrl());
const h1 = document.querySelector("h1");
const jobTitle = h1 ? clean(h1.innerText) : "no_title";
const jobTitleText = h1 ? h1.innerText.trim() : "no_title";

const today = getDate();

const baseFilename = today+" - "+companyName+" -- "+jobTitle;

const location = getText("div.job__location");
const description = getText("div.job__description");
const pay = extractPayLine(description);

const txtContent = [
  companyName,
  "",
  jobTitleText,
  location,
  "Pay: "+pay,
  "",
  url,
  "",
  description
].join("\n");

const csvContent = [
  companyName,
  jobTitleText,
  url,
  location,
  "",
  "",
  pay,
  today
].join(",");

function downloadFile(content, filename, type){
  const blob = new Blob([content], {type});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

downloadFile(txtContent, baseFilename+".txt", "text/plain");
downloadFile(csvContent, baseFilename+".csv", "text/csv");

})();
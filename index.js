let myLeads =[]

//console.log (myLeads)
//myLeads = JSON.parse(myLeads)
//console.log (myLeads)
//myLeads.push("www.lead2.com")
//console.log (myLeads)
//myLeads = JSON.stringify(myLeads)
//console.log (myLeads)

const inputEl = document.getElementById("input-el") 
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
//console.log(localStorage.getItem(myLeads))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//const tabs = [{url: "https://www.linkedin.com"}]

tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //console.log(tabs);
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        //let activeTab = tabs[0]
        //let activeTabId = activeTab.id // or do whatever you need
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
     });

    //console.log(tabs[0].url)


})

function render(leads) {
    let listItems = ""
    for(let i = 0; i<leads.length;i++){
        //listItems += "<li><a target = '_blank' href='" + myLeads[i] +"'>"+ myLeads[i]+"</a></li>"
        
        listItems += `
        <li>
            <a target = '_blank' href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`
        //console.log(listItems)
    }
    
    ulEl.innerHTML = listItems
}

delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

//console.log(leadsFromLocalStorage)
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
   // console.log(localStorage.getItem("myLeads"))
  //  console.log(myLeads)  
})



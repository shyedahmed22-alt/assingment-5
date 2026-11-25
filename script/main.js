let allIssues = [];

const loadALLIsseues = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssues(allIssues);
        });
};
const filterIssues = (status) => {
    currentFilter = status;

    if (status === "all") {
        displayIssues(allIssues);
    }
    else {
        const filtered = allIssues.filter(issue => issue.status === status);

        displayIssues(filtered);
    }
};
function loadWordDetail(id){
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        displayDetails(data.data)
         changeStatus(id)
    })
}
const displayDetails=(data)=>{
    const detailsContainer = document.getElementById("details-cont");
        const labels = data.labels.map(label => {
        return `
         <div class="${
            label === "bug"
            ? "text-red-500 bg-red-100 border-2 border-red-300 rounded-full p-1.5 text-xs"
            : label === "enhancement"
            ? "text-green-500 bg-green-50 border-2 border-green-300 rounded-full p-1.5 text-xs"
            : label === "good first issue"
            ? "hidden"
            : "text-yellow-500 bg-yellow-50 border-2 border-yellow-300 rounded-full p-1.5 text-xs"
        }">
            ${label==="bug"
                ?`<i class="fa-solid fa-bug"></i> ${label}`
                : label === "help wanted"
                ?`<i class="fa-solid fa-life-ring"></i> ${label}`
                :`${label}`
            }
        </div>`;
    }).join(""); 
    detailsContainer.innerHTML=`
        <h2 class="text-2xl font-bold mb-2">${data.title}</h2>
        <div class="flex gap-8 items-center mb-6">
                <p class="text-white bg-[#00A96E] rounded-full px-2 py-1.5">Opened</p>
                <ul class="flex gap-8 list-disc">
                    <li>Opened by Sayed</li>
                    <li>${data.createdAt}</li>
                </ul>
        </div>
        <div class="flex gap-2 mb-6">
            ${labels}
        </div>
        <p class="mb-6 text-[#64748B]">
            ${data.description}
        </p>

        <div class="bg-[#F8FAFC] rounded-lg p-4 flex justify-between">
            <div class="">
                    <h4 class="text-[#64748B]">Assignee:</h4>
                     <h4 class="font-semibold">${data.assignee===""? "Unknown": data.assignee}</h4>
            </div>
            <div class="text-center">
                <h4 class="text-[#64748B]">Priority:</h4>
                <h4 class="${data.priority ==="high"
                        ? "bg-red-100 text-red-500 rounded-full px-7 py-1.5 text-xs"
                        : data.priority === "medium"
                        ? "bg-yellow-100 text-yellow-500 rounded-full px-7 py-1.5 text-xs"
                        :"bg-green-100 text-green-500 rounded-full px-7 py-1.5 text-xs"
                    }">${data.priority }</h4>
            </div>
        </div>
        
    `
    document.getElementById("word_modal").showModal()

}
const displayIssues=(datas)=>{
    const issuecontainer = document.getElementById("issues-cont")
    issuecontainer.innerHTML=""
    const issuenumber = document.getElementById("issues-number")
    issuenumber.innerText = datas.length
    datas.forEach(data => {
        const labels = data.labels.map(label => {
        return `
         <div class="${
            label === "bug"
            ? "text-red-500 bg-red-100 border-2 border-red-300 rounded-full p-1.5 text-xs"
            : label === "enhancement"
            ? "text-green-500 bg-green-50 border-2 border-green-300 rounded-full p-1.5 text-xs"
            : label === "good first issue"
            ? "hidden"
            : "text-yellow-500 bg-yellow-50 border-2 border-yellow-300 rounded-full p-1.5 text-xs"
        }">
            ${label==="bug"
                ?`<i class="fa-solid fa-bug"></i> ${label}`
                : label === "help wanted"
                ?`<i class="fa-solid fa-life-ring"></i> ${label}`
                :`${label}`
            }
        </div>`;
    }).join("");    
        const div = document.createElement("div")
        div.innerHTML=`
        <div onclick="loadWordDetail(${data.id})" class="border-t-4 ${data.status == "open"? "border-green-600" : "border-[#A855F7]" }  space-y-3 rounded-lg shadow-sm">
                <div class="flex justify-between items-center px-4 pt-4">
                    <div class="${data.status === "open" ? "" : "hidden"}"><img src="assets/Open-Status.png" alt=""></div>
                    <div class="${data.status === "closed" ? "" : "hidden"}"><img src="assets/Closed- Status .png" alt=""></div>
                    <h4 class="${data.priority ==="high"
                        ? "bg-red-100 text-red-500 rounded-full px-7 py-1.5 text-xs"
                        : data.priority === "medium"
                        ? "bg-yellow-100 text-yellow-500 rounded-full px-7 py-1.5 text-xs"
                        :"bg-green-100 text-green-500 rounded-full px-7 py-1.5 text-xs"
                    }">${data.priority }</h4>
                </div>
                <div class="px-4">
                <h3 class="text-sm font-semibold">${data.title}</h3>
                <p class="text-xs text-[#64748B]">${data.description}</p>   
                </div>
                
                <div class="flex flex-wrap gap-1 px-4 pb-2 border-b border-gray-200 rounded-lg m-0">
                   ${labels}
                </div>

                <div class="p-4">
                    <h5 class="text-xs text-[#64748B]">${data.author}</h5>
                    <p class="text-xs text-[#64748B]">${data.createdAt}</p>
                </div>
                
            </div>
        `
        issuecontainer.append(div)
    });
}
const searchdata=()=>{
    const searcheddata = document.getElementById("search-input").value;
    const issuecontainer = document.getElementById("issues-cont")
    issuecontainer.innerHTML=""
    console.log(searcheddata)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searcheddata}`)
    .then((res)=> res.json())
    .then((data)=> console.log(data))
}
const activebutton=(id)=>{
    const allbtns = document.querySelectorAll(".filterbtn");
    allbtns.forEach(btn=>{
        btn.classList.remove("active")
    })
    document.getElementById(id).classList.add("active")
}
document.getElementById("all").addEventListener("click", function(){
    activebutton("all")
})
document.getElementById("open").addEventListener("click", function(){activebutton("open")})
document.getElementById("closed").addEventListener("click", function(){activebutton("closed")} )
loadALLIsseues()
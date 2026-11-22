const allIsseues = ()=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> displayIssues(data.data))
}
const displayIssues=(datas)=>{
    const issuecontainer = document.getElementById("issues-cont")
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
            ${label}
        </div>`;
    }).join("");    
        const div = document.createElement("div")
        div.innerHTML=`
        <div class="border-t-4 border-green-600 space-y-3 rounded-lg shadow-sm">
                <div class="flex justify-between items-center px-4 pt-4">
                    <div class=""><img src="assets/Open-Status.png" alt=""></div>
                    <div class=" hidden"><img src="assets/Closed- Status .png" alt=""></div>
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
                    <h5 class="text-xs text-[#64748B]">${data.author}/h5>
                    <p class="text-xs text-[#64748B]">${data.createdAt}</p>
                </div>
                
            </div>
        `
        issuecontainer.append(div)
    });
}

allIsseues()
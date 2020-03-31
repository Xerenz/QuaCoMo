function GenerateHTML(json) {
    let html = ""
    for (let block in json){
        html += `
        <div class="row justify-content-center">
            <div class="col-lg-8 mx-auto">
                <h5 class="display-5">${block}</h1>
            </div>
        </div>

        ${GenerateBlock(json[block])}`
    }
    return html
}

function GenerateBlock(personJsonArray){
    let html = `<div class="row text-center justify-content-center">`
    for (let person of personJsonArray){
        html += GenerateCard(person)
    }
    html += '</div>'
    console.log(html)
    return html
}

function GenerateCard(personJson) {
    return `
    <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4">
            <h5 class="mb-0">${personJson.name}</h5>
            <span class="small text-uppercase text-muted">${personJson.desc}</span>
            <ul class="social mb-0 list-inline mt-3">
                ${GenerateLinks(personJson.links)}
            </ul>
        </div>
    </div>
    `
}

function GenerateLinks(links) {
    let html = ""
    for (let link of links) {
        html += `<li class="list-inline-item"><a href="${link.url}"  target="_blank" class="social-link"><i class="${link.fa}"></i></a></li>`
    }
    return html
}
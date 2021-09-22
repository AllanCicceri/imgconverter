const selectedFiles = document.getElementById('inputFiles')
const tblFiles = document.getElementById('tblFiles')
const btnConvert = document.getElementById('btnConvert')
const imgPathArr = []


selectedFiles.onchange = function(e){
    const filesArray = e.target.files

    for (let i = 0; i < filesArray.length; i++) {
        const tr = document.createElement('tr')
        const td =document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = filesArray[i].name

        const filePath = URL.createObjectURL(filesArray[i])
        imgPathArr.push(filePath)//add file temp path to array

        const tdRemove = document.createElement('td')
        const btnRemove = document.createElement('button')
        btnRemove.setAttribute('id', 'btnRemove')
        btnRemove.innerHTML = 'X'
        tdRemove.appendChild(btnRemove)
        tr.appendChild(tdRemove)

        tblFiles.appendChild(tr)
    }
}

function getResizeDimensions(){
    const w = document.getElementById('widthInput').value
    const h = document.getElementById('heightInput').value
    return [w,h]
}

async function resizeImage (blob, i){
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d');
    const resize = document.getElementById('resize').checked
    const [w, h] = resize? getResizeDimensions(): ['800', '600']
    canvas.width = w
    canvas.height = h
    
    const img = new Image()
    await new Promise(r => img.onload = r, img.src = blob)
    ctx.drawImage(img, 0,0, w, h)
    
    const link = document.createElement('a')
    link.setAttribute('data-auto-download','data-auto-download')
    link.download = `convertedFile${i}`
    link.href = canvas.toDataURL('image/jpg', 1.0)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

btnConvert.onclick = e => {
    for (let i = 0; i < imgPathArr.length; i++) {
        resizeImage(imgPathArr[i], i)                
    }

}

window.onclick = e => {
    const elementId = e.target.id

    if(elementId === 'btnRemove'){
        const parent = e.target.parentNode.parentNode
        // console.log('Line removed', parent)
        tblFiles.removeChild(parent)
    }
}


const check = document.getElementById('resize')
const widthInput = document.getElementById('widthInput')
const heightInput = document.getElementById('heightInput')
check.onchange = () => {
    widthInput.disabled = !check.checked
    heightInput.disabled = widthInput.disabled
}

widthInput.onchange = () => {
    const value = widthInput.value

    if(isNaN(value) || !Number.isInteger(+value) 
        || value < 50 || value > 2300)
    {      
        window.setTimeout(() => widthInput.focus(), 0)
        widthInput.value = ''
    }
}
heightInput.onchange = () => {
    const value = heightInput.value
    if(isNaN(value) || !Number.isInteger(+value) 
        || value < 50 || value > 2300)
    {
        window.setTimeout(() => heightInput.focus(), 0)
        heightInput.value = ''
    }
}
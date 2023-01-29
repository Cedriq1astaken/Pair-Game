const cases = document.querySelectorAll('.case')
let play = true
let controller = {
    clickeds : false,
    caseClicked : undefined,
    el : undefined
}
const list = []
class CaseControl{
    constructor(id, htmlEl, image){
        this.id = id,
        this.htmlEl = htmlEl,
        this.image = image
    }
    static clicks(a){
        if(play){
            if(!controller.clickeds){
                controller.clickeds = true
                controller.caseClicked = list[a].image
                controller.el = list[a].htmlEl
                list[a].htmlEl.firstChild.style.visibility = 'visible'
            }
            else if(controller.clickeds){
                if(list[a].image == controller.caseClicked){
                    color(0, list[a].htmlEl, controller.el, a )
                    controller.clickeds = false
                    controller.caseClicked = undefined
                    list[a].htmlEl.firstChild.style.visibility = 'visible'
                    list[a].htmlEl.removeAttribute('onclick')
                    controller.el.removeAttribute('onclick')
                    return
                }
                else{
                    play = false
                    color(1, list[a].htmlEl, controller.el, a)
                    controller.clickeds = false
                    list[a].htmlEl.firstChild.style.visibility = 'visible'
                    setTimeout(()=>{
                        controller.el.firstChild.style.visibility = 'hidden'
                        list[a].htmlEl.firstChild.style.visibility = 'hidden'
                        controller.el = undefined
                        controller.caseClicked = undefined
                        play = true
                    },1200)
                }
            }
        }
        else{

        }
    }
}
const icons = [
    `./Images/monstre1.png`,
    `./Images/monstre2.png`,
    `./Images/monstre3.png`,
    `./Images/monstre4.png`,
    `./Images/monstre5.png`,
    `./Images/monstre6.png`,
    `./Images/monstre7.png`,
    `./Images/monstre8.png`,
    `./Images/monstre1.png`,
    `./Images/monstre2.png`,
    `./Images/monstre3.png`,
    `./Images/monstre4.png`,
    `./Images/monstre5.png`,
    `./Images/monstre6.png`,
    `./Images/monstre7.png`,
    `./Images/monstre8.png`,
]
let shuffle = () =>{ return icons.sort(()=> Math.random() - 0.5) }
let image = () =>{
    let temp = shuffle()
    for(i=0; i< 16; i++){
        let img = document.createElement('img');
        img.src = temp[i]
        img.style.visibility = 'hidden'
        img.style.width = '80%'
        img.style.height = '80%'
        img.style.justifySelf ='center'
        img.style.alignSelf ='center'
        cases[i].appendChild(img)  
        list.push(new CaseControl(i, cases[i],temp[i]))
    }
}
let color = (x, el1, el2, a) =>{
    if(x == 0){
        el1.style.borderColor = 'green'
        el1.style.borderWidth = '5px'
        el2.style.borderColor = 'green'
        el2.style.borderWidth = '5px'
    }
    if(x == 1){
        el1.style.borderColor = 'red'
        el1.style.borderWidth = '5px'
        el2.style.borderColor = 'red'
        el2.style.borderWidth = '5px'
        setTimeout(()=>{
            el1.style.borderColor = 'grey'
            el1.style.borderWidth = '1px'
            el2.style.borderColor = 'grey'
            el2.style.borderWidth = '1px'  
        }, 1200)
    }
}
let winCondition = () =>{
    if(Array.from(cases).every((x)=>{
        return x.style.borderColor == 'green'
    })){
        alert('you won')
    }
}
window.onload= image()

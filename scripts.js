"use strict";

const ALL_FIELDS = document.getElementById('div-all-fields');

function dragEnter(e) {
    e.preventDefault();
    //e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    //e.target.classList.add('drag-over');
}

function dragLeave(e) {
    //e.target.classList.remove('drag-over');
}

function drop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const clone = document.getElementById(id).cloneNode(true);

    clone.title = "";
    clone.childNodes.forEach(node => {
        if(node.tagName === 'I'){
            node.title = 'DELETE';
            node.addEventListener('click', ()=>{
                e.target.removeChild(clone);
            });
        }
    });
    
    e.target.appendChild(clone);
}

function SaveSettings(){
    let div_process1 = document.getElementById('div-process-1');
    let fields = "";
    div_process1.childNodes.forEach(node => {
        node.childNodes.forEach(n => {
            if(n.tagName=="LABEL" || n.tagName=="INPUT"){
                if(n.tagName == "LABEL"){
                    fields += n.innerText.trim();
                }
                if(n.tagName == "INPUT"){
                    if(n.checked){
                        fields += ":mandatory|";
                    }else{
                        fields += ":no-mandatory|";
                    }
                }
            }
        });
    });
    console.log(fields);
}

window.addEventListener('load', ()=>{
    ALL_FIELDS.innerHTML = "";
    for(let i=0; i<46; i++){
        ALL_FIELDS.innerHTML += `
        <div class="div-field" draggable="true" id="${'field-'+(i+1)}" title="Drag & Drop">
            <i class="fa fa-close"></i>
            <label for="${'check-field-'+(i+1)}">
                ${'field-'+(i+1)}
            </label>
            <input type="checkbox" id="${'check-field-'+(i+1)}" name="${'check-field-'+(i+1)}">
        </div>
        `;
    }

    let div_fields = document.getElementsByClassName('div-field');
    for(let i=0; i<div_fields.length; i++){
        div_fields[i].addEventListener('dragstart', (e)=>{
            e.dataTransfer.setData('text/plain', e.target.id);
            //console.log(e);
        });
    }

    let boxes = document.getElementsByClassName('box');
    for(let i=0; i<boxes.length; i++){
        boxes[i].addEventListener('dragenter', dragEnter)
        boxes[i].addEventListener('dragover', dragOver);
        boxes[i].addEventListener('dragleave', dragLeave);
        boxes[i].addEventListener('drop', drop);
    }
});

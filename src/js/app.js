import $ from 'jquery';
import {parseCode, statements} from './code-analyzer';
import {create_objects} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        delete_table();
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        create_objects(parsedCode);
        create_table();
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});

const keys = ['Line','Type','Name','Condition', 'Value'];
const fields = ['line','type','name','condition','value'];

function create_table(){
    let body = document.getElementsByTagName('body')[0];
    let tbl = document.createElement('TABLE');
    body.appendChild(tbl);
    tbl.setAttribute('id', 'myTable');
    document.body.appendChild(tbl);
    let header = document.createElement('TR');
    styleTable(tbl,header);
    header.setAttribute('id', 'myTh');
    document.getElementById('myTable').appendChild(header);
    for (let i = 0, l = keys.length; i < l; i ++) {
        let data = document.createElement('TD');
        let text = document.createTextNode(keys[i]);
        data.appendChild(text);
        document.getElementById('myTh').appendChild(data);
    }
    add_rows();
}

function add_rows() {
    let tbl = document.getElementById('myTable');
    for (let i = 0; i < statements.length; i++) {
        let row = document.createElement('TR');
        row.setAttribute('id', 'myTr');
        tbl.appendChild(row);
        for(let j = 0;j<keys.length;j++){
            let data = document.createElement('TD');
            data.style.borderCollapse = 'collapse';
            data.style.border='1px solid black';
            let text = document.createTextNode(statements[i][fields[j]]);
            data.appendChild(text);
            row.appendChild(data);
        }
    }
}

function styleTable(tbl,header){
    tbl.style.borderCollapse = 'collapse';
    tbl.style.textAlign = 'center';
    header.style.backgroundColor = 'Lavender';
    header.style.fontWeight = 'bold';
}

function delete_table(){
    let tbl = document.getElementById('myTable');
    if(tbl != null)
        tbl.remove();
}
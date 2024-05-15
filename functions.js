function showCreate(){
    document.getElementById("button-showCreate").style.display="none"
    document.getElementById("carTable").style.display="none"
    document.getElementById("createUpdateForm").style.display="block"
    document.getElementById("doUpdateButton").style.display="none"
    document.getElementById("doCreateButton").style.display="block"
    document.getElementById("updateLabel").style.display="none"
    document.getElementById("createLabel").style.display="inline"
}

function showUpdate(buttonElement){
    document.getElementById("button-showCreate").style.display = "none"
    document.getElementById('carTable').style.display="none"
    document.getElementById('createUpdateForm').style.display="block"

    document.getElementById('createLabel').style.display="none"
    document.getElementById('updateLabel').style.display="inline"

    document.getElementById('doCreateButton').style.display="none"
    document.getElementById('doUpdateButton').style.display="block"

    var rowElement = buttonElement.parentNode.parentNode

    var car = getCarFromRow(rowElement)
    populateFormWithCar(car)
}

function doCreate(){
    var form = document.getElementById("createUpdateForm")
    var car = {}
    car.make = form.querySelector("input[name = 'make']").value
    car.model = form.querySelector('input[name = "model"]').value
    car.price = form.querySelector('input[name = "price"]').value
    car.colour = form.querySelector('input[name = "colour"]').value
    car.kilometers = form.querySelector('input[name = "kilometers"]').value
    car.fun_factor = form.querySelector('input[name = "fun_factor"]').value
    console.log(JSON.stringify(car))
    createCarAjax(car)
}

function showViewAll(){
    document.getElementById("button-showCreate").style.display="block"
    document.getElementById("carTable").style.display="block"
    document.getElementById("createUpdateForm").style.display="none"
    // https://stackoverflow.com/questions/5294842/refresh-a-page-using-javascript-or-html
    // Fixes the issue with the table compressing when returning from the create/update form
    location.reload(true);
}

function clearForm(){
    var form = document.getElementById("createUpdateForm")
    
    form.querySelector("input[name='make']").value=''
    form.querySelector("input[name='model']").value=''
    form.querySelector("input[name='price']").value=''
    form.querySelector("input[name='colour']").value=''
    form.querySelector("input[name='kilometers']").value=''
    form.querySelector("input[name='fun_factor']").value=''
}

function getCarFromForm(){
    var form = document.getElementById("createUpdateForm")
    var car = {}
    car.id = form.querySelector("input[name='id']").value
    car.make = form.querySelector("input[name='make']").value
    car.model = form.querySelector("input[name='model']").value
    car.price = parseInt(form.querySelector("input[name='price']").value,10)
    car.colour = form.querySelector("input[name='colour']").value
    car.kilometers = parseInt(form.querySelector("input[name='kilometers']").value,10)
    car.fun_factor = parseInt(form.querySelector("input[name='fun_factor']").value,10)
    console.log(JSON.stringify(car))

    return car

}

function addCarToTable(car){
    var tableElement = document.getElementById("carTable")
    var rowElement = tableElement.insertRow(-1)
    rowElement.setAttribute('id',car.id)

    var cell1 = rowElement.insertCell(0);
    cell1.innerHTML = car.id

    var cell2 = rowElement.insertCell(1);
    cell2.innerHTML = car.make

    var cell3 = rowElement.insertCell(2)
    cell3.innerHTML = car.model

    var cell4 = rowElement.insertCell(3)
    cell4.innerHTML = car.price

    var cell5 = rowElement.insertCell(4)
    cell5.innerHTML = car.colour

    var cell6 = rowElement.insertCell(5)
    cell6.innerHTML = car.kilometers

    var cell7 = rowElement.insertCell(6)
    cell7.innerHTML = car.fun_factor

    var cell8 = rowElement.insertCell(7);
    cell8.innerHTML = '<button onclick="showUpdate(this)">Update</button>'

    var cell9 = rowElement.insertCell(8);
    cell9.innerHTML = '<button onclick=doDelete(this)>Delete</button>'


}

function getCarFromRow(rowElement){
    var car = {}
    console.log(car)
    car.id = rowElement.getAttribute('id')
    car.make = rowElement.cells[1].firstChild.textContent
    car.model = rowElement.cells[2].firstChild.textContent
    car.price = parseInt(rowElement.cells[3].firstChild.textContent,10)
    car.colour = rowElement.cells[4].firstChild.textContent
    car.kilometers = parseInt(rowElement.cells[5].firstChild.textContent,10)
    car.fun_factor = parseInt(rowElement.cells[6].firstChild.textContent,10)
    return car

}

function setCarInRow(rowElement,car){
    rowElement.cells[0].firstChild.textContent = car.id
    rowElement.cells[1].firstChild.textContent = car.make
    rowElement.cells[2].firstChild.textContent = car.model
    rowElement.cells[3].firstChild.textContent = car.price
    rowElement.cells[4].firstChild.textContent = car.colour
    rowElement.cells[5].firstChild.textContent = car.kilometers
    rowElement.cells[6].firstChild.textContent = car.fun_factor

}

function populateFormWithCar(car){
    var form = document.getElementById('createUpdateForm')
    form.querySelector("input[name='id']").disabled = true
    form.querySelector("input[name='id']").value = car.id
    form.querySelector("input[name='make']").value=car.make
    form.querySelector("input[name='model']").value=car.model
    form.querySelector("input[name='price']").value=car.price
    form.querySelector("input[name='colour']").value=car.colour
    form.querySelector("input[name='kilometers']").value=car.kilometers
    form.querySelector("input[name='fun_factor']").value=car.fun_factor
    return car
}

function doUpdate(){
    var car = getCarFromForm();
    console.log(car)
    var rowElement = document.getElementById(car.id);
    updateCarAjax(car);
    setCarInRow(rowElement,car)

    clearForm()
    showViewAll()
}

function doDelete(r){
    var tableElement = document.getElementById("carTable");
    var rowElement = r.parentNode.parentNode
    var index = rowElement.rowIndex;
    deleteCarAjax(rowElement.getAttribute("id"))
    tableElement.deleteRow(index)
}

function getAllAjax(){
    $.ajax({
        "url": "carsrus",
        "method":"GET",
        "data":"",
        "dataType": "JSON",
        "success":function(result){
            console.log(result);
            for (car of result){
                addCarToTable(car);
            }
            
        },
        "error":function(xhr,status,error){
            console.log("error: "+status+" msg:"+error);
        }
    });
}
function createCarAjax(car){
    $.ajax({
        "url": "carsrus",
        "method":"POST",
        "data":JSON.stringify(car),
        "dataType": "JSON",
        contentType : "application/json; charset=utf-8",
        "success" : function(result){
            //console.log(result)
            car.id = result.id
            addCarToTable(car)
            clearForm()
            showViewAll()
        },
        "error":function(xhr,status,error){
            console.log("error: "+status+" msg:"+error);
        }
    });
}
function updateCarAjax(car){
    console.log(JSON.stringify(car));
    $.ajax({
        "url": "/carsrus/"+encodeURI(car.id),
        "method":"PUT",
        "data":JSON.stringify(car),
        "dataType": "JSON",
        contentType : "application/json; charset=utf-8",
        "success" : function(result){
        },
        "error":function(xhr,status,error){
            console.log("error: "+status+" msg:"+error);
        }
    });
}

function deleteCarAjax(id){
    console.log(JSON.stringify(car));
    $.ajax({
        "url": "/carsrus/"+encodeURI(id),
        "method":"DELETE",
        "data":"",
        "dataType": "JSON",
        contentType : "application/json; charset=utf-8",
        "success" : function(result){
        },
        "error":function(xhr,status,error){
            console.log("error: "+status+" msg:"+error);
        }
    });
}

getAllAjax()
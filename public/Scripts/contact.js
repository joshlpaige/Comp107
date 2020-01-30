//var serverURL = "http://restclass.azurewebsites.net/API/";
var serverURL = "http://localhost:8080/api/"
// object constructor
function Messages(name, messages){
    this.name = name;
    this.messages = messages;
    this.user = "Josh";
}


function clearForm(){
    $("#txtName").val("");
    $("#txtMessages").val("");

    $("#txtName").focus();
}

function saveMessages(){
    var name = $("#txtName").val();
    var messages = $("#txtMessages").val();
    
    // create an object
    var theMessages = new Messages(name, messages)
    var jsonString = JSON.stringify(theMessages);
    // Object Literal

    // send the object to the server
    $.ajax({
        url: serverURL + "messages",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        success: function(response){
            console.log("Yes, it works", response);

            clearForm();

            // show notification
            $("#alertYes").removeClass("hidden");

            // hide notification
            setTimeout(function(){
                $("#alertYes").addClass("hidden");
            }, 1000);

        },
        error: function(errorDetails){
            console.log("Error: ", errorDetails);
        }
    });

    

}

function init(){
    // console.log("This is the Admin page!!");


    $("#btnSubmit").click(saveMessages);

    $("#txtName").keypress(function(e){

        if(e.key == "Enter"){
            saveMessages();
        }
    })

}



window.onload = init;

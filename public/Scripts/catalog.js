var items = [];
var categories = [];
var serverURL = "http://localhost:8080/api/";

function fetchCatalog(){

    // get Items from the server
    $.ajax({
        url: serverURL + "items",
        type: "GET",
        success: function(response){
            console.log("Yes, it works", response);
            for (var i = 0; i<response.length; i++){
                var item = response[i];
                if(item.user == "Josh"){
                    items.push(item);
                }
            }

            displayCatalog();

        },
       
        // solve, show only MY items
            // travel response array
            // get each item on the array
            // if the item.user == "Josh"
            // then, push item into items array

        error: function(errorDetails){
            console.log("Error: ", errorDetails);
        }
    });
}

function displayCatalog(){
// travel the array
    for(var i=0; i<items.length; i++){
        // get the items
        var item = items[i];
        // draw the item on the DOM (HTML)
        drawItem(item);

        var cat = item.category;
        // ask if categories array contains cat
        if(!categories.includes(cat)){
            categories.push(cat);
        }
    }

    drawCategories();
}

function drawItem(item){
    // create the syntax
    var sntx = 
    `<div class='item'>
        <img src='${item.image}'>
        <label class="code">${item.code}</label>
        <label class="category">${item.category}</label>
        <label class="description">${item.description}</label>
        <label class="price">$${(item.price * 1).toFixed(2)}</label>
        <button class='btn btn-sm btn-info'> + </button>
    </div>`;
    
    // get element from the screen
    var container = $("#catalog");

    // append the syntax to the element
    container.append(sntx);
}

function drawCategories(){
    // get the container for the categories
    var container = $("#categories");
    var categoriesTwo = $("#category-top");
    // travel the categories array
    for(i=0; i<categories.length; i++){
    // get each category
    var c = categories[i];
    // create an LI for the category
    var li =
    `<li class="list-group-item"><a href="#" onclick="searchByCat('${c}');">${c}</a></li>`;
    // add LI to the container
    container.append(li);
    categoriesTwo.append(li);
    }
}

function search(){
    // console.log("User wants to search");

    var text = $("#txtSearch").val().toLowerCase();
  
    // clear previous results
    $("#catalog").html("");

    // travel the array and only show the items thst contain the text
    for(var i = 0; i<items.length; i++){
        var item = items[i];

        // if the description contains the text
        // OR the category contains the text
        // OR the code is equal to the text
        // OR the price is equal to the text
        // then show the item on the screen

        if(item.description.toLowerCase().includes(text)
            || item.category.toLowerCase().includes(text)
            || item.code == text
            || item.price == text
        ){
            drawItem(item);
        }
    }
    // console.log(text);
}

function searchByCat(catName){
    
    console.log("Search for the ", catName);

    $("#catalog").html("");

    for (var i = 0; i<items.length; i++){
        var item = items[i];
        
        if(item.category.toLowerCase().includes(catName.toLowerCase())){
            drawItem(item);
        }
    }
}

function resetCategory(){
    var text = "";
    $("#catalog").html("");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.category.toLowerCase().includes(text)) {
            drawItem(item);
        }

    }
}

function init(){

    console.log("This is the catalog page");

    // get data

    fetchCatalog();

    // hook events
    $("#btnSearch").click(search);

    $("#txtSearch").keypress(function(e){
        if(e.key == "Enter"){
            search();
        }
    });

    $("#catalog").on("click", ".item", function(){
        //$(this).toggleClass("selected");
        var img = $(this).find('img').clone();
        $(".modal-body").html(img);

        $("#modal").modal();
    });
}

// HTTP Methods


// HTTP Status Codes
// what they are and read about that stuff

window.onload = init;
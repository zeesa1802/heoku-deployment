
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

loadRecipies();
$("#recipes").on("click", ".btn-delete", handleDelete);
$("#addBtn").click(addRecipe);
$("#recipes").on("click", ".btn-edit", handleUpdate);


$("#updateBtn").click(function() {
  
  var id = $("#updateId").val();
  var title = $("#updateTitle").val();
  var body = $("#updateBody").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    data: { title, body },
    method: "PUT",
    success: function(response) {
      console.log(response);
      loadRecipies();
    }
  })

  var result = confirm("Are You Sure to update the record?");

 closeForm() 


});









function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn-delete" style="color:red; float: right;">delete</button><button class="btn-edit" style="color:orange; float: right;">edit</button> ${rec.body}</p></div>`
        );
  
      }
    }
  });
}

function addRecipe() {
  var title = prompt("Enter Title");
  var body = prompt("Enter Body/Description");

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function(response) {
      loadRecipies();
     
    }
  });

}


function handleUpdate() {
  openForm()
  

  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");

  // var title = prompt("Enter Title");
  // var body = prompt("Enter Body/Description");
  
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(response) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    
  });
}



function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}
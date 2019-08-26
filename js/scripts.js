// User Interface
var travelLog = new TravelLog();
var activeID;

$(document).ready(function(){
  $("#newPlace").submit(function(event){
    event.preventDefault();
    var name = $("#placeName").val();
    var memory = $("#memory").val();

    var newPlace = travelLog.addPlace(name, memory);
    if(newPlace){
      var placeCard = createCard(newPlace);
      $("#output").append(placeCard);
    }
    $("#newPlace").trigger("reset");
  });

  $("#editor").submit(function(event) {
    event.preventDefault();
    var food = $("#food").val();
    var activity = $("#activity").val();
    var fav = $("#favorite").attr('checked');
    var activePlace = travelLog.getPlace(activeID);
    if(activePlace){
      activePlace.setFavorite(fav);
      if(food){
        activePlace.addFood(food);
        $("#" + activeID + " #food").text(activePlace.foods.join(", "));
      }
      if(activity){
        activePlace.addActivity(activity);
        $("#" + activeID + " #activity").text(activePlace.activities.join(", "));
      }
      if (activePlace.foods.length) {
        $("#" + activeID + " #food").parent().removeClass("hidden");
      }
      if (activePlace.activities.length) {
        $("#" + activeID + " #activity").parent().removeClass("hidden");
      }
      $("#editor").trigger("reset");
    }
  });

  $("#output").on("click", function(event){
    activeID = parseInt(event.target.closest(".card").id);
    $("#output").children().removeClass("active");
    $("#"+activeID).toggleClass("active");
  });


});

function createCard(place){
  var cardString = "<div id=\"" + place.id + "\" class=\"card\"><div class=\"card-body\"><h5 class=\"card-title\">" + place.name + "</h5><p class=\"card-text\">" + place.memory + "</p><p class=\"card-text hidden\">Food I ate here: <span id=\"food\">" + place.foods.join(", ") + "</span></p><p class=\"card-text hidden\">Activities I did here: <span id=\"activity\">" + place.activities.join(", ") + "</span></p><p class=\"card-text\"></p><p class=\"card-text\">ID: " + place.id + "</p></div></div>";
  return cardString;
}

// Business Logic
function TravelLog(){
  this.log = [],
  this.currentId = 0
}

TravelLog.prototype.addPlace = function(name, memory = "", fav = false, foods = [], activities = []){
  if (name) {
    var place  = new Place(name, memory, fav, foods, activities);
    place.id = this.assignId();
    this.log.push(place);
    return place;
  }
}

TravelLog.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TravelLog.prototype.getPlace = function(id) {
  for (var i = 0; i < this.log.length; i++) {
    if (this.log[i]) {
      if (this.log[i].id === id) {
        return this.log[i];
      }
    }
  }
  return false;
}

TravelLog.prototype.removePlace = function(id) {
  for (var i = 0; i < this.log.length; i++) {
    if (this.log[i]) {
      if (this.log[i].id === id) {
        delete this.log[i];
        return true;
      }
    }
  }
  return false;
}

TravelLog.prototype.myFavs = function() {
  var favs = [];
  for (var i = 0; i < this.log.length; i++) {
    if (this.log[i] && this.log[i].isFavorite) {
        favs.push(this.log[i]);
    }
  }
  return favs;
}

TravelLog.prototype.countPlaces = function() {
  var count = 0;
  for (var i = 0; i < this.log.length; i++) {
    if (this.log[i]) {
      count++;
    }
  }
  return count;
}

TravelLog.prototype.getSimilarPlaces = function(propertyName, searchText){
  var places = [];
  for (var i = 0; i < this.log.length; i++){
    if(this.log[i]){
      for(var j = 0; j < this.log[i][propertyName].length; j++){
        if(this.log[i][propertyName][j].toLowerCase().includes(searchText.toLowerCase())){
          places.push(this.log[i]);
          break;
        }
      }
    }
  }
  return places;
}

function Place(name, memory = "", fav = false, foods = [], activities = []){
  this.name = name,
  this.memory = memory,
  this.isFavorite = fav,
  this.foods = foods,
  this.activities = activities
}

Place.prototype.updateMemory = function(memory){
  this.memory = memory;
}

Place.prototype.setFavorite = function(boolean){
  if (typeof boolean === "boolean") {
    this.isFavorite = boolean;
  }
}

Place.prototype.addFood = function(food) {
  this.foods = this.foods.concat(food);
}

Place.prototype.addActivity = function(activity) {
  this.activities = this.activities.concat(activity);
}

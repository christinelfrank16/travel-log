// User Interface
var travelLog = new TravelLog();

$(document).ready(function(){
  $("#newPlace").submit(function(event){
    event.preventDefault();
    var name = $("#placeName").val();
    var memory = $("#memory").val();
    // var food = $("#food").val();
    // var activity = $("#activity").val();
    // var fav = $("#favorite").attr('checked');

    travelLog.addPlace(name, memory);
  });
});


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

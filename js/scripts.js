// User Interface

$(document).ready(function(){

});


// Business Logic
function TravelLog(){
  this.log = [],
  this.currentId = 0
}

TravelLog.prototype.addPlace = function(name, memory = ""){
  if (name) {
    var place  = new Place(name, memory);
    place.id = this.assignId();
    this.log.push(place);
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

function Place(name, memory = ""){
  this.name = name,
  this.memory = memory,
  this.isFavorite = false
}

Place.prototype.updateMemory = function(memory){
  this.memory = memory;
}

Place.prototype.setFavorite = function(boolean){
  if (typeof boolean === "boolean") {
    this.isFavorite = boolean;
  }
}

Template.spreadsheet.onCreated(function() {
  this.subscribe("data_all");
  this.sortBy = new ReactiveVar();
  this.sortDir = new ReactiveVar(1);
});

Template.spreadsheet.onRendered(function(){

});

Template.spreadsheet.events({
  "click [data-action=sort_set]" :function (e,tmp) {
    var sortfield = e.target.dataset.sortfield;
    
    if(!sortfield) {
      console.warn("clicked [data-action=sort_set] without a data-sortfield");
    }
    
    if(tmp.sortBy.get() === sortfield) {
      //Switch around sortDir
      
      if(tmp.sortDir.get() === 1) {
        tmp.sortDir.set(-1);
      } else {
        tmp.sortDir.set(1);
      }
      
    } else {
      //Just new new sortfield
      
      tmp.sortBy.set(sortfield);
    }
    
  }
});

Template.spreadsheet.helpers({
  documents() {
    var tmp = Template.instance();
    var sortBy = tmp.sortBy.get();
    var sortDir = tmp.sortDir.get();
    
    var sort = {};
    sort[sortBy]=sortDir;
    
    return Documents.find({},{
      sort : sort
    });
  },
  
  faClass(dbField) {
    var tmp = Template.instance();
    var sortDir = tmp.sortDir.get();
    var sortBy = tmp.sortBy.get();
    
    console.log(dbField,sortDir,sortBy);
    
    if(dbField !== sortBy || typeof sortBy === "undefined") {
      return "fa fa-unsorted";
    }
    
    //TODO might be wrong way around, test once we sort numbers
    if(sortDir === 1) {
      return "fa fa-sort-asc";
    } else {
      return "fa fa-sort-desc";
    }
    
  }
});


var templates = {};

// single post template
templates.item = [
  "<div class='styleItem'><input type='radio' class='toDoItem' value='<%= _id %>' <%= disable === true ?  disabled= '' %> > <h4><%= title %></h4> <br/></div>"
].join("");

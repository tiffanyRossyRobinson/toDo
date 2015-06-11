var templates = {};

// single post template
templates.item = [
  "<div class='styleItem'>",
  "<% if(disable === 'true') { console.log('disabled');%>",
  "<input type='radio' class='toDoItem' value='<%= _id %>' disabled='disabled'>",
  "<% } else { %>",
  "<input type='radio' class='toDoItem' value='<%= _id %>'>",
  "<% } %>",
  " <h4><%= title %></h4> <br/></div>"
].join("");


// the below did not work. You can not evaluate withing the mark up 
// templates.item = [
//   "<div class='styleItem'><input type='radio' class='toDoItem' value='<%= _id %>' <% disable === "true" ? disabled %> > <h4><%= title %></h4> <br/></div>"
// ].join("");

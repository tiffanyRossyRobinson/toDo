// dom ready;
$(document).ready(function () {
  page.init();
});

var page = {

  completeCount: 0,
  todoCount : 0,

  url: "http://tiy-fee-rest.herokuapp.com/collections/trossy",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function () {

    page.loadItems();
    page.getItems();

  },
  initEvents: function () {

    $('.filter').on('click', 'a', page.todoFilter);
    $('.footOfList').on('click','.clear', page.clearCompleted);
    $('.items').on('click', '.toDoItem', page.itemComplete);
    $('.addItem').keypress(function(e){
      if(e.which === 13){
        console.log("pressed enter");
        // console.log($(this).val());
        var title= $(this).val();
        var input = {'title': title, 'disable': 'false'};
        console.log(input);
        page.createPost(input);
        $('.addItem').val('');
      }

    });
  },

  itemComplete: function(e){
    console.log("something was checked");
    $(this).attr('disabled',true);
    var id= $(this).val();
    console.log($(this));
    var selected = {checked: 'selected', disable: true};
    console.log(selected);
    console.log(id);
    page.updatePost(selected, id);
  },

  addToDoItem: function (item) {
    page.loadTemplate("item", item, $('.items'));
    console.log("add to do item: " ,item);
    page.getItems();
  },
  addAllToDoItems: function (allItems) {
    // console.log(allItems.length);
    _.each(allItems, page.addToDoItem);
  },
  loadItems: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        // console.log( "here's the date: ", data);
        page.addAllToDoItems(data);
      },
      error: function (err) {

      }
    });
  },
  getItems: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        page.getItemRemaining(data);
      },
      error: function (err) {

      }
    });
  },

    getItemRemaining: function (data) {
      // console.log("now we r passing: ", data);
      var count= 0;
      _.each(data, function(e){
       if(e.disable === 'false'){
         count += 1;
       }
      })
      console.log(count);
      $('.remaining').text(count + " Items Remaining");
    },

  createPost: function (newPost) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newPost,
      success: function (data) {
        console.log(newPost);
        page.addToDoItem(data);
        console.log("success!!: ", data);
        // page.loadItems(); adds extras to the page when you do this.
      },
      error: function (err) {
        console.log("error ", err);
      }
    });

  },
  updatePost: function (editedData, id) {

  $.ajax({
    url: page.url + '/' + id,
    method: 'PUT',
    data: editedData,
    success: function (data) {
      // console.log("successfully added ", editedData)
      page.getItems();

    },
    error: function (err) {}
  });



},

  loadTemplate: function (tmplName, data, $target) {
    // console.log(data);
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },
  getTemplate: function (name) {
    return templates[name];

  }
};




// delete manually
// $.ajax({
//     url: 'http://tiy-fee-rest.herokuapp.com/collections/trossy/5578b4e53efe8603000001a9',
//     method: 'DELETE',
//     success: function (data) {
//       console.log("deleted");
//
//     }
// })

  // loadItems: function () {
  //   page.getItems();
  //   page.addAllToDoItems( );
  // },
//

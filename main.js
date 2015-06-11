// dom ready;
$(document).ready(function () {
  page.init();
});

var page = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/trossy",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function () {

    page.loadItems();
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
  },
  addAllToDoItems: function (allItems) {
    console.log(allItems.length);
    $('.remaining').prepend(allItems.length);
    _.each(allItems, page.addToDoItem);
  },
  loadItems: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        page.addAllToDoItems(data);
      },
      error: function (err) {

      }
    });
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
      // $('.content').html('');
      // page.loadItems();
      console.log("successfully added ", editedData)

    },
    error: function (err) {}
  });


},

  loadTemplate: function (tmplName, data, $target) {
    console.log(data);
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },
  getTemplate: function (name) {
    return templates[name];

  }
};

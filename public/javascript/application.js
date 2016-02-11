$(document).ready(function() {

  $("#contactForm").hide();
  $("#get_contacts").click(function () {
    $("#contact_table").show();
    $("#contactForm").hide();
    $.getJSON('/users', function(users) {
      var table = $("#contact_table").find('tbody').empty();
      users.forEach(function(user) {  
        var tr = $("<tr>").addClass('user').appendTo(table).data('user', user);
        $("<td>").appendTo(tr).text(user.name);
        $("<td>").appendTo(tr).text(user.email);
        $("<td>").appendTo(tr).text(user.phone_number);

        tr.click(function(data){
          var name = $(this).data('user').name;
          var email = $(this).data('user').email;
          var phone_number = $(this).data('user').phone_number;
          
          $("#contactForm").hide();
          var addUpdateForm = $("<form>").attr("class", "update-contact")
          var nameField = $("<input>").attr("type", "text").attr("name", "name").attr("class", "contact-name").attr("value", name);
          var emailField = $("<input>").attr("type", "text").attr("name", "email").attr("class", "contact-email").attr("value", email);
          var phone_numberField = $("<input>").attr("type", "text").attr("name", "phone_number").attr("class", "contact-phone_number").attr("value", phone_number);
          var submitButton = $("<input>").attr("type", "submit").attr("value", "Update Contact");

          addUpdateForm.append(nameField).append(emailField).append(phone_numberField).append(submitButton)
          
          $("body").append(addUpdateForm)
        });


      }); 
    });
  });

$("#create_contact").click(function () {

    $("#contact_table").hide();
    $("#contactForm").show();
  });

$("#contactForm").submit(function () {
   var name = $('#name').val();
   var email = $('#email').val();
   var phone_number = $('#phone_number').val();
   $.post('/users', {name: name, email: email, phone_number: phone_number}, function(data) {
      if (data.result) {
        $("#name").add("#email").add("#phone_number").val('');
        alert("Uhullll!!! Contact created, ID: " + data.id);
      } else {
        alert("Error");
      }
    }, 'json');

    return false;
  });



});

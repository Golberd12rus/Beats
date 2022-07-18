const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
      
      field.removeClass("form__input-error");

      if (field.val().trim() == "") {
          field.addClass("form__input-error");
      }

  });

  const errorField = form.find(".form__input-error");

  return errorField.length == 0;
}

$(".form").submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  content.removeClass("modal-error");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
      $.ajax({
          url: "https://webdev-api.loftschool.com/sendmail",
          method: "post",
          data: {
              name: name.val(),
              phone: phone.val(),
              comment: comment.val(),
              to: to.val()
          },
          success: data => {
              content.text(data.message),

              $.fancybox.open({
                  src: "#modal",
                  type: "inline",
                  touch: false
              });
          },
          error: data => {
              const message = data.responseJSON.message;
              content.text(message);
              content.addClass("modal-error");
              
              $.fancybox.open({
                  src: "#modal",
                  type: "inline",
                  touch: false
              });
          }
      });
  }
});

$(".app-close-modal").click(e => {
  e.preventDefault();

  $.fancybox.close();
});
/* #region side nav click event */
$(".menu a").on("click", function (event) {
  $(".menu a").removeClass("active");
  $(this).addClass("active");
});
/* #endregion */

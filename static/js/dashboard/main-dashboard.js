

const currentLocation = location.href;
$(".navigation ul li a").each(function () {
  if (currentLocation.includes($(this).attr("href"))) {
    $(this).addClass("active");
  }
});

$(".navigation ul li a").each(function () {
  $(this).on("click", function () {
    $(".navigation ul li a").removeClass("active");
    $(this).addClass("active");
  });
});

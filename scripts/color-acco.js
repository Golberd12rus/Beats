const mesureWidth = itemcolor => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const containercolor = itemcolor.closest(".products-color");
  const titlesBlocks = containercolor.find(".products-color__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = itemcolor.find(".products-color__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
      reqItemWidth = screenWidth - titlesWidth;
  } else {
      reqItemWidth = 500;
  }

  return {
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingLeft - paddingRight
  }
};

const closeEveryItemInContainer = containercolor => {
  const itemcolor = containercolor.find(".products-color__item");
  const contentcolor = containercolor.find(".products-color__content");

  itemcolor.removeClass("active-color");
  contentcolor.width(0);
};

const openItemcolor = itemcolor => {
  const hiddenContent = itemcolor.find(".products-color__content");
  const reqWidth = mesureWidth(itemcolor);
  const textBlock = itemcolor.find(".products-color__container");

  itemcolor.addClass("active-color");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".products-color__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const itemcolor = $this.closest(".products-color__item");
  const itemOpened = itemcolor.hasClass("active-color");
  const containercolor = $this.closest(".products-color");

  if (itemOpened) {
      closeEveryItemInContainer(containercolor);
  } else {
      closeEveryItemInContainer(containercolor);
      openItemcolor(itemcolor);
  }
  
});

$(".products-color__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($(".products-color"));
});
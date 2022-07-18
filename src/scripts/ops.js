const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItem = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active-section");

const countSectionPosition = (sectionEq) => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("передано не верное значение в countSectionPosition");
        return 0;
    }

    return position;
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {

    if (inScroll) return;
    
    const transitionOver = 700;
    const mouseInertiaOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    })

    resetActiveClassForItem(sections, sectionEq, "active-section");

    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItem, sectionEq, "fixed-menu__item--active");
    }, transitionOver + mouseInertiaOver);
    
};

const viewportScroller = () => {
    const activeSection = sections.filter(".active-section");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index())
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index())
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next()
    }

    if (deltaY < 0) {
        scroller.prev()
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName == "input" || tagName == "textarea" 

    if(userTypingInInputs) return;

    switch (e.keyCode) {
        case 38:
            scroller.prev()
            break;
    
        case 40:
            scroller.next()
            break;
    };
    
});

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});

if (isMobile) {
    //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe( {
    swipe: function (event, direction, ) {
        const scroller = viewportScroller();
        let scrollDirection = "";

        if (direction == "up") scrollDirection = "next";
        if (direction == "down") scrollDirection = "prev";
        
        scroller[scrollDirection]();
    }
  });
}
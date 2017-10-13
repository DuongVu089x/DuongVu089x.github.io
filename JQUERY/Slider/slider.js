const imageUrl = ["images/slider_1.jpg",
    "images/slider_2.png",
    "images/slider_3.jpg",
    "images/slider_4.jpg",
    "images/slider_5.jpg"
];
const TIMEOUT = 5000;


let items; //initialize value  array item
let listImages; //initialize value array image
let index = -1; //initialize value index
let handler; //initialize variable control setInterval

/**
 * Data binding for div#indicators and div#list-images with value in imageUrl
 */
(function initImages() {
    let indicators = $('#indicators');
    let thumbs = $('#thumbs');
    for (i = 0; i < imageUrl.length; i++) {
        indicators.append("<div class='item fade'><a><img src='" + imageUrl[i] + "'></a></div>");
        thumbs.append("<li class='image-item' onclick='changeIndex(" + i + ")'><img src='" + imageUrl[i] + "'></li>");
    }
    nextItem();
})();
/**
 * Display next item after click button next 
 */
function nextItem() {
    if (index >= $('.indicators .item').length - 1) {
        index = 0;
    } else {
        index++;
    }
    clearInterval(handler);
    changeItem(index);
    sliderShow();
}
/**
 * Display prev item after click button prev 
 */
function prevItem() {
    if (index <= 0) {
        index = $('.indicators .item').length - 1;
    } else {
        index--;
    }
    clearInterval(handler);
    changeItem(index);
    sliderShow();
}
/**
 * Change item display
 */
function changeItem(currentIndex) {
    $('.indicators .item').each(function (i) {
        $(this).css("display", "none");
        $('.image-item').eq(i).removeClass('active');
        if (i === currentIndex) {
            $(this).css("display", "block");
            $('.image-item').eq(i).addClass('active');
        }
    });
}
/**
 * Change item display after click current image
 * @param {Number}currentIndex 
 */
function changeIndex(currentIndex) {
    index = currentIndex;
    clearInterval(handler);
    changeItem(index);
    sliderShow();
}
/**
 * Create auto change image
 */
function sliderShow() {
    handler = setInterval(() => {
        nextItem();
    }, TIMEOUT);
};
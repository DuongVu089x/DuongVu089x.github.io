var item; //initialize value  array item
var listImages; //initialize value array image
var index = -1; //initialize value index
var handler;//initialize variable control setInterval
var imageUrl = ["images/slider_1.jpg",
    "images/slider_2.png",
    "images/slider_3.jpg",
    "images/slider_4.jpg",
    "images/slider_5.jpg"
];
const TIMEOUT = 5000;
/**
 * Data binding for div#indicators and div#list-images with value in imageUrl
 */
(function initImages() {
    var indicators = document.getElementById('indicators');
    var thumbs = document.getElementById('thumbs');
    for (i = 0; i < imageUrl.length; i++) {
        indicators.innerHTML += "<div class='item fade' style='display:none'><a><img src='" + imageUrl[i] + "'></a></div>";
        thumbs.innerHTML += "<li class='image-item' onclick='changeIndex(" + i + ")'><img src='" + imageUrl[i] + "'></li>";
    }
    item = document.querySelectorAll('.indicators .item');
    listImages = document.querySelectorAll('.image-item');
    nextItem();
})();
/**
 * Create auto change image
 */
function sliderShow() {
    handler = setInterval(function () {
        nextItem();
    }, TIMEOUT);
};
/**
 * Change item display
 */
function changeItem(currentIndex) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.display = "none";
        listImages[i].classList.remove('active');
    }
    item[currentIndex].style.display = "block";
    listImages[currentIndex].classList.add('active');
}
/**
 * Display prev item after click button prev 
 */
function prevItem() {
    if (index <= 0) {
        index = item.length-1;
    } else {
        index--;
    }
    clearInterval(handler);
    changeItem(index);
    sliderShow();
}
/**
 * Display next item after click button next 
 */
function nextItem() {
    if (index >= item.length - 1) {
        index = 0;
    } else {
        index++;
    }
    clearInterval(handler);
    changeItem(index);
    sliderShow();
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
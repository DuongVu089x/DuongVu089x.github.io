var header = document.getElementById('header');
var content = document.getElementById('content');
var contextHeader = header.getContext('2d');
var contextContent = content.getContext('2d');

(function init() {
    contextHeader.clearRect(0, 0, header.width, header.height);
    contextHeader.fillStyle = "#19B80A";
    contextHeader.font = "20px Arial,sans-serif";
    contextHeader.fillText('Score: ' + '1', 10, 30);
    contextHeader.fillText('Heart: ', 10, 60);
    contextHeader.fillText('Speed: ', 10, 90);
    contextHeader.fillText('Random Monster: ', 300, 30);
})();

header.addEventListener('click', function (e) {
    console.log(123);
});
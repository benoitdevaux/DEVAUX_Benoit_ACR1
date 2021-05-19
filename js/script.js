class SliderContent {
    constructor(img, title) {
        this.img = img;
        this.title = title;
    }

    get getImg() {
        return this.img;
    }

    get getTitle() {
        return this.title;
    }
}

var imgTab = [];
function loadjson() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: './json/slider.json',
        success: function(json) {
            json.forEach(function(item) {
                imgTab.push(new SliderContent(
                    item.src,
                    item.title
                ))
            })
            console.log(imgTab);
            displaySlides(imgTab);
            $('.o-slider').slick({
                autoplay: true,
                dots:true
            });
            
        }
    })
}

function displaySlides(imgTab) {
    imgTab.forEach(img => {
        $(".o-slider").append("<img src='"+ img.getImg + "' alt='" + img.getTitle + "'/>")
    })
}

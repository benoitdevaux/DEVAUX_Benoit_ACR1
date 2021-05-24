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

class Article {
    constructor(img, title, description) {
        this.img = img;
        this.title = title;
        this.description = description;
    }

    get getTitle() {
        return this.title;
    }

    get getImg() {
        return this.img;
    }

    get getDescription() {
        return this.description;
    }
}

var imgTab = [];
function loadImg() {
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
            displaySlides(imgTab);
            $('.o-slider').slick({
                autoplay: true,
                dots:true
            });
            
        }
    })
}

var articleTab = [];
function loadArticle() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: './json/article.json',
        success: function(json) {
            json.forEach(function(item) {
                articleTab.push(new Article(
                    item.src,
                    item.title,
                    item.description
                ))
            })
            displayArticle(articleTab);
        }
    })
}

function displaySlides(imgTab) {
    imgTab.forEach(img => {
        $(".o-slider").append("<img src='"+ img.getImg + "' alt='" + img.getTitle + "'/>")
    })
}

function displayArticle(articleTab) {
    articleTab.forEach(article => {
        $(".o-content").append(
        "<article class='o-article'>"+
            "<img class='o-article__img' src='"+ article.getImg + "' alt='" + article.getTitle + "'/>"+
            "<h2 class='o-article__title'>" + article.getTitle + "</h2>" +
            "<p class='o-article__text'>" + article.getDescription + "</p>" +
        "</article>")
    })
}

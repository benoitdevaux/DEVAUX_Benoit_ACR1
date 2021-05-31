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
    constructor(img, title, description, teaser) {
        this.img = img;
        this.title = title;
        this.description = description;
        this.teaser = teaser;
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
    
    get getTeaser() {
        return this.teaser;
    }
}

class Form {
    constructor(url) {
        this.url = url;
    }

    get getUrl() {
        return this.url;
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
                    item.description,
                    item.teaser
                    ))
                })
                displayArticle(articleTab);
                
                var $grid = $('.o-content').imagesLoaded( function() {
                    $grid.masonry({
                        itemSelector: '.o-article',
                        columnWidth: 100,
                    });
                });
            }
        })
    }
var urlForm = "";
function loadUrl() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: './json/form.json',
        success: function(json) {
            urlForm = json.url;
            console.log(json);
        }
    })
}

function submitForm() {
    $(".loading").show();
    console.log(urlForm);
    $.ajax({
        dataType: "json",
        type: "POST",
        data: {email: $("#email").val(), message: $("#message").val()},
        url: urlForm,
        success: function(resp) {
            $(".loading").hide();
            $(".o-form__status").innerHTML = "Nous vous remercions pour votre avis";
        }, 
        error: function(result, statut, error) {
            $(".loading").hide();
            $(".o-form__status").innerHTML = "L'envoi de votre message a échoué";
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
                    "<h2 class='o-article__title'>" + article.getTitle + "</h2>"+
                    "<p class='o-article__text'>" +article.getTeaser + "</p>"+
                    "</article>")
                })
            }
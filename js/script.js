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
                        item.description
                        ))
                    })
                    displayArticle(articleTab);
                    
                    var $grid = $('.o-content').imagesLoaded( function() {
                        $grid.masonry({
                            itemSelector: '.o-article',
                            columnWidth: 1,
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
                }
            })
        }
        
        function submitForm() {
            $(".o-form__loading").show();
            $.ajax({
                dataType: "json",
                type: "POST",
                data: {email: $("#email").val(), message: $("#message").val()},
                url: urlForm,
                success: function(resp) {
                    $(".o-form__loading").hide();
                    $(".o-form__status").text('Nous vous remercions pour votre avis');
                }, 
                error: function(result, statut, error) {
                    $(".o-form__loading").hide();
                    $(".o-form__status").text('L\'Envoi de votre message a échoué');
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
                console.log(article.getTeaser);
                $(".o-content").append(
                    "<article class='o-article uk-animation-slide-bottom'>"+
                    "<img class='o-article__img' src='"+ article.getImg + "' alt='" + article.getTitle + "'/>"+
                    "<h2 class='o-article__title'>" + article.getTitle + "</h2>"+
                    "<p class='o-article__text'>" + article.getDescription + "</p>"+
                    "</article>")
                })
            }

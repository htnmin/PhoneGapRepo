
$(function () {

    $.getJSON("data/gallery.txt", function (data) {
        ko.applyBindings(new GalleryModel(data));
    });

    $(window).resize(maximizeGalleria);

    ko.bindingHandlers.galleryThumbnail = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var galleryModel = bindingContext.$root;
            var item = viewModel;

            $(element).attr("src", item.image);

            $(element).click(function () {
                galleryModel.set(item);

                //$("#GalleryItem").show();
                $("#Gallery").fadeOut(function () {
                    $("#GalleryItem").fadeIn();
                    initGalleria();
                });
            });
        }
    };

    ko.bindingHandlers.galleryItemThumbnail = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var galleryModel = bindingContext.$root;
            var item = viewModel;

            $(element).attr("src", item.image);

            $(element).attr("data-description", item.description);
            $(element).attr("data-title", "");
        }
    };
});

var GalleryModel = function (items) {
    var self = this;
    self.items = ko.observableArray(items);
    self.itemCurrent = ko.observable();
    self.itemCurrent.images = ko.observableArray();

    self.set = function (item) {
        self.itemCurrent(item);
        self.itemCurrent.images(item.images);
    }
}   

function maximizeGalleria() {
    /* This rule is read by Galleria to define the gallery height: */
    var h = $(window).height() - 260;
    $("#galleria").css("height", h + "px");
}

function initGalleria() {

    

    // Load the classic theme
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.js');
    // Initialize Galleria
    Galleria.run('#galleria');
    Galleria.configure({
        transition: 'fade'
    });

    maximizeGalleria();

    //$(".galleria-stage").css("padding-top", "50px");

    //$(".galleria-stage").css("background-color", "red");
}




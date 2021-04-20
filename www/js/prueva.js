
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $('.tabs').tabs({
        "swipeable": true
    });

    (function () {
    $(function () {
        $('.sidenav').sidenav();
        $("#submit").on("click", () => {
            $.ajax({
                url: `http://musicbrainz.org/ws/2/artist/?query=${$("#name").val()}&fmt=json`
            }).done(function (res) {
                $(".collection-body").html('');
                for (const item of res.artists) {
                    $(".collection-body").append(`<a href="#!" class="collection-item">${item['name']}<i class="material-icons">send</i></a>`);
                    $(".collection-body a").last().data("body", item);
                }
                $(".collection-item").on("click", (e) => {
                    var tabsInstance = M.Tabs.getInstance($("#tabs"));
                    tabsInstance.select("details-tab");
                    const data = $(e.target).data("body");
                    console.log(data);
                    $("#details-tab .name").text(data.name);
                    for (const tag of data.tags)
                        $("#details-tab .tags").append(`<div class="chip">${tag.name}</div>`);
                });
            });
        })
    })
})(jQuery);

}
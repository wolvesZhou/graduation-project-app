var contentHeight=$(window).height();

/**处理桌面图标js**/
$(function () {
    iniContentHeight();    
});

/**初始化内容度**/
function iniContentHeight() {
    var winHeight = $(window).height();
    contentHeight = winHeight;

    if ($(".header").length > 0) {
        contentHeight = contentHeight - $(".header").innerHeight();
    }
    if ($(".footer").length > 0) {
        contentHeight = contentHeight - $(".footer").innerHeight();
    }
    if ($(".folder-main").length > 0) {
        $(".folder-main").height(contentHeight);
    }

    if ($(".main-screen").length > 0) {
        $(".main-screen").height(contentHeight);
    }    
    if ($(".downscreen").length > 0) {
        $(".downscreen").height((contentHeight * 0.35));
    }

    $(".folder-main").hide();
    $(".main-screen").show();
}

//还原未点击样式
function resettoolitem() {
    $(".toolitem").each(function () {
        $(this).removeClass("item-active").addClass("item-unactive");
    });
}
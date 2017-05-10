$(function () {
    $(".dialog").hide();

    //显示
    var dialogshow = function () {
        $(".dialog").show();
    };

    //关闭
    var dialogclose = function () {
        $(".dialog").hide();
    }

    $(".btnclose").click(function () {
        dialogclose();
    });
})

//显示
function dialogshow() {
    $(".dialog").show();
}
var myitemFunc = undefined;//图标点击
var myfolderFunc = undefined;//分组图标点击
var dropOverFunc = undefined;//完成后需要处理的信息
var itemLongFunc = undefined;//长按事件

/***启用拖动
（clickItemFunc:点击图标处理）  
（clickfoldeFunc：点击文件夹处理）
 (overFunc:拖动完成)
 (longDownFunc:长按)
 ****/
function activeDragdrop(clickItemFunc, clickfoldeFunc, overFunc, longDownFunc) {

    myitemFunc = clickItemFunc;//图标点击
    myfolderFunc = clickfoldeFunc;//分组图标点击
    dropOverFunc = overFunc;//完成后需要处理的信息
    itemLongFunc = longDownFunc;

    createItemDrag();
    createItemDrop();
}
/***创建拖动****/
function createItemDrag() {
    var longtime = 0;
    var timeout = undefined;
    var timeLong = undefined;

    $('.tool-item').draggable().on("draggable:start", function (e, ui) {

        //拖动
        timeout = setTimeout(function () {
            longtime = 5;
        }, 1000);

        //长按
        timeLong = setTimeout(function () {
            if (itemLongFunc != null && itemLongFunc != undefined) {
                itemLongFunc();
            }
        }, 2000);

    }).on("draggable:stop", function (e, ui) {
        clearTimeout(timeout);
        clearTimeout(timeLong);

        if (longtime != 5 && myitemFunc) {
            myitemFunc();
        }
        longtime = 0;
    });


    $('.folder-item').draggable().on("draggable:start", function (e, ui) {
        timeout = setTimeout(function () {
            longtime = 5;
        }, 1000);
    }).on("draggable:stop", function (e, ui) {
        clearTimeout(timeout);
        if (longtime != 5 && myfolderFunc != null) {
            myfolderFunc(ui.item);
        }
        longtime = 0;
    });
}

var isdropOver = false;
var isitemScreen = false, isicoscreen = false;
var dropItem = undefined;

/***创建放下****/
function createItemDrop() {
    $(".main-tool").droppable().on("droppable:drop", function (e, ui) {
        if (isdropOver) {
            dragdropItem(ui.item);//移动图标放下
            isdropOver = false;
            ui.item.remove();

            reloadPageHtml();//重新构建页面Html
        }
        return false;
    })

    $('.folder-item').droppable().on('droppable:over', function (e, ui) {
        isitemScreen = true;
        isdropOver = true;
        dropItem = $(this);
    });
    $('.folder-ico').droppable().on('droppable:over', function (e, ui) {
        isicoscreen = true;
        isdropOver = true;
    }).on("droppable:out", function (e, ui) {
        isicoscreen = false;
        isdropOver = true;
    });

    $('.tool-item').droppable().on('droppable:over', function (e, ui) {
        isitemScreen = true;
        isdropOver = true;
        dropItem = $(this);
    });
    $('.tool-ico').droppable().on('droppable:over', function (e, ui) {
        isicoscreen = true;
        isdropOver = true;
    }).on("droppable:out", function (e, ui) {
        isicoscreen = false;
        isdropOver = true;
    });
}


/****放下图标处理*****/
function dragdropItem(uitem) {
    var uiclass = $(uitem).attr("class");
    var isdragFolder = (uiclass.indexOf("folder-item") > -1);

    if (isitemScreen && isicoscreen && isdragFolder) {
        var newItem = createTool(2, $(uitem).html());
        $(dropItem).before(newItem);
    } else if (isitemScreen && !isicoscreen && isdragFolder) {
        var newItem = createTool(2, $(uitem).html());
        $(dropItem).before(newItem);
    } else if (isitemScreen && isicoscreen && !isdragFolder) {
        var istoolItem = ($(dropItem).attr("class").indexOf("tool-item") > -1);
        if (istoolItem) {
            var newItem = createTool(1, $(uitem).html());
            var dropNewItem = createTool(1, $(dropItem).html());
            $(dropItem).find(".tool-ico").first().html("");
            $($(dropItem).find(".tool-ico")).removeClass("tool-ico").addClass("folder-ico");
            $(dropItem).removeClass("tool-item").addClass("folder-item");
            $(dropItem).find(".folder-ico").first().html(newItem + dropNewItem);
        } else {
            var newItem = createTool(1, $(uitem).html());
            var floderItems = $(dropItem).find(".folder-ico").first().html() + newItem;
            $(dropItem).find(".folder-ico").first().html("");
            $(dropItem).find(".folder-ico").first().html(floderItems);
        }
    } else if (isitemScreen && !isicoscreen) {
        var newItem = createTool(1, $(uitem).html());
        $(dropItem).before(newItem);
    }
}

/****创建新的组件******/
function createTool(ctype, strhtml) {
    if (ctype == 1) {
        return "<div class=\"tool-item\">" + strhtml + "</div>";
    } else {
        return "<div class=\"folder-item\">" + strhtml + "</div>";
    }
}

/****************************主页面处理（重新构建页面）  开始************************/
function reloadPageHtml() {
    var bodyhtml = $(document.body).html();

    $(document.body).html(bodyhtml);//重新建立页面
    createItemDrag();//重新构建拖动
    createItemDrop();//重新构建放下
    mainPager();

    if (dropOverFunc != null && dropOverFunc != undefined) {
        dropOverFunc();
    }
}
/****************************主页面处理  结束****************************************/


/****************************文件夹处理 开始*****************************************/
/**创建文件夹**/
function createFolderMain(folderGroup) {
    var index = 0;
    var itemHtml = "";
    $(folderGroup).find(".tool-item").each(function (e) {
        if (index == 0) {
            itemHtml += "<li><div class=\"folder-screen\">"
        }
        else if (index % 9 == 0) {
            itemHtml += "</div></li><li><div class=\"folder-screen\">"
        }
        itemHtml += "<div class=\"folder-toolitem\">" + $(this).html() + "</div>"
        index++;
    });

    var strHtml = "<div class=\"folder-header\">" + $(folderGroup).find(".tooltext").last().html() + "</div>";
    strHtml += "<div class=\"myfolder flexslider folder-style\"><ul class=\"slides\">";
    strHtml += itemHtml;
    strHtml += "</div></li></ul></div>";
    $(".folder-main").html(strHtml);

    foldershowComplete();
    folderPager();
    setfloderMiddle();

    $(".folder-main").show();
    $(".main-screen").hide();
}

/**将文件夹显示在中央位置**/
function setfloderMiddle() {
    var contentHeight = $(".folder-main").innerHeight();

    var folderheader = $(".folder-header").innerHeight();
    var folderScreen = $(".folder-screen").innerHeight();

    var itemhalf = (folderScreen + folderheader) / 2;
    var conenthalf = (contentHeight / 2);

    var margintop = (conenthalf - itemhalf) / 2 + "px";
    $(".folder-header").css("margin-top", margintop);
}

/**处理文件夹显示问题**/
function foldershowComplete() {

    var clickType = 2;
    $(".folder-screen").click(function () {
        $(".folder-main").show();
        $(".main-screen").hide();
        clickType = 1;
    });

    //隐藏文件夹
    $(".folder-main").click(function () {
        if (clickType != 1) {
            $(".folder-main").hide();
            $(".main-screen").show();
            $(".folder-main").html("");
        }
        clickType = 2;
    });
}

/***文件夹翻页****/
function folderPager() {
    if ($('.myfolder').size() > 0) {
        $('.myfolder').flexslider({
            animation: 'slide',
            controlNav: true,
            directionNav: false,
            animationLoop: true,
            slideshow: false,
            useCSS: false,
            animationLoop: false,
            slideshowSpeed: 0
        });
    }
}

/****************************文件夹处理 结束*****************************************/
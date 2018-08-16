window.onload = function () {
    //1、轮播图
    var caro = document.getElementById("carousel"); //图片
    var carolis = caro.children;
    var imgUl = document.getElementById("imgLis");  //圆点
    var caroindex = 0;
    var imgUlindex = 0;


    caro.appendChild(carolis[0].cloneNode(true));

    for (var i = 0; i < carolis.length - 1; i++) {
        var imglis = document.createElement("li");
        imgUl.appendChild(imglis);
    }
    imgUl.children[0].className = "li-selected";

    var imgLis = imgUl.children;
    for (var j = 0; j < imgLis.length; j++) {
        (function (j) {
            var imgLi = imgLis[j];
            imgLi.onmouseover = function () {
                for (var k = 0; k < imgLis.length; k++) {
                    imgLis[k].className = "";
                }
                this.className = "li-selected";

                constant(caro, -(992 * j), 50);

                caroindex = j;           //图片索引
                imgUlindex = j;          //圆点索引
            }
        })(j)
    }

    var bigBox = document.getElementById("bigBox");   //轮播图的大盒子
    var timer1 = setInterval(autoplay, 2000);
    bigBox.onmouseover = function () {
        clearInterval(timer1);
    }
    bigBox.onmouseout = function () {
        timer1 = setInterval(autoplay, 2000);
    }
    //自动播放
    function autoplay() {
        caroindex++;
        if (caroindex > carolis.length - 1) {
            caro.style.left = 0;
            caroindex = 1;                            //即播放到最后一张（克隆的）图片，则跳回第二张图片
        }
        constant(caro, -(992 * caroindex), 50);

        imgUlindex++;
        if (imgUlindex > imgLis.length - 1) {
            imgUlindex = 0;
        }
        for (var l = 0; l < imgLis.length; l++) {
            imgLis[l].className = "";
        }
        imgLis[imgUlindex].className = "li-selected";
    }
    //匀速动画
    function constant(obj, target, step) {
        clearInterval(obj.timer);

        var obj_step = obj.offsetLeft < target ? step : -step;

        obj.timer = setInterval(function () {
            obj.style.left = obj.offsetLeft + obj_step + "px";
            if (Math.abs(target - obj.offsetLeft) < Math.abs(obj_step)) {
                clearInterval(obj.timer);
                obj.style.left = target + "px";
            }
        }, 20);
    }

    //2、选项卡
    var appliances = document.getElementsByClassName("appliances");             //选项卡的标题
    var appContent1 = document.getElementsByClassName("content2_1_bottom");      //选项卡的内容
    var appCon1 = appContent1[0].getElementsByTagName("div");
    var appContent2 = document.getElementsByClassName("content2_2_bottom");      //选项卡的内容
    var appCon2 = appContent2[0].getElementsByTagName("div");
    var appContent3 = document.getElementsByClassName("content2_3_bottom");      //选项卡的内容
    var appCon3 = appContent3[0].getElementsByTagName("div");
    var appContent4 = document.getElementsByClassName("content2_4_bottom");      //选项卡的内容
    var appCon4 = appContent4[0].getElementsByTagName("div");
    var appContent5 = document.getElementsByClassName("content2_5_bottom");      //选项卡的内容
    var appCon5 = appContent5[0].getElementsByTagName("div");

    for (var c = 0; c < appliances.length; c++) {
        (function (c) {
            var appLis = appliances[c].children;            //选项卡的每个标题

            for (var a = 0; a < appLis.length; a++) {
                (function (a) {
                    appLi = appLis[a];
                    appLi.index = a;

                    appLi.onmouseover = function () {
                        for (var b = 0; b < appLis.length; b++) {
                            appLis[b].className = "";
                            
                            if(c==0){
                                appCon1[b].style.display = "none";
                            }else if(c==1){
                                appCon2[b].style.display = "none";
                            }else if(c==2){
                                appCon3[b].style.display = "none";
                            }else if(c==3){
                                appCon4[b].style.display = "none";
                            }else {
                                appCon5[b].style.display = "none";
                            }
                            
                        }
                    this.className = "selected";
                    console.log(this.index);
                    if(c==0){
                        appCon1[this.index].style.display = "block";
                    }else if(c==1){
                        appCon2[this.index].style.display = "block";
                    }else if(c==2){
                        appCon3[this.index].style.display = "block";
                    }else if(c==3){
                        appCon4[this.index].style.display = "block";
                    }else {
                        appCon5[this.index].style.display = "block";
                    }
                        
                    }
                })(a)
            }
        })(c)

    }

    //返回顶部
    var return_top=document.getElementById("return_top");
    var rt_begin=0,rt_end=0;timer2=null;

    var nav=document.getElementById("navigation");

    window.onscroll=function(){
        scroll_top=scroll_v().top;
        scroll_top>0?(return_top.style.display="block"):(return_top.style.display="none");
        rt_begin=scroll_top;

        return_top.onclick=function(){
            clearInterval(timer2);

            timer2=setInterval(function(){
                rt_begin=rt_begin+(rt_end-rt_begin)*0.1;
                window.scrollTo(0,rt_begin);

                if(Math.round(rt_begin)===rt_end){
                    clearInterval(timer2);
                }
            },20)
        }
        //导航吸顶
        if(this.document.documentElement.scrollTop>nav.offsetTop){
            nav.className="header nav";
        }else{
            nav.className="header";
        }

    }

    function scroll_v(){
        if(window.pageYOffset!==null){
            return {
                top:window.pageYOffset,
                left:window.pageXOffset
            } 
        } else if(document.compatMode==="CSS1Compat"){
            return {
                top:document.documentElement.scrollTop,
                left:document.documentElement.scrollLeft
            }
        } else{
            return {
                top:document.body.scrollTop,
                left:document.body.scrollLeft
            }
        }
    }

}



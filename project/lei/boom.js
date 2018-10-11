//思路：1.封装方法，在方法内绑定多种事件
//        给start绑定点击事件的，当点击时，先创建一个10x10的div方阵，设置样式（图片背景，给每个div加上id等），并让其显示
//       2. 先取消box的右键点击事件（oncontextmenu），然后分别给鼠标左键（e.which == 1）和鼠标右键(e.which == 3)绑定事件
//          封装左键点击事件方法：1.如果是雷，直接显示游戏失败画面
//                                2.如果不是雷，是0的话就会扩散，不是0的话就显示附近8个格子雷的个数
//          封装右键点击事件的方法：1.右键只能点击左键没有点击过的div，右键点击就换flag背景图片，如果是雷的话，提示还剩多少雷
//
            //获取所有要用到的dom元素
    var start = document.getElementById('start');
    var box = document.getElementById("box");
    var del = document.getElementById("delete");
    var block = document.getElementsByClassName("block");
    var lei = document.getElementsByClassName("lei");
    var alert = document.getElementById("alert");
    var suggestion = document.getElementById("suggestion");
    var p = document.getElementsByTagName("p")[0];
    var score = document.getElementById("score");
    var primary = document.getElementById("primary");
    var hight = document.getElementById("hight");
    var allTime = document.getElementById("time");
    var mineNum;
    var mineOver;
    var mineWrap = [];
    var lock = true;
    var row;
    var col;
    var ran;
    var level;
    var tips;
    var  first;
    bindEvent();
    function bindEvent() {
        primary.onclick = function () {
            level = false;
            if(!level){
                mineOver = 10;
                mineNum = 10;
                row = 10;
                col = 10;
                ran = 100;
                box.style.width = "500px";
                box.style.height = "500px";
                primary.style.background = "yellow";
                hight.style.background = "none";
            }
        }
        hight.onclick = function () {
            level = true;
            if (level) {
                row = 20;
                col = 20;
                mineNum = 50;
                mineOver = 50;
                ran = 400;
                box.style.width = "1000px";
                box.style.height = "1000px";
                hight.style.background = "red";
                primary.style.background = "none";
            }
        }
            score.innerHTML = mineOver;
        start.onclick = function () {//避免重复点击生成多个雷区
                if (lock) {
                    box.style.display = "block";
                    inint();
                    lock = false;
                    first = (new Date()).getTime();
                }
            }
            del.onclick = function () {//点击x图标时，删除box的内容，隐藏alert
                box.style.display = "none";
                alert.style.display = "none";
                box.innerHTML = '';
                lock = true;
            }
            box.oncontextmenu = function () {//取消box区域内的鼠标点击事件
                return false;
            }

            box.onmousedown = function (e) {//分别监测鼠标左右键点击事件
                var event = e.target;
                if (e.which == 1) {
                    leftClick(event);
                } else if (e.which == 3) {
                    rightClick(event);
                }
            }
            suggestion.onclick = function () {//点击提示按钮，显示还剩余的雷数
                p.classList.add("look");
            }

    }
    //初始化创建10*10的div
    function inint() {
        for(var i = 0;i < row;i++){
            for(var j = 0;j < col;j++){
                var div = document.createElement("div");
                div.id =  i + '-' + j ;//给每个创建的div设置id
                div.classList.add("block");//设置每个div的样式
                //div.setAttribute('id', i + "-" + j);
                box.append(div);
                mineWrap.push({mine:0});
            }
        }
        while(mineNum){//随机生成10个雷
            var mineIndex = Math.floor(Math.random()*ran);//将生成的1到100的随机数分别作为mineWrap和block数组的下标
            //用来随机给10个div加上lei属性以及判断生成的随机数是否重复
            if(mineWrap[mineIndex].mine === 0){//避免生成的随机数重复
                mineWrap[mineIndex].mine = 1;
                block[mineIndex].classList.add("lei");
                mineNum --;
            }
        }
    }
    //鼠标左键点击事件
    function leftClick(dom) {
        if(dom && dom.classList.contains("flag")){
            return;
        }
        if(dom && dom.classList.contains("lei")){//如果左键点击的是雷，显示所有雷，弹出又是游戏失败框
            for(var i = 0; i < lei.length;  i++){
                lei[i].classList.add("show");
            }
            setTimeout(function () {
                alert.style.display = "block";
                alert.style.backgroundImage = "url(boom/fail.jpg)";
            },800);
        }else{
            //当左键点击box周围的雷数不是0时
            var n = 0;
            var posArr = dom && dom.getAttribute("id").split("-");
            var posX = +posArr[0];
            var posY = +posArr[1];
            dom && dom.classList.add("num");
            for(var i = posX - 1 ; i<= posX + 1; i++){//遍历点击div附近八个格子，记录其含雷属性的个数
                for(var j = posY -1; j <= posY +1; j++){
                    var aroundBox = document.getElementById(i + '-' + j );
                   if(aroundBox&& aroundBox.classList.contains("lei")){
                       n ++;
                   }
                }
            }
            //当左键点击box周围的雷数是0时
            if(n == 0){
                for(var i = posX - 1 ; i<= posX + 1; i++){
                    for(var j = posY -1; j <= posY +1; j++){
                        var nearBox = document.getElementById(i + '-' + j );
                        if(nearBox && nearBox.length != 0){
                            if(!nearBox.classList.contains("check")){//避免重复判断相同的nearBox
                                nearBox.classList.add("check");
                                leftClick(nearBox);//递归扩散周围都是0的box
                            }

                        }
                    }
                }
            }
           dom && (dom.innerHTML = n);
        }
    }
    function rightClick(dom) {
        //右键只能标记左键没有点击过的
        if(!dom.classList.contains("num")){
            dom.classList.toggle("flag");
        }
        //当标记正确时，还剩余的雷数- -
        if(dom.classList.contains("lei") && dom.classList.contains("flag")) {
            mineOver--;
            score.innerHTML = mineOver;
        }
        if(dom.classList.contains("lei") && !dom.classList.contains("flag")) {
            mineOver++;
            score.innerHTML = mineOver;
        }
        if(mineOver === 0) {
            var second = (new Date()).getTime();
            var time = Math.floor((second - first)/1000);
            console.log(time);
            allTime.innerHTML = "闯关共用时：" + time + "秒";
            setTimeout(function () {
                alert.style.display = "block";
                alert.style.backgroundImage = "url(boom/success.jpg)";
            },800)

        }
    }


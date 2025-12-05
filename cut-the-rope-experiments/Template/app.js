(function () {
    
    //UNITY STUFF
    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/CutTheRopeExperiments-WebGL.loader.js";
    var config = {
        dataUrl: buildUrl + "/CutTheRopeExperiments-WebGL.data.unityweb",
        frameworkUrl: buildUrl + "/CutTheRopeExperiments-WebGL.framework.js.unityweb",
        codeUrl: buildUrl + "/CutTheRopeExperiments-WebGL.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Zeptolab",
        productName: "Cut The Rope Experiments",
        productVersion: "1.2",
    };



    function iOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
    function isFullscreen(){
        return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
    }
    var main_container = document.querySelector("#main-container");
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loader= document.querySelector("#loader");
    var loaderFill= document.querySelector("#fill");
    var toggle_fullscreen=document.querySelector("#toggle_fullscreen");

    function onProgress(progress) {
        let clampedProgress = Math.min(1, Math.max(0, progress));
        let pr = Math.round(clampedProgress * 100);
        if (typeof window.previousProgress === "undefined" || Math.abs(pr - window.previousProgress) >= 1) {
            window.GameInterface.sendPreloadProgress(pr);
            window.previousProgress = pr;
        }
        loaderFill.style.width = pr + "%";
    }

    function onComplete(unityInstance) {
        function onTransitionEnd(event) {
            if (event.propertyName === "width") {
                //window.GameInterface.gameReady();
                loader.remove();
                document.querySelectorAll('#app-container, #unity-canvas').forEach(function(el) {
                    el.style.display = "block";
                });
                loaderFill.removeEventListener("transitionend", onTransitionEnd);
                //onWindowResize();
            }
        }
    
        loaderFill.addEventListener("transitionend", onTransitionEnd);
    
        setTimeout(() => {
            if (document.body.contains(loader)) {
                //window.GameInterface.gameReady();
                loader.remove();
                document.querySelectorAll('#app-container, #unity-canvas').forEach(function(el) {
                    el.style.display = "block";
                });
                loaderFill.removeEventListener("transitionend", onTransitionEnd);
                //onWindowResize();
            }
        }, 1100);
    }
    var resizeTimeOut;
    function onWindowResize() {
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        canvas.height=height;
        canvas.width=width;
    }
    function onWindowResizeWithDelay(){
        clearTimeout(resizeTimeOut);
        resizeTimeOut = setTimeout(onWindowResize, 200);
    }


    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, onProgress)
            .then(onComplete)
            .catch((message) => {
                alert(message);
        });
    };
    document.body.appendChild(script);

    //window.addEventListener('resize', onWindowResizeWithDelay);
    //onWindowResizeWithDelay();


    if(iOS()){
        toggle_fullscreen.style.display="none";
    }
    else{
        toggle_fullscreen.addEventListener('click', function(){

           // if already full screen; exit
            // else go fullscreen
            if ( isFullscreen() ) {
              
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } 
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } 
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } 
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
            } /*else {
                
                if (main_container.requestFullscreen) {
                    main_container.requestFullscreen();
                } else if (main_container.mozRequestFullScreen) {
                    main_container.mozRequestFullScreen();
                } else if (main_container.webkitRequestFullscreen) {
                    main_container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (container.msRequestFullscreen) {
                    main_container.msRequestFullscreen();
                }
            }*/
           
        });

        document.onfullscreenchange = function ( event ) {
            if ( isFullscreen() ) {
                if (toggle_fullscreen.classList.contains("fullscreenON")) {
                    toggle_fullscreen.classList.remove("fullscreenON");
                }
                toggle_fullscreen.classList.add("fullscreenOFF");

               
            } else {
                
                if (toggle_fullscreen.classList.contains("fullscreenOFF")) {
                    toggle_fullscreen.classList.remove("fullscreenOFF");
                }
                toggle_fullscreen.classList.add("fullscreenON");

              
            }
            setTimeout(() => {
                canvas.width=1000;
                onWindowResizeWithDelay();
            }, 400);
        };

    }

})();

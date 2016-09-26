// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var watchID = null;
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var element = document.getElementById("deviceready");
        //element.innerHTML = 'Device Ready';
        //element.className += ' ready';
        
        start();
    };

    
	function simulateKeyup(code) {
		var e = jQuery.Event("keyup");
		e.keyCode = code;
		jQuery('body').trigger(e);
	}

    function simulateKeydown(code) {
        var e = jQuery.Event("keydown");
        e.keyCode = code;
        jQuery('body').trigger(e);
    }

    function startWatch() {
        var options = { frequency: 1000 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    function onError() {
        alert('onError!');
    }

    function start() {
            $.mobile.loading().hide();
            loadAllSound();

            HELP_TIMER = setInterval('blinkHelp()', HELP_DELAY);

            $(".sound").click(function (e) {
                e.stopPropagation();

                var sound = $(this).attr("data-sound");
                if (sound === "on") {
                    $(".sound").attr("data-sound", "off");
                    $(".sound").find("img").attr("src", "img/sound-off.png");
                    GROUP_SOUND.mute();
                } else {
                    $(".sound").attr("data-sound", "on");
                    $(".sound").find("img").attr("src", "img/sound-on.png");
                    GROUP_SOUND.unmute();
                }
            });

            $(".help-button, #help").click(function (e) {
                e.stopPropagation();
                if (!PACMAN_DEAD && !LOCK && !GAMEOVER) {
                    if ($('#help').css("display") === "none") {
                        $('#help').fadeIn("slow");
                        $(".help-button").hide();
                        if ($("#panel").css("display") !== "none") {
                            pauseGame();
                        }
                    } else {
                        $('#help').fadeOut("slow");
                        $(".help-button").show();
                    }
                }
            });

            $(".github").click(function (e) {
                e.stopPropagation();
            });

            initHome();

            $("#home").on("mousedown touchstart", function (e) {
                e.preventDefault();
                simulateKeydown(13);
            });
            $("#control-up, #control-up-second, #control-up-big").on("mousedown touchstart", function (e) {
                e.preventDefault();
                simulateKeydown(38);
                simulateKeyup(13);
            });
            $("#control-down, #control-down-second, #control-down-big").on("mousedown touchstart", function (e) {
                e.preventDefault();
                simulateKeydown(40);
                simulateKeyup(13);
            });
            $("#control-left, #control-left-big").on("mousedown touchstart", function (e) {
                e.preventDefault();
                simulateKeydown(37);
                simulateKeyup(13);
            });
            $("#control-right, #control-right-big").on("mousedown touchstart", function (e) {
                e.preventDefault();
                simulateKeydown(39);
                simulateKeyup(13);
            });


            $("body").keyup(function (e) {
                KEYDOWN = false;
            });

            $("body").keydown(function (e) {

                if (HOME) {
                    startWatch();
                    initGame(true);

                } else {
                    //if (!KEYDOWN) {
                    KEYDOWN = true;
                    if (PACMAN_DEAD && !LOCK) {
                        erasePacman();
                        resetPacman();
                        drawPacman();

                        eraseGhosts();
                        resetGhosts();
                        drawGhosts();
                        moveGhosts();

                        blinkSuperBubbles();

                    } else if (!PAUSE && !PACMAN_DEAD && !LOCK) {
                        startWatch();
                        
                    } else if (e.keyCode === 68 && !PAUSE) {
                        /*if ( $("#canvas-paths").css("display") === "none" ) {
                            $("#canvas-paths").show();
                        } else {
                            $("#canvas-paths").hide();
                        }*/
                    } else if (e.keyCode === 80 && !PACMAN_DEAD && !LOCK) {
                        if (PAUSE) {
                            resumeGame();
                        } else {
                            pauseGame();
                        }
                    } else if (GAMEOVER) {
                        initGame();
                    }
                    //}
                }
            });
        
    }

    function onSuccess() {
        var SOUTH = 2, NORTH = 4, EAST = 3, WEST = 1;
        if (accelorometer.x>2) {
            movePacman(WEST);
        } else if (accelorometer.y > 2) {
            movePacman(SOUTH);
        } else if (accelorometer.x > -2) {
            movePacman(EAST);
        } else if (accelorometer.y > -2) {
            movePacman(NORTH);
        }
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        pauseGame();
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        resumeGame();
    };
} )();
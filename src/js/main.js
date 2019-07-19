import "scss/styles.scss";

import $ from "jquery";
import Collapse from "bootstrap/js/dist/collapse";

import "./components/carousel";



$(function(){
    $(".sidebar .close").click(function(){
        $(".sidebar").addClass("hide");
    });


    

});


(function(w){
    let finder = document.getElementById("finder"),
        medallion = finder.querySelector(".medallion"),
        throttle;

    w.addEventListener('scroll', function(){
        if(throttle){
            w.clearTimeout(throttle);
        }

        throttle =  w.setTimeout(function(){
            let beginMove = 320,
                endMove = 150,
                offset = finder.getBoundingClientRect().top,
                percentComplete = Math.min(100, Math.max(0, (beginMove - offset)/(beginMove - endMove) * 100));

            if(finder && finder.clientHeight > 0) {
                medallion.style.top = `${percentComplete/2}%`;
                finder.querySelector(".left-nav").style.left = `${percentComplete/2}%`;
                finder.querySelector(".right-nav").style.right = `${percentComplete/2}%`;
            } else {
                finder.querySelectorAll(".medallion, .left-nav, .right-nav").map((e)=> e.style = null);
            }

        }, 50);


    });




})(window);

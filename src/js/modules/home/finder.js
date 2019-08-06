(function(w){
    let finder = document.getElementById("finder"),
        medallion = finder.querySelector(".medallion"),
        throttle,
        transition = ((e) => {
            if(throttle){
                w.clearTimeout(throttle);
            }
    
            throttle =  w.setTimeout(function(){
                let beginMove = 320,
                    endMove = 200,
                    offset = finder.getBoundingClientRect().top,
                    percentComplete = Math.min(100, Math.max(0, (beginMove - offset)/(beginMove - endMove) * 100));
    
                if(finder && finder.clientHeight > 0) {
                    medallion.style.top = `${percentComplete/2}%`;
                    finder.querySelector(".left-nav").style.left = `${percentComplete/2}%`;
                    finder.querySelector(".right-nav").style.right = `${percentComplete/2}%`;
                } else {
                    finder.querySelectorAll(".medallion, .left-nav, .right-nav").map((e)=> e.style = null);
                }
    
            }, 10);
        })();

    w.addEventListener('scroll', transition);

})(window);
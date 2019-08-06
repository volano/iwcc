(function(w){
    let throttle,
        finder = document.getElementById("finder"),
        medallion = finder.querySelector(".medallion"),
        options = finder.querySelector(".finder-nav"),
        navigation = finder.querySelectorAll(".finder-nav button[class*=rotate]"),
        transition = (e) => {
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
        };

    w.addEventListener('scroll', transition);
    w.addEventListener('load', transition);
    if(navigation){
        [...navigation].map((e)=> e.addEventListener('click', rotateOptions));
    }

    /**
     * Rotate the options around in the option lists for symettry
     */
    function rotateOptions (element){
        let leftNav = options.querySelector(".left-nav"),
            rightNav = options.querySelector(".right-nav"),
            direction = element.currentTarget.classList.contains("rotate-cw")?"clockwise":"counterclockwise",
            kinematic = direction === "clockwise" ? [leftNav, rightNav] : [rightNav, leftNav];
        kinematic[0].insertBefore(kinematic[0].firstElementChild, kinematic[0].lastElementChild);
        kinematic[1].prepend(kinematic[1].querySelectorAll("a")[2]);
        return false;
    }

})(window);
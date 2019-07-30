import "scss/pages/home.scss";

import "home/finder";
import jQuery from "jquery";

(function($){

    $(init);

    function init(){
        $(".sidebar .close").click(function(){
            $(".sidebar").addClass("hide");
        });

        $("#more-less").click(function(){
            $(".left-nav").toggleClass("more");
            $("#arrow").toggleClass("arrow-up");
            $("#arrow").toggleClass("arrow-down");
        });
    }

})(jQuery);

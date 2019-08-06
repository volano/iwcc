import "scss/styles.scss";

import jQuery from "jquery";
import Collapse from "bootstrap/js/dist/collapse";

import "carousel";

(function($){

    $(init);

    function init(){
        $("#more-less").click(function(){
            $(".left-nav").toggleClass("more");
            $("#arrow").toggleClass("arrow-up");
            $("#arrow").toggleClass("arrow-down");
        });
    }

})(jQuery);


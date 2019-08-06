import "scss/pages/home.scss";

import "home/finder";
import jQuery from "jquery";
import Modal from "bootstrap/js/dist/modal";

(function($){

    $(init);

    function init(){
        $(".sidebar .close").click(function(){
            $(".sidebar").addClass("hide");
        });
    }

})(jQuery);

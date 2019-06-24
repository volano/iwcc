import "../scss/styles.scss";

import Collapse from "bootstrap/js/src/collapse";
import $ from "jquery";

$(".sidebar .close").click(function(){
    $(".sidebar").addClass("hide");
})
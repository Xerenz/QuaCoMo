$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    });
    
    function cardClick(id){
        document.getElementById(id).classList.toggle("cardCollapsed");
    }

    
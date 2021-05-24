
function sumfunction() {
    
    $("#divAlert").hide();
    let num1 = $("#number1").val();
    let num2 = $("#number2").val();
    let url="http://localhost:5000/api/sum/"+num1+"?num2="+num2;
    $.get(url).done(fillResult);
}

function fillResult(data) {
    //alert(data.data);
    $("#divAlert").show();
    $("#result").html(data.data);
}
alert("Olá, sou Gabriel! Bem vindo ao meu simulador!")
var x = 100;
var y = 15;
document.write(Math.log(2));
var1=true;
var2=false;

document.write(var1&&var2)
function test(a,b){
    if(a>b){
        return a*b;
    }
    else{
        return b/a;
    }
}
alert(test(5,15));
var n = prompt("Enter a Number","");
var answer = Math.sqrt(n);
alert("The square root of "+n+" is "+answer);

function printTime(){
    var d =new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    document.body.innerHTML = hours+":"+mins+":"+secs;
}
if(answer<5){
    var ob = document.getElementById("header");
    ob.innerHTML="É menor que 5";
}

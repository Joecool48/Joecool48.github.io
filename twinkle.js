<script language="javascript">
var starblink=250;            // LENGTH OF TIME STARS TWINKLE ON IN MILLISECONDS
var stardelay=2;               // DELAY BETWEEN TWINKLES IN SECONDS

//  ENTER THE COLORS OF THE STARS IN THE ARRAY BELOW SEPERATED BY COMMAS.
//  YOU CAN USE VALID COLOR NAMES OR HEX COLOR TRIPLETS.
var starcolors=new Array( '#C8C3C2' , '#F304F6' , '#3806F4' , '#E5E201' );

// **** DO NOT EDIT BELOW HERE **** //

var w3c=(document.getElementById)?true:false;
var ns4=(document.layers)?true:false;
var ie4=(document.all && !w3c)?true:false;
var ie5=(document.all && w3c)?true:false;
var ns6=(w3c && navigator.appName.indexOf("Netscape")>=0)?true:false;

var windowW, windowH,star;

function getwindowdims(){
windowW=(ie4||ie5)? document.body.clientWidth: window.innerWidth;
windowH=(ie4||ie5)?  document.body.clientHeight :window.innerHeight;
}

function twinkle(phs,c){
var x,y;
if(phs==2){
x=Math.floor(Math.random()*windowW-2);
y=Math.floor(Math.random()*windowH-2);
if(ns4){
star.visibility="hide"
star.moveTo(x,y);
star.bgColor=starcolors[c];
}else{
star.style.visibility="visible";
star.style.left=x+'px';
star.style.top=y+'px';
star.style.backgroundColor=starcolors[c];
}
setTimeout('twinkle(1,'+(Math.floor(Math.random()*starcolors.length))+')', stardelay);
}else{
(ns4)?star.visibility="show" : star.style.visibility="visible";
setTimeout('twinkle(2,'+c+')',starblink);
}}

document.write( (ns4)? '<layer name="star" left="0" top="0" width="2" height="2" bgcolor="white" visibility="hide"></layer>' : '<div id="star" style="position:absolute; width:2px; height:2px; top:0px; left:0px; font-size:2px; background-color:white; visibility:hidden"></div>');

window.onload=function(){
star=(ns4)?document.layers['star']:(ie4)? document.all['star']:document.getElementById('star');
getwindowdims();
window.onresize=getwindowdims;
twinkle(2,0);
}
</script>
    <!--
        This script downloaded from www.JavaScriptBank.com
        Come to view and download over 2000+ free javascript at www.JavaScriptBank.com
    -->

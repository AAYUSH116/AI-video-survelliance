objects=[];
video="";
status="";

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        object.detect(video,gotResults);
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected:"+objects.length;
            fill('#FF0000');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill()
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML='Status:object detecting';
}
function modelLoaded(){
    console.log('cocossd is initialized');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

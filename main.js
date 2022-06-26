img="";
status="";
object= [];

function preload() {
    
}

function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

//line 13 won't be a problem as if the model is not loaded then it will show line 13 else it will show line 20;

function draw() {
    image(video,0,0,380,380);
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="Stus: Object Dtected";
            document.getElementById("number_of_objects").innerHTML="Number Of Objects Detcted =" + object.length;

            fill(r,g,b);
            percent= floor(object[i].confidence * 100); //floor() will take the no. before the decimal;
            text(object[i].label + " " + percent+ "%", object[i].x + 15, object[i].y + 15);
            stroke(r,g,b);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}

function modelLoaded() {
    console.log("Model Loaded");
    status= true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }else{
        console.log(results);
        object= results;
    }
}
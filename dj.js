var playing=false;
navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function (stream) {
            video.srcObject = stream;
            console.log("values of vide width",video.videoWidth,"height is ",video.videoHeight);
            video.setAttribute('width', 680);
            video.setAttribute('height', 485);
            canvas.setAttribute('height',485);
            canvas.setAttribute('width',680);
            video.play();
        })
        .catch(function (err) {
            console.log("An error occured! " + err);
        });
context=canvas.getContext('2d');
var cw=680;
var ch=485;
canvas.width=cw;
canvas.height=ch;
context.width=cw;
context.height=ch;
video.addEventListener('canplay', function (ev) {
    var i=0;
    takepicture(video,context,cw,ch,i,playing);    
}, false);
function takepicture(v,c,w,h,i,p) {
            c.drawImage(v,0,0,w,h);
            image=context.getImageData(64,36,1,1).data;
            window.onclick=function(e){
                x=e.clientX;
                y=e.clientY;
                console.log(x,y);
                image1=context.getImageData(x,y,1,1).data;
                console.log("values are ",x,y,"is",image1);
            };
            if(i==0)
            {
                data=image;
                i=1;
            }
            else
            {
                if(Math.abs(data[0]-image[0])>30||Math.abs(data[1]-image[1])>30||Math.abs(data[2]-image[2])>30)
                {
                    document.getElementById('canvas1').style.background="rgba(255,255,255,0)";
                    if(p){
                        audio.pause();
                        p=false;
                    }
                    else{
                        audio.play();
                        p=true;
                    }
                    setTimeout(function(){
                    document.getElementById('canvas1').style.background="rgba(255,255,255,0.5)";
                },500);
                    data=image;
                }

            }
            var time=setTimeout(takepicture,20,v,c,w,h,i,p);
            control.addEventListener('click',function(){
                    clearTimeout(time);
})
}
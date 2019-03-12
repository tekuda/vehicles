function Vehicles(w,h,vehicleNumber){
    this.vehicles=[];
    this.w=w;
    this.h=h;
    this.vehicleNumber=vehicleNumber;
    var maxSpeed=4;
    
    for (var i=0;i<this.vehicleNumber;i++) {
        var speed=createVector(random(-2,2),random(-2,2));
            this.vehicles.push(new Vehicle(100//random(0,this.w),
                                           ,200//random(0,this.h)
                                           ,speed,this.w,this.h,maxSpeed,this.vehicles));
    }
    
    this.update=function(){
        for (var i=0;i<this.vehicles.length;i++) {
            this.vehicles[i].update();
        }
    }

    this.setTarget=function(target){
        
        for (var i=0;i<this.vehicles.length;i++) {
            
            this.vehicles[i].setTarget(p5.Vector.add(target,createVector(random(-50,50),random(-50,50))));
        }
    }
}
function Grid(maxSpeed){
    this.vehicles=[];
    this.maxSpeed=maxSpeed;
    this.sumWithSurroundings=createVector(0,0);
    this.avg=createVector(0,0);

    this.addVehicle=function(vehicle){
        this.vehicles.push(vehicle);
    }
    this.calculateAvg=function(){
        if (this.vehicles.length>0){
            for (var i=0;i<this.vehicles.length;i++) {
                this.avg.add(this.vehicles[i].speed);  
            }
            this.avg.div(this.vehicles.length);
            this.avg.limit(this.maxSpeed);   
        }
    }
    
    this.calculateSumWithSurroundings=function(sum){
        this.sumWithSurroundings.add(sum);  
    }
}

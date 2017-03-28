var color = true,
    particle_number = 600,
    update_frequency = 60 / 1000,

    angle_demul = 500,
    z_angle_demul = 100,
    max_radius = 5,
    min_radius = 0.5;

window.onload = function() {

  // Get canvas.
  var canvas = document.getElementById("canvas");

  // Get canvas context.
  var canvas_ctx = canvas.getContext('2d');

  // Set size.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

	var center_x =  canvas.width / 2;
	var center_y =  canvas.height / 2;

	var max_x = center_x - 150;
	var max_y = center_y - 120;

	var range = ( max_x > max_y ) ? max_y : max_x ;

  // Generate particles
  var particles = [];

  GenerateParticles( particle_number );

  // OBJECTS
  function Particle(){
    this.angle = Math.random() * 2 * Math.PI;
    this.vangle = Math.random() / angle_demul;
		this.zangle = Math.random() * 2 * Math.PI;
		this.zvelangle = Math.random() / z_angle_demul;
    this.x;
    this.y;
    this.r = max_radius*Math.random();
		this.color = (color) ? "rgb(" + Math.round(125*Math.random()) + "," + Math.round(200*Math.random()) + "," + Math.round(185*Math.random()) + "255)" : "#E30E29";

    this.Move = function(){

			// Update coordinates
      this.y = center_y + range*Math.cos(this.angle);
      this.x = center_x + range*Math.cos(this.zangle)*Math.sin(this.angle);

			// Update angle
      this.angle += this.vangle;
			this.zangle += this.zvelangle;

			// Change radius on Z axis
			if( Math.sin(this.zangle) > 0.5 && this.r < max_radius )
				this.r += 0.01;
			else if( this.r > min_radius )
				this.r -= 0.01;

    };
  }

  // FUNCTIONS
  function UpdateCanvas() {

    ClearBackground();
    UpdateParticles();

  }

  function ClearBackground() {
    canvas_ctx.fillStyle = "rgb(30,30,30)";
    canvas_ctx.fillRect( 0, 0, canvas.width, canvas.height );
  }

  function UpdateParticles(){
    for( var index in particles ){
      particles[index].Move();
      DrawParticle(particles[index]);
    }
  }

  function DrawParticle(particle){
    canvas_ctx.beginPath();
    canvas_ctx.fillStyle = particle.color;
		canvas_ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI*2);
    canvas_ctx.fill();
  }

  function GenerateParticles( num_particles ){

    for( var i = 0; i < num_particles; i++ ){
      particles.push( new Particle() );
    }
    setInterval( UpdateCanvas, update_frequency );
  }
};

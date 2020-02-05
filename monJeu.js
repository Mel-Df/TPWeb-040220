var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;

function init(){
 	var platforms;
	var player;
	var cursors; 
	var oranges;
	var scoreText;
	var bomb;
	var rubis;
}

function preload(){
	this.load.image('background','BG/BG.png');	
	//this.load.image('fond','assets/fond.png');
	this.load.image('oranges','Collectible/33.png');
	this.load.image('rubis','Collectible/22.png');
	this.load.image('sol','Tiles/2.png');
	this.load.image('sol','Tiles/2.png');
	this.load.image('sol','Tiles/2.png');
	this.load.image('plateforme','Tiles/14.png');
	this.load.image('plateformeb','Tiles/13.png');
	this.load.image('plateformec','Tiles/15.png');
	this.load.image('boite','Object/Crate.png');
	//this.load.image('bomb','assets/bomb.png');
	this.load.spritesheet('perso','Perso/marche.png',{frameWidth: 31, frameHeight: 32});
	this.load.spritesheet('saut','Perso/saut.png',{frameWidth: 33, frameHeight: 32});
}



function create(){
	this.add.image(400,300,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(425,690,'sol').setScale(2).refreshBody();
	platforms.create(100,690,'sol').setScale(2).refreshBody();
	platforms.create(680,690,'sol').setScale(2).refreshBody();
	platforms.create(800,400,'plateforme');//droite
		platforms.create(680,400,'plateformeb');
	platforms.create(50,250,'plateforme');//gauche
		 platforms.create(172,250,'plateformec');
     platforms.create(408,524,'boite');	 
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key:'saut',
		frames: this.anims.generateFrameNumbers('saut', {start: 0, end: 8}),  
		frameRate: 10,   
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:4}],
		frameRate: 20
	});
	
	oranges = this.physics.add.group({
		key: 'oranges',
		repeat:3,
		setXY: {x:12,y:0,stepX:200}
	});
	
	this.physics.add.collider(oranges,platforms);
	this.physics.add.collider(rubis,playforms);
	this.physics.add.overlap(player,rubis,collectrubis,null,this);
	this.physics.add.overlap(player,oranges,collectoranges,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	//bombs = this.physics.add.group();
	//this.physics.add.collider(bombs,platforms);
	//this.physics.add.collider(player,bombs, hitBomb, null, this);
}



function update(){
	if(cursors.left.isDown){
	 player.anims.play('left', true);
		player.setVelocityX(-250);
		player.setFlipX(true);
	}else if(cursors.right.isDown){
		player.setVelocityX(250);
		player.anims.play('left', true);
		player.setFlipX(false);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	
	if(cursors.up.isDown && player.body.touching.down){
        player.anims.play('saut', true);
		player.setVelocityY(-280);
	}


	
} 
	
//}
//function hitBomb(player, bomb){
	//this.physics.pause();
	//player.setTint(0xff0000);
	//player.anims.play('turn');
	//gameOver=true;
//}

function colletrubis(player, rubis){
 rubis.disableNody(true, true);
 score += 20;
 scoreText.setText('score: '+score);
};

function collectoranges(player, oranges){
	oranges.disableBody(true, true);
	score += 10;
	scoreText.setText('score: '+score);
	//if(oranges.countActive(true)===0){
	//	oranges.children.iterate(function(child){
	//		child.enableBody(true, child.x,0, true, true);
		};
		
		//var x = (player.x < 400) ? 
		//	Phaser.Math.Between(400,800):
		//	Phaser.Math.Between(0,400);
	   var bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	//}
//}
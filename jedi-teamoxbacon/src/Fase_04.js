class Fase_04 extends Phaser.Scene{

    // Preload
    preload(){
        console.log('Load Spritesheet');
        this.load.spritesheet('player_sp', 'assets/spritesheets/player_sp.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('ice_tile_sp', 'assets/maps/IceTileset.png', { frameWidth: 32, frameHeight: 32, margin: 5 });
        this.load.image('ice_tiles', 'assets/maps/IceTileset.png');
        this.load.spritesheet('obj_tile_sp', 'assets/maps/[Base]BaseChip_pipo.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        this.load.image('obj_tiles', 'assets/maps/[Base]BaseChip_pipo.png')
        this.load.tilemapTiledJSON('Mapa_Fase4', 'map_prj/Mapa_Fase4.json');
        this.load.audio('snowy', ['assets/audio/snowy.mp3']);
        this.load.audio('baath', ['assets/audio/baath.mp3']);
        this.load.spritesheet('bat','assets/spritesheets/bat.png', {frameWidth: 32, frameHeight: 32});
    }

    // criar elementos
    create(){
        console.log('Create map');
        // criação do mapa e ligação com as imagens
        this.map = this.make.tilemap({ key: 'Mapa_Fase4', tileWidth: 32, tileHeight: 32 });
        this.IceTileset = this.map.addTilesetImage('IceTiled', 'ice_tiles');
        this.ObjTileset = this.map.addTilesetImage('Items2', 'obj_tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('chao', this.IceTileset, 0, 0);
        this.wallsLayer = this.map.createLayer('paredes', this.IceTileset, 0, 0);
        this.boardLayer = this.map.createLayer('placas',this.IceTileset, 0, 0);
        this.iceLayer = this.map.createLayer('gelo',this.IceTileset, 0, 0);
        this.objLayer = this.map.createLayer('objetos', this.ObjTileset, 0, 0);
        this.stairLayer = this.map.createLayer('escada', this.ObjTileset,0,0);

        // criação dos personagens
        this.player = new player(this, 100, 100, 'player_sp', 0);
        this.player.setScale(0.6);
        this.player.walkEnable = 1;
        this.bat = new Enemy(this, 300, 300, 'bat', 1, this.player);
        this.bat2 = new Enemy(this, 600, 350, 'bat', 1, this.player);
        this.bat3 = new Enemy(this, 200, 300, 'bat', 1, this.player);
        this.bat4 = new Enemy(this, 850, 710, 'bat', 1, this.player);
        this.bat5 = new Enemy(this, 1055, 400, 'bat', 1, this.player);
        this.bat6 = new Enemy(this, 2000, 855, 'bat', 1, this.player);
        

        // criação da colisão
        this.wallsLayer.setCollisionBetween(0, 130, true);
        this.physics.add.collider(this.player, this.wallsLayer);

        this.boardLayer.setCollisionBetween(0, 130, true);
        this.physics.add.collider(this.player, this.boardLayer);

        this.objLayer.setCollisionBetween(0, 2000, true);
        this.physics.add.collider(this.player, this.objLayer);
        


        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1.3);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1,-200,-200);

        this.zonePlaca1 = this.add.zone(32*12, 64*3).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1);
        this.physics.add.overlap(this.player, this.zonePlaca1, Placa1, null, this);

        this.txtLst1 = ["Caminho congelando do conhecimento", "Para passar, responda as perguntas e cuidado para não escorregar"];
        this.txtResposta1a = ["Caminho A:"];
        this.txtResposta1b = ["Caminho B:"];
        this.txtResposta1c = ["Caminho C:"];
        this.dialog = new dialogs(this);
        this.create_dialog = false;
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.zoneEst1 = this.add.zone(16*65,32*5).setSize(32,64);
        this.physics.world.enable(this.zoneEst1);
        this.physics.add.overlap(this.player, this.zoneEst1, Questao1, null, this);

        this.quest_0 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 23 + 75 - 19 = ?",
            1, "◯ 81",  "◯ 79",  "◯ 77"]
        this.quest_1 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 45 - 23 + 14 = ?",
            1, "◯ 38",  "◯ 36",  "◯ 39"]
        this.quest_2 =  ["O caminho que se deve pegar é a resposta para esta pergunta:\n 56 + 28 - 9 = ?",
            1, "◯ 81",  "◯ 84",  "◯ 83"]

        this.textQuestao1 = ["Agora escolha o caminho da sua resposta"];

        this.zonePlaca1a = this.add.zone(32*38, 32*9).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1a);
        this.physics.add.overlap(this.player, this.zonePlaca1a, Placa1a, null, this);

        this.zonePlaca1b = this.add.zone(32*41, 32*7).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1b);
        this.physics.add.overlap(this.player, this.zonePlaca1b, Placa1b, null, this);

        this.zonePlaca1c = this.add.zone(32*41, 32*2).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca1c);
        this.physics.add.overlap(this.player, this.zonePlaca1c, Placa1c, null, this);

        this.txtResposta2a = ["Caminho A:"];
        this.txtResposta2b = ["Caminho B:"];
        this.txtResposta2c = ["Caminho C:"];

        this.zoneEst2 = this.add.zone(16*95,32*26).setSize(32,64);
        this.physics.world.enable(this.zoneEst2);
        this.physics.add.overlap(this.player, this.zoneEst2, Questao2, null, this);

        this.quest_3 = ["Para continuar sua jornada, outra resposta você deve responder:\n 3x9 - 5 = ?",
	        1, "◯ 24",  "◯ 22",  "◯ 23"]  
        this.quest_4 = ["Para continuar sua jornada, outra resposta você deve responder:\n 4x7 - 13 = ?",
	        1, "◯ 17",  "◯ 15",  "◯ 16"]
        this.quest_5 = ["Para continuar sua jornada, outra resposta você deve responder:\n 2x8 - 4 = ?",
	        1, "◯ 14",  "◯ 12",  "◯ 11"]  

        this.zonePlaca2a = this.add.zone(32*39, 32*20).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2a);
        this.physics.add.overlap(this.player, this.zonePlaca2a, Placa2a, null, this);

        this.zonePlaca2b = this.add.zone(32*39, 32*23).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2b);
        this.physics.add.overlap(this.player, this.zonePlaca2b, Placa2b, null, this);

        this.zonePlaca2c = this.add.zone(32*39, 32*26).setSize(64, 64);
        this.physics.world.enable(this.zonePlaca2c);
        this.physics.add.overlap(this.player, this.zonePlaca2c, Placa2c, null, this);

        //criação da música
        this.bgsong1 = this.sound.add('snowy');
        this.bgnormal = true;
        this.bssong1 = this.sound.add('baath');
        this.bgboss = false;
        this.zoneMusicBoss = this.add.zone(450, 830).setSize(64, 64);
        this.physics.world.enable(this.zoneMusicBoss);
        this.BossMessage1 = ["Se prepare para congelar o cérebro, tolo!"];
        this.physics.add.overlap(this.player, this.zoneMusicBoss, BossMessage, null, this);

        var musicConfig = {
            mute : false,
            volume : 1,
            rate : 1,
            detune : 1,
            seek : 0,
            loop : true,
            delay : 0
        }
        
        this.bgsong1.play(musicConfig);
                
    }
    
    moveE(Enemy, speedX, speedY){
        Enemy.x += speedX;
        Enemy.y += speedY;
    }

    update(){


        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.dialog.isActive){
      
              this.dialog.nextDlg()
            }
            else
            {
              this.create_dialog = true;
            }
          }
        
        if(this.iceLayer.getTileAtWorldXY(this.player.x,this.player.y) == null){
            this.player.walkEnable = 1;
        } else {
            this.player.walkEnable = 0;
        }

        //this.moveE(this.bat, -50, -50);
        //this.moveE(this.bat, 50, 50);
    }

}

function Placa1(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtLst1);
    }
}

function Placa1a(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1a);
    }
}

function Placa1b(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1b);
    }
}
function Placa1c(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta1c);
    }
}

function Placa2a(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2a);
    }
}

function Placa2b(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2b);
    }
}
function Placa2c(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtResposta2c);
    }
}

function BossMessage(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.BossMessage1);
    }

    var musicConfig = {
        mute : false,
        volume : 1,
        rate : 1,
        detune : 1,
        seek : 0,
        loop : true,
        delay : 0
    }

    this.bgsong1.stop();   
    this.bssong1.play(musicConfig);
}

function Questao1(){
    if(this.create_dialog){
        var value = Phaser.Math.Between(1,3);
        console.log(value);
        if(value == 1){
            this.dialog.makeQuestion(this.quest_0, acertou_fcn, errou_fcn);
        } else if(value == 2){
            this.dialog.makeQuestion(this.quest_1, acertou_fcn, errou_fcn);
        } else {
            this.dialog.makeQuestion(this.quest_2, acertou_fcn, errou_fcn);
        }
        this.create_dialog = false;
    }
}

function Questao2(){
    if(this.create_dialog){
        var value = Phaser.Math.Between(1,3);
        console.log(value);
        if(value == 1){
            this.dialog.makeQuestion(this.quest_3, acertou_fcn, errou_fcn);
        } else if(value == 2){
            this.dialog.makeQuestion(this.quest_4, acertou_fcn, errou_fcn);
        } else {
            this.dialog.makeQuestion(this.quest_5, acertou_fcn, errou_fcn);
        }
        this.create_dialog = false;
    }
}

function acertou_fcn(ptr){
    this.dialog.hideBox();
    this.dialog.updateDlgBox(this.textQuestao1);
}

function errou_fcn(ptr){
    this.dialog.updateDlgBox(this.textQuestao1);
}


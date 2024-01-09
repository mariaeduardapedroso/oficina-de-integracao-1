class Fase_initial extends Phaser.Scene{

    // Preload
    preload(){
        console.log('Load Spritesheet');
        this.load.spritesheet('king_sp', 'assets/spritesheets/hero1.png', { frameWidth: 16, frameHeight: 20 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('ice_tile_sp', 'assets/maps/IceTileset.png', { frameWidth: 32, frameHeight: 32, margin: 5 });
        this.load.image('ice_tiles', 'assets/maps/IceTileset.png');
        //this.load.spritesheet('obj_tile_sp', 'assets/maps/[Base]BaseChip_pipo.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        //this.load.image('obj_tiles', 'assets/maps/[Base]BaseChip_pipo.png')
        this.load.tilemapTiledJSON('themap', 'map_prj/phase_initial.json');
    }

    // criar elementos
    create(){
        console.log('Create map');
        // criação do mapa e ligação com as imagens
        this.map = this.make.tilemap({ key: 'themap', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('tileset_fase1', 'ice_tiles');
        //this.tileset = this.map.addTilesetImage('Characters', 'obj_tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('Chao', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Objetos', this.tileset, 0, 0);

        // criação dos personagens
        this.king = new Actor(this, 10, 30, 'king_sp', 1);
        this.npc1 = new Actor(this, 80, 32, 'king_sp', 4);
        this.npc2 = new Actor(this, 1424, 48, 'king_sp', 7);
        this.npc3 = new Actor(this, 1504, 1040, 'king_sp', 4);

        // criação da colisão
        this.wallsLayer.setCollisionBetween(40, 80, true)
        this.physics.add.collider(this.king, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');

        this.zonenpc1 = this.add.zone(80,48).setSize(40,40);
        this.physics.world.enable(this.zonenpc1);
        this.physics.add.overlap(this.king, this.zonenpc1, onZone, null, this);

        this.zonenpc2 = this.add.zone(1424,64).setSize(40,40);
        this.physics.world.enable(this.zonenpc2);
        this.physics.add.overlap(this.king, this.zonenpc2, onZone, null, this);

        this.zonenpc3 = this.add.zone(1504,1056).setSize(40,40);
        this.physics.world.enable(this.zonenpc3);
        this.physics.add.overlap(this.king, this.zonenpc3, onZone, null, this);

        this.zone1 = this.add.zone(192, 192).setSize(40, 40);
        this.physics.world.enable(this.zone1);
        this.physics.add.overlap(this.king, this.zone1, onZone, null, this);

        this.zone2 = this.add.zone(1215, 225).setSize(40, 40);
        this.physics.world.enable(this.zone2);
        this.physics.add.overlap(this.king, this.zone2, onZone_2, null, this);

        this.zone3 = this.add.zone(1520, 770).setSize(40, 40);
        this.physics.world.enable(this.zone3);
        this.physics.add.overlap(this.king, this.zone3, onZone_3, null, this);

        this.zone4 = this.add.zone(97, 607).setSize(40, 40);
        this.physics.world.enable(this.zone4);
        this.physics.add.overlap(this.king, this.zone4, onZone_4, null, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // definição de zoom da câmera e comando para seguir jogador
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.king, true, 0.5, 0.5);


        //diálogos
        this.fala1 = ["PERIGO! CHÃO INSTÁVEL!"];
        this.fala2 = ["Caminho para o Pilar"];
        this.fala3 = ["As portas apenas se abrem para o real conhecimento..."];
        this.fala4 = ["Você completou uma volta :)"];
        this.dialog = new dialogs(this);
    }

    update(){
        // velocidade horizontal
        if (this.keyD?.isDown) {
            this.king.setVelocityX(210);
            this.king.setFrame(18);
        }
        else if (this.keyA?.isDown) {
            this.king.setVelocityX(-210);
            this.king.setFrame(9);
        }
        else{
            this.king.setVelocityX(0); 
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            this.king.setVelocityY(-210);
            this.king.setFrame(27);
        }
        else if (this.keyS.isDown) {
            this.king.setVelocityY(210);
            this.king.setFrame(1);
        }
        else{
            this.king.setVelocityY(0); 
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            console.log("space")
            if (this.dialog.isActive){

                this.dialog.nextDlg()
            }
            else
            {
                this.create_dialog = true;
            }
            
        }
    }
    


}

function onZone(){
        if (this.create_dialog){
            this.create_dialog = false;
            this.dialog.updateDlgBox(this.fala1);
        }
}

function onZone_2(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.fala2);
    }
}

function onZone_3(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.fala3);
    }
}

function onZone_4(){
if (this.create_dialog){
    this.create_dialog = false;
    this.dialog.updateDlgBox(this.fala4);
}
}
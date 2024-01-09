console.log("actors # ")

class Fase_01 extends Phaser.Scene {


    // função para carregamento de assets
    preload ()
    {
        console.log('load spritesheet');
        this.load.spritesheet('king_sp', 'assets/spritesheets/a-king.png', { frameWidth: 78, frameHeight: 58 });
        this.load.spritesheet('fball_sp', 'assets/spritesheets/fireball.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('tiles_sp', 'assets/maps/dungeon-16-16.png', { frameWidth: 32, frameHeight: 32, margin: 16 });
        console.log('load tile sheet');
        this.load.image('tiles', 'assets/maps/dungeon-16-16.png');
        console.log('load map');
        //this.load.tilemapTiledJSON('themap', 'assets/maps/phaser_intro_map.json');
        this.load.tilemapTiledJSON('phase_initial', 'map_prj/the_map.json');
    }

    // função para criação dos elementos
    create ()
    {

        // criação do mapa e ligação com a imagem (tilesheet)
        this.map = this.make.tilemap({ key: 'phase_initial', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon_ts', 'tiles');

        // criação das camadas
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

        // criação do rei
        this.king = new Actor(this, 100, 300, 'king_sp', 5);
        this.enemy  = new Enemy(this, 100, 100, 'tiles_sp', 166);

        // criação da colisão
        this.wallsLayer.setCollisionBetween(30, 40, true)
        this.physics.add.collider(this.king, this.wallsLayer);

        // ligação das teclas de movimento
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        this.fballs = this.physics.add.group({
            key: 'fball',
        });
        this.physics.add.collider(this.fballs, this.wallsLayer, this.fball_hit, null, this);

        // criação da animação de ataque
        this.anims.create({
            key: 'atack',
            frames: this.anims.generateFrameNumbers('king_sp', {frames: [0, 3, 4]}),
            frameRate: 10,
            repeat: 0
            });

        this.anims.create({
            key: 'fire_anim',
            frames: this.anims.generateFrameNumbers('fball_sp', {frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
            });

        this.anims.create({
            key: 'enemy_anim',
            frames: this.anims.generateFrameNumbers('tiles_sp', {frames: [166, 167, 168, 169, 170]}),
            frameRate: 8,
            repeat: -1
            });
        this.enemy.play("enemy_anim");

        this.zone = this.add.zone(200, 400).setSize(100, 100);
        this.physics.world.enable(this.zone);
        this.physics.add.overlap(this.king, this.zone, onZone, null, this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.txtLst = ["Olá, viajante. Está em busca dos Pilares do Conhecimento? Fascinante!\nEu ouvi dizer que o caminho para um deles passa por esta região de neve... Tenha cuidado, o chão aqui não será seu amigo... :/"];
        this.dialog = new dialogs(this);
        this.create_dialog = true;
    }


    // update é chamada a cada novo quadro
    update ()
    {
        //king.bar.draw()
        this.enemy.update(this.king);
        // velocidade horizontal
        if (this.keyD?.isDown) {
            this.king.setVelocityX(210);
            this.king.checkFlip();
        }
        else if (this.keyA?.isDown) {
            this.king.setVelocityX(-210);
            this.king.checkFlip();
        }
        else{
            this.king.setVelocityX(0); 
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            this.king.setVelocityY(-210);
        }
        else if (this.keyS.isDown) {
            this.king.setVelocityY(210);
        }
        else{
            this.king.setVelocityY(0); 
        }

        // espaço: ataque
        if (this.keySPACE.isDown) {
            this.king.anims.play('atack', true);
        }

       if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            console.log("space")
            if (this.dialog.isActive){
                this.dialog.nextDlg()
            }
            else{
                var fb = this.physics.add.sprite(this.king.x, this.king.y, 'fball_sp', 0);
                fb.scaleY = 0.7;
                this.fballs.add(fb);
                fb.setVelocityX(this.king.flipX?-300:300)
                fb.flipX = this.king.flipX;
                fb.anims.play("fire_anim", true);
            }
        }

    }

    fball_hit (fb, groundLayer) {
        fb.destroy();
    }
}

function onZone(){
    if (this.create_dialog){
        this.create_dialog = false;
        this.dialog.updateDlgBox(this.txtLst);
    }
     
    


}
function act() {
    //rm.bossTimer(220080000,220080001,60 * 30);
    rm.spawnMonster(8500000,-410,-400);
    rm.getPlayer().send(MainPacketCreator.musicChange("Bgm09/TimeAttack"));
}
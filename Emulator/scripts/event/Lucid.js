importPackage(Packages.tools.RandomStream);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);
importPackage(java.lang);
importPackage(java.awt);

var returnmap = 450003600;
var rewardmap = 450003770;
var mapid = new Array(450004150,450004250);
var monster = new Array(8880140,8880150);
var point = new Array(new Point(1019, 50), new Point(798, -192));

function init() {

}

function setup(eim) {
    var a = Randomizer.nextInt();
    while (em.getInstance("Lucid" + a) != null) {
        a = Randomizer.nextInt();
    }
    var eim = em.newInstance("Lucid" + a);
    return eim;
}

function playerEntry(eim, player) {
    player.warp(mapid[Integer.parseInt(eim.getProperty("Stage"))], "sp");
    if (eim.isLeader(player)) {
        eim.getMapFactory().getMap(mapid[Integer.parseInt(eim.getProperty("Stage"))]).spawnMonsterOnGroundBelow(em.getMonster(monster[Integer.parseInt(eim.getProperty("Stage"))]), point[Integer.parseInt(eim.getProperty("Stage"))]);
        if (Integer.parseInt(eim.getProperty("Stage")) == 0) {
             eim.getMapFactory().getMap(mapid[Integer.parseInt(eim.getProperty("Stage"))]).spawnMonsterOnGroundBelow(em.getMonster(8880166), point[Integer.parseInt(eim.getProperty("Stage"))]);
        }
    }
}

function changedMap(eim, player, mapid) {

}

function scheduledTimeout(eim) {
    var Stage = Integer.parseInt(eim.getProperty("Stage")) + 1;
    var nextWarp = eim.getProperty("nextWarp");
    var it = eim.getPlayers().iterator();
    if (Stage == 2) {
        WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "악몽의 파괴자 루시드를 물리친 원정대여! 그대들이 진정한 영웅이다!"));
        while (it.hasNext()) {
            var chr = it.next();
            chr.warp(rewardmap, "sp");
            randomk = Randomizer.rand(1,3)
            chr.gainItem(4001879, randomk)
            chr.getClient().send(UIPacket.getItemTopMsg(4001879, "루시드를 물리쳐 나비날개 물방울석을(를) "+randomk+"개 얻으셨습니다."));
        }
            eim.getMapFactory().getMap(rewardmap).spawnMonsterOnGroundBelow(em.getMonster(8880177), new Point(88,38));
            eim.unregisterAll();
            eim.dispose();
    } else if (nextWarp) {
        eim.setProperty("Stage", Stage);
        eim.getMapFactory().getMap(mapid[Stage]).spawnMonsterOnGroundBelow(em.getMonster(monster[Stage]), point[Stage]);
        while (it.hasNext()) {
            var chr = it.next();
            chr.warp(mapid[Stage], "sp");
        }
        eim.setProperty("nextWarp", "false");
    }
}

function monsterKilled(eim, player, mobid) {
    if (mobid == monster[Integer.parseInt(eim.getProperty("Stage"))]) {
        eim.restartEventTimer(5000);
        eim.setProperty("nextWarp", "true");
    }
}


function playerDead(eim, player) {

}


function monsterValue(eim, mobid) {
    return 0;
}

function leftParty(eim, player) {
    eim.unregisterPlayer(player);
    var map = em.getMapFactory().getMap(returnmap);
    player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {

}


function removePlayer(eim, player) {
    eim.dispose();
}


function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim != null) {
        if (eim.getPlayerCount() <= 0) {
            eim.dispose();
        }
    }
}

function onMapLoad(eim, player) {

}

function playerDisconnected(eim, player)
{
    if (eim.getProperty("Global_MinPerson") == null)
    {
        return -1;
    }
    return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}

function leftParty(eim, player) {
    if (eim.getPlayerCount() < Integer.parseInt(eim.getProperty("Global_MinPerson")))
    {
        var exit = em.getChannelServer().getMapFactory().getMap(450003600);
        var it = eim.getPlayers().iterator();
        while (it.hasNext())
        {
            var chr = it.next();
            chr.changeMap(exit, exit.getPortal(0));
            chr.Message("파티원이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
        }
        eim.unregisterAll();
        if (eim != null)
        {
            eim.dispose();
        }
    }
}

function disbandParty(eim)
{
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(450003600);
    var it = eim.getPlayers().iterator();
    while (it.hasNext())
    {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("파티장이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
    }
    eim.unregisterAll();
    if (eim != null)
    {
        eim.dispose();
    }
}

function cancelSchedule() {
}
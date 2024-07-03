
importPackage(Packages.packet.creators);
importPackage(Packages.server.life);
importPackage(java.lang);
importPackage(java.awt);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.launch.world);




function init() {
    
}

function setup(eim) {
    var a = Randomizer.nextInt();
    while (em.getInstance("MonsterPark_ID"+a) != null) {
        a = Randomizer.nextInt();
    }
    var eim = em.newInstance("MonsterPark_ID"+a);
    return eim;
}

function playerEntry(eim, player) {
    var map = Integer.parseInt(eim.getProperty("Global_StartMap"));
    player.changeMap(eim.getMapFactory().getMap(map), eim.getMapFactory().getMap(map).getPortal("sp"));
}



function changedMap(eim, player, mapid) {
    
}

function scheduledTimeout(eim) {
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function allMonstersDead(eim) {
    var startmap = Integer.parseInt(eim.getProperty("Global_StartMap"));
    var curstage = Integer.parseInt(eim.getProperty("CurrentStage"));
    var curmap = (startmap + ((curstage - 1) * 100));
    var map = eim.getMapFactory().getMap(curmap);
	eim.setProperty("Global_nowMap", eval(curmap + 100) + "");
    if (curstage < 6) {
        map.broadcastMessage(MainPacketCreator.showEffect("monsterPark/clear"));
    } else {
        map.broadcastMessage(MainPacketCreator.showEffect("monsterPark/clearF"));
    }
    map.broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
    eim.setProperty("CurrentStage", (curstage + 1)+"");
}

function playerDead(eim, player) {
    return 0;
}

function playerRevive(eim, player) {
    
}

function playerDisconnected(eim, player) {
    /* 0 : 모두 나갈때 까지는 인스턴스 유지
     * 1 ~ : 일정 수준 이상의 사람만 남으면 누가 나가던지 인스턴스 유지
     * -1 ~ 이하 : 일정 수준 이상의 사람만 남으면 유지이나, 파티장이 나가면 인스턴스 삭제
     */
    if (eim.getProperty("Global_MinPerson") == null) {
        return 0;
    }
    return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}

function monsterValue(eim, mobid) {
   if(mobid != 0) {
//<<<<<<< HEAD
     eim.setProperty("totalExp", eval(eim.getProperty("totalExp")) + eval(eim.getProperty("customMonster")) * 32900);
//=======
     eim.setProperty("totalExp", eval(eim.getProperty("totalExp")) + (eval(MapleLifeProvider.getMonster(mobid).getMobMaxHp()) * 2));
//>>>>>>> 81ff44abca6f5fc1eda403ad9459c7b97f3f12ad
   }
   return mobid;
}


function monsterKilled(eim, player) {
//<<<<<<< HEAD
    eim.getMapFactory().getMap(eim.getProperty("Global_nowMap")).broadcastMessage(UIPacket.enforceMSG("경험치 보상 "+Comma(eim.getProperty("totalExp"))+" 누적!", 209, 10000000));
//=======
    eim.getMapFactory().getMap(player.getMap().getId()).broadcastMessage(UIPacket.enforceMSG("경험치 보상 "+Comma(eim.getProperty("totalExp"))+" 누적!", 209, 10000000));
//>>>>>>> 81ff44abca6f5fc1eda403ad9459c7b97f3f12ad
}

function leftParty(eim, player) {
    if (eim.getPlayerCount() < Integer.parseInt(eim.getProperty("Global_MinPerson"))) {
        var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.changeMap(exit, exit.getPortal(0));
            chr.Message("파티원이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
        }
        eim.unregisterAll();
        if (eim != null) {
            eim.dispose();
        }
    }
    
}

function disbandParty(eim) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("파티장이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}


function Comma(i)
{
	var reg = /(^[+-]?\d+)(\d{3})/;
	i+= '';
	while (reg.test(i))
	i = i.replace(reg, '$1' + ',' + '$2');
	return i;
}

function clearPQ(eim) {
    
}

function playerExit(eim, player) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("파티 퀘스트를 포기하여 더이상 퀘스트를 진행할 수 없습니다.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function onMapLoad(eim, player) {
    
}

function cancelSchedule(a) {
    
}
importPackage(Packages.tools.RandomStream);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);
importPackage(Packages.server.life);
importPackage(Packages.main.world);
importPackage(Packages.database);
importPackage(java.lang);
importPackage(java.awt);

function getNow()
{
	cal = new Date();
	return  zeroAdd(cal.getFullYear(), 4) + '-' +
		zeroAdd(cal.getMonth()+1, 2) + '-' +
		zeroAdd(cal.getDate(), 2) + '-' +
		zeroAdd(cal.getHours(), 2) + '-' +
		zeroAdd(cal.getMinutes(), 2) + '-' +
		zeroAdd(cal.getSeconds(), 2)
}

function zeroAdd(n, digits)
{
	zero = "";
	n = n.toString();

	if(n.length < digits)
	{
		for(i = 0; i < digits - n.length; i++)
		{
			zero += '0';
		}
	}
	return zero + n;
}


function init() {
}

function setup(eim) {
    var a = Randomizer.nextInt();
    while (em.getInstance("Hontale"+a) != null) {
        a = Randomizer.nextInt();
    }
    var eim = em.newInstance("Hontale"+a);
    return eim;
}

function playerEntry(eim, player) {
    var map = Integer.parseInt(eim.getProperty("Global_StartMap"));
    player.changeMap(eim.getMapFactory().getMap(map), eim.getMapFactory().getMap(map).getPortal("sp"));
    eim.startEventTimer(75 * 60 * 1000);
}



function changedMap(eim, player, mapid)
{
	return mapid;
}

function scheduledTimeout(eim) {
    
    var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        if (chr == null) {
            System.out.println("ĳ���Ͱ� NULL!");
        }
        if (exit == null) {
            System.out.println("EXIT���� NULL!");
        }
        if (exit.getPortal("sp") == null) {
            System.out.println("EXIT�� ��Ż�� NULL!");
        }
        chr.changeMap(exit, exit.getPortal("sp"));
        chr.Message(11, "�ð��� �ʰ��Ǿ� ������ ������ �������ϴ�.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function allMonstersDead(eim)
{
	if(eim.getProperty("Global_Status") == 3)
	{
		eim.getMapFactory().getMap(240060300).spawnMonsterOnGroundBelow(em.getMonster(eim.getProperty("honTale")), new java.awt.Point(71, 260));
	}
}

function playerDead(eim, player) {
    return 0;
}

function playerRevive(eim, player) {
    
}

function playerDisconnected(eim, player) {
    /* 0 : ��� ������ ������ �ν��Ͻ� ����
     * 1 ~ : ���� ���� �̻��� ����� ������ ���� �������� �ν��Ͻ� ����
     * -1 ~ ���� : ���� ���� �̻��� ����� ������ �����̳�, ��Ƽ���� ������ �ν��Ͻ� ����
     */
    if (eim.getProperty("Global_MinPerson") == null) {
        return -1;
    }
    return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}


function getMembers(eim)
{
	var it = eim.getPlayers().iterator();
	while (it.hasNext())
	{
		var chr = it.next();
		var size = chr.getParty().getMembers().size();
		var mem1 = chr.getParty().getLeader().getName() + ":";
		var mem2 = size > 1 ? chr.getParty().getMemberByIndex(1).getName() + ":" : ":";
		var mem3 = size > 2 ? chr.getParty().getMemberByIndex(2).getName() + ":" : ":";
		var mem4 = size > 3 ? chr.getParty().getMemberByIndex(3).getName() + ":" : ":";
		var mem5 = size > 4 ? chr.getParty().getMemberByIndex(4).getName() + ":" : ":";
		var mem6 = size > 5 ? chr.getParty().getMemberByIndex(5).getName() + ":" : ":";
	}
	return mem1 + mem2 + mem3 + mem4 + mem5 + mem6
}

function updateRanking(name, boss, bgin, ends, time, pmem, size)
{

}

function monsterValue(eim, mobid)
{
	if(mobid == 8870000)
	{
        	var it = eim.getPlayers().iterator();
		eim.setProperty("Global_checkEnd", getNow());
		end = System.currentTimeMillis() - Long.parseLong(eim.getProperty("Global_Bosstime"));
		end = end/1000;
		var inz = eim.getProperty("Global_checkEnd").split("-");
        	while (it.hasNext())
		{
			var chr = it.next();
			chr.Message(8, ""+chr.getName()+" �Բ��� �����Ͻ� ����(��) "+inz[1]+"�� "+inz[2]+"�� "+inz[3]+"�� "+inz[4]+"�� Ŭ���� �Ǿ� ����� ����Ǿ����ϴ�.");
			updateRanking(chr.getParty().getLeader().getName(), 8870000, eim.getProperty("Global_checkStr"), getNow(), end, getMembers(eim), chr.getParty().getMembers().size());
		}
	}

	return mobid;
}

function monsterKilled(eim, player)
{
}

function leftParty(eim, player) {
    if (eim.getPlayerCount() < Integer.parseInt(eim.getProperty("Global_MinPerson"))) {
        var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.changeMap(exit, exit.getPortal(0));
            chr.Message("��Ƽ���� ��Ƽ�� �׸��ּ� ���̻� ����Ʈ�� ������ �� �����ϴ�.");
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
        chr.Message("��Ƽ���� ��Ƽ�� �׸��ּ� ���̻� ����Ʈ�� ������ �� �����ϴ�.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function clearPQ(eim) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_RewardMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
    
}

function playerExit(eim, player) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("��Ƽ ����Ʈ�� �����Ͽ� ���̻� ����Ʈ�� ������ �� �����ϴ�.");
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
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

function init()
{   
}
	
function setup(eim)
{
	var a = Randomizer.nextInt();
	while (em.getInstance("PartyQuest_ID"+a) != null)
	{
		a = Randomizer.nextInt();
	}

	var eim = em.newInstance("PartyQuest_ID"+a);
	eim.setProperty("points", 0);
	eim.setProperty("Global_mobCount", 0);
	beginQuest(eim);
	return eim;
}

function beginQuest(eim, player)
{
	if(eim)
	{
		eim.startEventTimer(12000);
	}

}

function getMobList(eim)
{

	var diff = eim.getProperty("Global_Level");

	if(diff.equals("쉬움"))
	{
		mob = [2220000,6130101,6300005,8220007,3220000,9300003,6220000,3300005,3300006,3300007];
		bns = 1;
	}
	else if(diff.equals("보통"))
	{
		mob = [3401011,4220000,5220003,7220000,8220000,4300013,9300488,6160003];
		bns = 2;
	}
	else if(diff.equals("어려움"))
	{
		mob = [8180000,8800002,8220011,8220012,9300152,8620012,9300627,9700037];
		bns = 4;
	}
	else
	{
		mob = [8820212,8880000,8900000,8910000,8920000,8930000];
		bns = 8;
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


function spawnMob(eim)
{
	getMobList(eim);
	var mobId = mob[parseInt(eim.getProperty("Global_mobCount"))];
	var mobzz = em.getMonster(mobId);

	eim.registerMonster(mobzz);
	diff = eim.getProperty("Global_Level");
	cust = parseInt(eim.getProperty("Global_Customed"));

	custom = em.newMonsterStats();
	custom.setOExp(mobzz.getMobExp() * cust * (Integer(eim.getProperty("Global_mobCount"))+ 1));
	custom.setOHp(mobzz.getMobMaxHp() * cust * (Integer(eim.getProperty("Global_mobCount")) + 1));
	custom.setOMp(mobzz.getMobMaxMp() * cust * ((eim.getProperty("Global_mobCount")) + 1));
	mobzz.setOverrideStats(custom);

	var it = eim.getPlayers().iterator();
	var mobcount = parseInt(eim.getProperty("Global_mobCount"));

	while (it.hasNext())
	{
		var chr = it.next();
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.removeMapEffect());
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.startMapEffect("( "+Number(Number(mobcount) + Number(1))+" / "+mob.length+" ) 회차의 모의 전투를 시작합니다. ", 5120049, true));
		chr.Message(22, "( "+Number(Number(mobcount) + Number(1))+" ) 회차의 모의 전투를 시작합니다. 현재 소환된 몬스터의 체력은 ["+Comma(mobzz.getMobMaxHp())+"] 입니다.");
	}

	eim.getMapFactory().getMap(931050800).spawnMonsterOnGroundBelow(mobzz, new java.awt.Point(3134,577));
}

function scheduledTimeout(eim)
{
	var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
	var it = eim.getPlayers().iterator();

	getMobList(eim);
	var num = parseInt(eim.getProperty("Global_mobCount"));
	if (num < mob.length)
	{
		spawnMob(eim);
		eim.setProperty("Global_mobCount", num + 1);
		
	}
	else
	{
		var inz = eim.getProperty("Global_checkEnd").split("-");

		while (it.hasNext())
		{
			var chr = it.next();
			var end = System.currentTimeMillis() - Long.parseLong(eim.getProperty("Global_Bosstime"));
			var end = new Number(end/1000);
			var end = end.toFixed(0);
			updateRanking(chr.getParty().getLeader().getName(), eim.getProperty("Global_checkStr"), getNow(), eim.getProperty("Global_Level"), end, eim.getProperty("Global_Customed"), getMembers(eim), chr.getParty().getMembers().size())
			chr.Message(22, "모든 회차의 모의 전투를 성공적으로 종료했습니다. 총 소요 시간은 ["+end+"초] 입니다.")
			chr.Message(8, ""+chr.getName()+" 님께서 참여하신 모의 전투가(이) "+inz[1]+"월 "+inz[2]+"일 "+inz[3]+"시 "+inz[4]+"분 클리어 되어 기록이 저장되었습니다.");
			chr.changeMap(exit, exit.getPortal("sp"));
			eim.unregisterAll();
			eim.dispose();
		}
	}
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

function updateRanking(name, bgin, ends, diff, time, rate, pmem, size)
{
	ps = MYSQL.getConnection().prepareStatement("INSERT INTO bossraidtime(name,bgin,ends,diff,time,rate,pmem,size) VALUES(?,?,?,?,?,?,?,?)");
	ps.setString(1, name);
	ps.setString(2, bgin);
	ps.setString(3, ends);
	ps.setString(4, diff);
	ps.setInt(5, time);
	ps.setInt(6, rate);
	ps.setString(7, pmem);
	ps.setInt(8, size);
	ps.executeUpdate();
}

function playerEntry(eim, player)
{
	var map = Integer.parseInt(eim.getProperty("Global_StartMap"));
	player.changeMap(eim.getMapFactory().getMap(map), eim.getMapFactory().getMap(map).getPortal("sp"));
	player.send(UIPacket.AchievementRatio(0));
	eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.startMapEffect("10초 뒤 모의 전투가 시작됩니다. 모든 참가자들은 준비하시기 바랍니다.", 5120049, true));
}

function changedMap(eim, player, mapid)
{	
}

function allMonstersDead(eim)
{
	getMobList(eim);
	eim.restartEventTimer(6000);
	var mobcount = parseInt(eim.getProperty("Global_mobCount"));
	var cust = parseInt(eim.getProperty("Global_Customed"));
	var num = mobcount * (bns + cust) * 5;
	var totalp = parseInt(eim.getProperty("points")) + num;
	var getRatio = new Number(100/mob.length);
	var getRatio = getRatio.toFixed(0);
	if(mobcount < mob.length)
	{
	        eim.getMapFactory().getMap(931050800).broadcastMessage(UIPacket.AchievementRatio(getRatio * mobcount));
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.removeMapEffect());
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.startMapEffect("5초 뒤 모의 전투가 시작됩니다. 모든 참가자들은 준비하시기 바랍니다.", 5120049, true));
		var end = System.currentTimeMillis() - Long.parseLong(eim.getProperty("Global_Bosstime"));
		var end = new Number(end/1000);
		var end = end.toFixed(0);

		var it = eim.getPlayers().iterator();
		while (it.hasNext())
		{
			var chr = it.next();
			chr.setKeyValue2("BossPoint", Number(chr.getKeyValue2("BossPoint")) + Number(totalp));
			chr.Message(22, "( "+mobcount+" ) 회차의 모의 전투가 성공적으로 종료되었습니다. (모의 전투를 시작한지 ["+end+"초]가 지났습니다.)");
			chr.Message(22, "이번 회차 클리어로 "+Comma(totalp)+"점을 얻었습니다. 누적 활동 점수는 ["+Comma(chr.getKeyValue2("BossPoint"))+"점] 입니다.");

		}
	}
	else if(mobcount == mob.length)
	{
	        eim.getMapFactory().getMap(931050800).broadcastMessage(UIPacket.AchievementRatio(100));
		var end = System.currentTimeMillis() - Long.parseLong(eim.getProperty("Global_Bosstime"));
		var end = new Number(end/1000);
		var end = end.toFixed(0);

	        eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.showEffect("monsterPark/clear"));
	        eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.removeMapEffect());
		eim.getMapFactory().getMap(931050800).broadcastMessage(MaplePacketCreator.startMapEffect("모든 회차의 모의 전투가 성공적으로 종료되었습니다.", 5120049, true));
		var it = eim.getPlayers().iterator();
		eim.setProperty("Global_checkEnd", getNow());
		while (it.hasNext())
		{
			var chr = it.next();
			chr.setKeyValue2("BossPoint", Number(chr.getKeyValue2("BossPoint")) + Number(totalp));
			chr.Message(22, "( "+mobcount+" ) 회차의 모의 전투가 성공적으로 종료되었습니다. (모의 전투를 시작한지 ["+end+"초]가 지났습니다.)");
			chr.Message(22, "이번 회차 클리어로 "+Comma(totalp)+"점을 얻었습니다. 누적 활동 점수는 ["+Comma(chr.getKeyValue2("BossPoint"))+"점] 입니다.");

		}
	}
}

function playerDead(eim, player)
{
	return 0;
}

function playerRevive(eim, player)
{	
}

function playerDisconnected(eim, player)
	{
	/* 0 : 모두 나갈때 까지는 인스턴스 유지
	 * 1 ~ : 일정 수준 이상의 사람만 남으면 누가 나가던지 인스턴스 유지
	 * -1 ~ 이하 : 일정 수준 이상의 사람만 남으면 유지이나, 파티장이 나가면 인스턴스 삭제
	 */
	if (eim.getProperty("Global_MinPerson") == null)
	{
	return -1;
	}
	return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}

function monsterValue(eim, mobid)
{
	return 1;
}

function leftParty(eim, player) {
	if (eim.getPlayerCount() < Integer.parseInt(eim.getProperty("Global_MinPerson")))
	{
		var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
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
	var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
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

function clearPQ(eim)
{
	var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_RewardMap")));
	var it = eim.getPlayers().iterator();
	while (it.hasNext())
	{
		var chr = it.next();
		chr.changeMap(exit, exit.getPortal(0));
		chr.message(6, "[알림] 파티퀘스트 인스턴스가 종료되었습니다. 수고하셨습니다 :)");
	}
	eim.unregisterAll();
	if (eim != null)
	{
		eim.dispose();
	}
	
}

function playerExit(eim, player)
{
	var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
	var it = eim.getPlayers().iterator();
	while (it.hasNext())
	{
		var chr = it.next();
		chr.changeMap(exit, exit.getPortal(0));
		chr.Message("파티 퀘스트를 포기하여 더이상 퀘스트를 진행할 수 없습니다.");
	}
	eim.unregisterAll();
	if (eim != null)
	{
		eim.dispose();
	}
}

function onMapLoad(eim, player)
{	
}

function cancelSchedule(a)
{	
}
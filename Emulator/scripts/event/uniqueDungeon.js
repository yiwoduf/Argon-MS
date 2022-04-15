importPackage(Packages.packet.creators);
importPackage(Packages.server.life);
importPackage(java.lang);
importPackage(java.awt);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.launch.world);

function init()
{    
}

function setup(eim)
{
	var a = Randomizer.nextInt();
	while (em.getInstance("MonsterPark_ID"+a) != null)
	{
		a = Randomizer.nextInt();
	}
	var eim = em.newInstance("MonsterPark_ID"+a);
	return eim;
}

function playerEntry(eim, player)
{
	var map = Integer.parseInt(eim.getProperty("Global_StartMap"));
	player.changeMap(eim.getMapFactory().getMap(map), eim.getMapFactory().getMap(map).getPortal("sp")); 
}


function changedMap(eim, player, mapid)
{    
}

function scheduledTimeout(eim)
{
	var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
	var it = eim.getPlayers().iterator();
	while (it.hasNext())
	{
		var chr = it.next();
		if (chr == null)
		{
			System.out.println("ĳ���Ͱ� NULL!");
		}
		if (exit == null)
		{
			System.out.println("EXIT���� NULL!");
		}
		if (exit.getPortal("sp") == null) {
			System.out.println("EXIT�� ��Ż�� NULL!");
		}
		chr.changeMap(exit, exit.getPortal("sp"));
		if(eval(eim.getProperty("totalExp")) < eval(eim.getProperty("achivementExp")))
		{
			chr.Message(8, "����: �ƽ��Ե� �̹����� ��ǥ ����ġ���� ä���� ���߱�. ������ �� ä�� �� �����Ŵ�.");
		}
	}
	if(eval(eim.getProperty("totalExp")) < eval(eim.getProperty("achivementExp")))
	{
		eim.unregisterAll();
	}

	eim.stopEventTimer();
}

function allMonstersDead(eim)
{
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
	if (eim.getProperty("Global_MinPerson") == null)
	{
		return 0;
	}
	return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}

function monsterValue(eim, mobid)
{

	if(mobid != 0)
	{
		eim.setProperty("totalExp", eval(eim.getProperty("totalExp")) + MapleLifeProvider.getMonster(mobid).getMobExp() * eim.getProperty("customTearExp"));

	}

	if(eval(eim.getProperty("totalExp")) > eval(eim.getProperty("achivementExp")))
	{
		if(eim.getProperty("check1st") == 1)
		{
        		eim.getMapFactory().getMap(eim.getProperty("Global_nowMap")).broadcastMessage(MainPacketCreator.showEffect("monsterPark/clearF"));
   			eim.getMapFactory().getMap(eim.getProperty("Global_nowMap")).broadcastMessage(MainPacketCreator.startMapEffect("�ӹ��Ϸ�. ��ǥ ����ġ�� �޼��ߴ�. �ٷ� �����ϰڴ�.", 5120159));
			eim.restartEventTimer(6000);
			eim.setProperty("check1st", "0");
		}

	}
	return mobid;
}


function monsterKilled(eim, player)
{
	if(eval(eim.getProperty("totalExp")) < eval(eim.getProperty("achivementExp")))
	{
		eim.setProperty("check1st", "1");
		eim.getMapFactory().getMap(player.getMapId()).broadcastMessage(MainPacketCreator.startMapEffect("���� ����ġ "+Comma(eim.getProperty("totalExp"))+" / "+Comma(eim.getProperty("achivementExp"))+"", 5120159));
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


function playerExit(eim, player)
{
	var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
	var it = eim.getPlayers().iterator();
	while (it.hasNext())
	{
		var chr = it.next();
		chr.changeMap(exit, exit.getPortal(0));
		chr.Message("��Ƽ ����Ʈ�� �����Ͽ� ���̻� ����Ʈ�� ������ �� �����ϴ�.");
	}
	if(eval(eim.getProperty("totalExp")) < eval(eim.getProperty("achivementExp")))
	{
		eim.unregisterAll();
	}

	if (eim != null)
	{
		eim.dispose();
	}
}

function onMapLoad(eim, player)
{
	if(player.getMapId() != 0)
	{
		eim.setProperty("Global_nowMap", player.getMapId());
	}
}

function cancelSchedule(a)
{    
}
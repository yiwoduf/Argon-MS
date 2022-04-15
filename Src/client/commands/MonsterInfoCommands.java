/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import java.util.Arrays;

import client.MapleClient;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;

public class MonsterInfoCommands implements Command {

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {

	MapleMap map = c.getPlayer().getMap();
	double range = Double.POSITIVE_INFINITY;

	if (splitted.length > 1) {
	    int irange = Integer.parseInt(splitted[1]);
	    if (splitted.length <= 2) {
		range = irange * irange;
	    } else {
		map = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[2]));
	    }
	}
	if (splitted[0].equals("!ų��")) {
	    MapleMonster mob;
	    for (MapleMapObject monstermo : map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER))) {
		mob = (MapleMonster) monstermo;
		map.killMonster(mob, c.getPlayer(), false, false, (byte) 1);
	    }
	} else if (splitted[0].equals("!ų�õ��")) {
	    MapleMonster mob;
	    for (MapleMapObject monstermo : map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER))) {
		mob = (MapleMonster) monstermo;
		map.killMonster(mob, c.getPlayer(), true, false, (byte) 1);
	    }
	} else if (splitted[0].equals("!ų�ó뽺��")) {
	    map.killAllMonsters(false);
	    
	} else if (splitted[0].equals("!���ͼ�ȯ��ü")) {
	    MapleMonster mob;
	    for (MapleMapObject monstermo : map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER))) {
		mob = (MapleMonster) monstermo;
		c.getPlayer().dropMessage(6, "���� " + mob.toString());
	    }
	}
    }

    @Override
    public CommandDefinition[] getDefinition() {
	return new CommandDefinition[]{
		    new CommandDefinition("ų��", "(<����>) (<��ID>)", "��� ���͸� ���Դϴ�. �� ID�� ���ǵ� ���, �������� ���õ˴ϴ�.", 5),
		    new CommandDefinition("ų�ó뽺��", "(<����>) (<��ID>)", "��� ���͸� ���̵�, �ش� ���ʹ� �ٸ����ͷ� ��Ȱ���� �ʽ��ϴ�.", 5),
		    new CommandDefinition("ų�õ��", "(<����>) (<��ID>)", "��� ���͸� ���̵�, �ش� ���ʹ� �����۵� ����ϰ� �˴ϴ�.", 5),
		    new CommandDefinition("���ͼ�ȯ��ü", "", "���� ���� ��� ���͸� ����մϴ�.", 5)
	};
    }
}

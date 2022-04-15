/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import java.util.HashMap;

import server.maps.MaplePortal;
import server.maps.MapleMap;
import client.MapleClient;

public class MapleoCommands implements Command {

    private final HashMap<String, Integer> Mapleomaps = new HashMap<String, Integer>();
    
    public MapleoCommands() {
	Mapleomaps.put("GM��", 180000000);
	Mapleomaps.put("��콺�丮", 60000);
	Mapleomaps.put("���㽺Ʈ", 1010000);
	Mapleomaps.put("��׽ý�", 100000000);
	Mapleomaps.put("�����Ͼ�", 101000000);
	Mapleomaps.put("�丮��", 102000000);
	Mapleomaps.put("Ŀ�׽�Ƽ", 103000000);
	Mapleomaps.put("�����ױ�", 104000000);
	Mapleomaps.put("�����ǿ��", 105000000);
	Mapleomaps.put("�÷θ�����ġ", 110000000);
	Mapleomaps.put("������", 200000000);
	Mapleomaps.put("�ູ�Ǹ���", 209000000);
	Mapleomaps.put("������", 211000000);
	Mapleomaps.put("���긮��", 220000000);
	Mapleomaps.put("����Ƹ���", 230000000);
	Mapleomaps.put("������", 240000000);
	Mapleomaps.put("����", 250000000);
	Mapleomaps.put("���ʸ���", 251000000);
	Mapleomaps.put("������������", 221000000);
	Mapleomaps.put("�Ʒ�����", 222000000);
	Mapleomaps.put("�����Ͼ�", 990000000);
	Mapleomaps.put("�Ǿƴ���", 230040420);
	Mapleomaps.put("ȥ����", 240060200);
	Mapleomaps.put("�׸���", 240020101);
	Mapleomaps.put("����", 240020401);
	Mapleomaps.put("����", 280030000);
	Mapleomaps.put("��Ǯ������", 220080001);
	Mapleomaps.put("�Ƹ���Ʈ", 260000100);
	Mapleomaps.put("��ƿ����", 120000000);
	Mapleomaps.put("������", 130000000);
	Mapleomaps.put("������", 300000000);
	Mapleomaps.put("�ð��ǽ���", 270000000);
	Mapleomaps.put("��ũ��", 270050100);
	Mapleomaps.put("����", 140000000);
        Mapleomaps.put("���췼", 101050000);
	Mapleomaps.put("������Ÿ��", 310000000);
	Mapleomaps.put("��û", 310000001);
    }

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {
	if (splitted.length < 2) {
	    c.getPlayer().dropMessage(6, "����: !�̵� <���̸�>   [!�̵� ��] �� �Է��ϸ� ��밡���� �� ����� �� �� �ֽ��ϴ�.");
	} else {
	    if (Mapleomaps.containsKey(splitted[1])) {
		MapleMap target = c.getChannelServer().getMapFactory().getMap(Mapleomaps.get(splitted[1]));
		MaplePortal targetPortal = target.getPortal(0);
		c.getPlayer().changeMap(target, targetPortal);
	    } else {
		if (splitted[1].equals("��")) {
		    c.getPlayer().dropMessage(6, "��밡���� �� ����� ������ �����ϴ�.");
		    StringBuilder sb = new StringBuilder();
		    for (String s : Mapleomaps.keySet()) {
			sb.append(s + ", ");
		    }
		    c.getPlayer().dropMessage(6, sb.substring(0, sb.length() - 2));
		} else {
		    c.getPlayer().dropMessage(6, "������ �ùٸ��� �ʽ��ϴ�. !�̵� �� �� �Է��ϸ� ��밡���� �� ����� �� �� �ֽ��ϴ�.");
		}
	    }
	}
    }

    @Override
    public CommandDefinition[] getDefinition() {
	return new CommandDefinition[]{
            new CommandDefinition("�̵�", "?", "�Է��� ����/�� ���� �̵��մϴ�.", 1)
        };
    }
}

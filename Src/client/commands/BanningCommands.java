/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import java.text.DateFormat;
import java.util.Calendar;

import client.MapleCharacter;
import client.MapleClient;
import database.MYSQL;
import java.sql.Connection;
import launch.ChannelServer;
import tools.StringUtil;
import java.sql.PreparedStatement;

public class BanningCommands implements Command {

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception {
	ChannelServer cserv = c.getChannelServer();

	if (splitted[0].equals("!��")) {
	    if (splitted.length < 3) {
		return;
	    }
	    final StringBuilder sb = new StringBuilder(c.getPlayer().getName());
	    sb.append(" banned ").append(splitted[1]).append(": ").append(StringUtil.joinStringFrom(splitted, 2));

	    final MapleCharacter target = cserv.getPlayerStorage().getCharacterByName(splitted[1]);

	    if (target != null) {
		sb.append(" (IP: ").append(target.getClient().getIp().split(":")[0]).append(")");
		if (target.ban(sb.toString(), true, false)) {
		    c.getPlayer().dropMessage(6, "���������� �� �Ǿ����ϴ�.");
                    if (c.getPlayer().getKeyValue("Banned_Today") == null) {
                        c.getPlayer().setKeyValue("Banned_Today", "0");
                    }
                    c.getPlayer().setKeyValue("Banned_Today", (Integer.parseInt(c.getPlayer().getKeyValue("Banned_Today"))+1)+"");
		} else {
		    c.getPlayer().dropMessage(6, "�꿡 �����߽��ϴ�.");
		}
	    } else {
		if (MapleCharacter.ban(splitted[1], sb.toString(), false)) {
		    c.getPlayer().dropMessage(6, splitted[1] + " �������� �� ����.");
		} else {
		    c.getPlayer().dropMessage(6, splitted[1] + " �� �� �ϴµ� �����߽��ϴ�.");
		}
	    }

	} else if (splitted[0].equals("!�Ⱓ��")) {
	    final MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
	    final int reason = Integer.parseInt(splitted[2]);
	    final int numDay = Integer.parseInt(splitted[3]);

	    final Calendar cal = Calendar.getInstance();
	    cal.add(Calendar.DATE, numDay);
	    final DateFormat df = DateFormat.getInstance();

	    if (victim == null) {
		c.getPlayer().dropMessage(6, "�ش� ĳ���͸� ã�� �� �����ϴ�.");
		return;
	    }
	    victim.tempban("�Ⱓ �� : " + c.getPlayer().getName() + "", cal, reason, true);
	    c.getPlayer().dropMessage(6, "" + splitted[1] + " ĳ���Ͱ� " + df.format(cal.getTime()) + " ���� ���������� �� �Ǿ����ϴ�.");

	} else if (splitted[0].equals("!��Ǯ��")) {
	    if (splitted.length < 1) {
		c.getPlayer().dropMessage(6, "!��Ǯ�� <ĳ�����̸�>");
	    } else {
		final byte result = c.unban(splitted[1]);
		if (result == -1) {
		    c.getPlayer().dropMessage(6, "�ش� ĳ���͸� �߰����� ���߽��ϴ�.");
		} else if (result == -2) {
		    c.getPlayer().dropMessage(6, "ĳ������ ���� �����ϴµ� ������ �߻��߽��ϴ�.");
		} else {
		    c.getPlayer().dropMessage(6, "ĳ���Ͱ� ���������� ���� �����Ǿ����ϴ�.");
		}
	    }

	} else if (splitted[0].equals("!���Ӳ���")) {
	    int level = 0;
	    MapleCharacter victim;
	    if (splitted[1].charAt(0) == '-') {
		level = StringUtil.countCharacters(splitted[1], 'f');
		victim = cserv.getPlayerStorage().getCharacterByName(splitted[2]);
	    } else {
		victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
	    }
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid WHERE id = ?");
                ps.setInt(1, victim.getId());
                con.close();
            } catch (Exception e) {

            }
	    if (level < 2) {
		victim.getClient().getSession().close();
		if (level >= 1) {
		    victim.getClient().disconnect(true, false);
		}
	    } else {
		c.getPlayer().dropMessage(6, "Please use dc -f instead.");
	    }
	}
    }

    @Override
    public CommandDefinition[] getDefinition() {
	return new CommandDefinition[]{
		    new CommandDefinition("��", "<ĳ�����̸�> <����>", "�ش� ip�� mac�ּ�, ������ ���������� �� ��ŵ�ϴ�.", 3),
                    new CommandDefinition("��Ǯ��", "<ĳ�����̸�>", "�� �� ip�� mac�ּ�, ������ ���� �����մϴ�.", 3),
		    new CommandDefinition("�Ⱓ��", "<ĳ�����̸�> <����> <�� �� �ϼ�>", "�ش� ������ �ش� �� �� ���� �� ��ŵ�ϴ�.", 3),
		    new CommandDefinition("���Ӳ���", "[-f] <ĳ�����̸�>", "�ش� ĳ���͸� ������ ���������ŵ�ϴ�. �������ɷȴٸ� -f �ɼ��� ����ϼ���.", 3)
	};
    }
}

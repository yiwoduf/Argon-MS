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
import java.util.List;

import client.MapleCharacter;
import client.MapleClient;
import constants.ServerConstants;
import launch.ChannelServer;
import server.maps.MaplePortal;
import server.maps.MapleMap;
import server.maps.MapleMapObjectType;
import server.maps.MapleMapObject;
import server.maps.MapleReactor;
import server.maps.MapleReactorFactory;
import server.maps.MapleReactorStats;
import server.quest.MapleQuest;
import packet.creators.MainPacketCreator;
import server.life.MapleNPC;
import server.life.MaplePlayerNPC;

public class DebugCommands implements Command {

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        MapleCharacter player = c.getPlayer();

        if (splitted[0].equals("!����Ʈ�ʱ�ȭ")) {
            MapleQuest.getInstance(Integer.parseInt(splitted[1])).forfeit(c.getPlayer());
        } else if (splitted[0].equals("!�������Ż")) {
            final MaplePortal portal = player.getMap().findClosestSpawnpoint(player.getPosition());
            c.getPlayer().dropMessage(6, portal.getName() + " ��Ż���̵�: " + portal.getId() + " ��ũ��Ʈ: " + portal.getScriptName());
        } else if (splitted[0].equals("!��ȯ��ü")) {
            c.getPlayer().dropMessage(6, c.getPlayer().getMap().spawnDebug());
        } else if (splitted[0].equals("!������")) {
            Thread[] threads = new Thread[Thread.activeCount()];
            Thread.enumerate(threads);
            String filter = "";
            if (splitted.length > 1) {
                filter = splitted[1];
            }
            for (int i = 0; i < threads.length; i++) {
                String tstring = threads[i].toString();
                if (tstring.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                    c.getPlayer().dropMessage(6, i + ": " + tstring);
                }
            }
        } else if (splitted[0].equals("!�������")) {
            if (splitted.length < 1) {
                throw new IllegalCommandSyntaxException(1);
            }
            Thread[] threads = new Thread[Thread.activeCount()];
            Thread.enumerate(threads);
            Thread t = threads[Integer.parseInt(splitted[1])];
            c.getPlayer().dropMessage(6, t.toString() + ":");
            for (StackTraceElement elem : t.getStackTrace()) {
                c.getPlayer().dropMessage(6, elem.toString());
            }
        } else if (splitted[0].equals("!����")) {
            c.getSession().writeAndFlush(MainPacketCreator.getPlayerInfo(player));
            player.getMap().removePlayer(player);
            player.getMap().addPlayer(player);
        } else if (splitted[0].equals("!������")) {
            player.getMap().toggleDrops();
        } else if (splitted[0].equals("!Ȯ�������")) {
            ChannelServer.allToggleMegaphoneMuteState();
            c.getPlayer().dropMessage(6, "Ȯ���� ��밡�� ���� : " + (c.getChannelServer().getMegaphoneMuteState() ? "�Ұ���" : "����"));
        } else if (splitted[0].equalsIgnoreCase("!�����ͼ�ȯ")) {
            MapleReactorStats reactorSt = MapleReactorFactory.getReactor(Integer.parseInt(splitted[1]));
            MapleReactor reactor = new MapleReactor(reactorSt, Integer.parseInt(splitted[1]));
            reactor.setDelay(-1);
            reactor.setPosition(c.getPlayer().getPosition());
            c.getPlayer().getMap().spawnReactor(reactor);
        } else if (splitted[0].equals("!������ġ��")) {
            c.getPlayer().getMap().getReactorByOid(Integer.parseInt(splitted[1])).hitReactor(c);
        } else if (splitted[0].equals("!�����͸��") || splitted[0].equals("!����ʸ�����")) {
            MapleMap map = c.getPlayer().getMap();
            List<MapleMapObject> reactors = map.getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
            for (MapleMapObject reactorL : reactors) {
                MapleReactor reactor2l = (MapleReactor) reactorL;
                c.getPlayer().dropMessage(6, "������: ������Ʈid: " + reactor2l.getObjectId() + " ������ID: " + reactor2l.getReactorId() + " ��ġ: " + reactor2l.getPosition().toString() + " ����: " + reactor2l.getState());
            }
        } else if (splitted[0].equals("!�������ı�")) {
            MapleMap map = c.getPlayer().getMap();
            List<MapleMapObject> reactors = map.getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
            if (splitted[1].equals("���")) {
                for (MapleMapObject reactorL : reactors) {
                    MapleReactor reactor2l = (MapleReactor) reactorL;
                    c.getPlayer().getMap().destroyReactor(reactor2l.getObjectId());
                }
            } else {
                c.getPlayer().getMap().destroyReactor(Integer.parseInt(splitted[1]));
            }
        } else if (splitted[0].equals("!�������ʱ�ȭ")) {
            c.getPlayer().getMap().resetReactors(c);
        } else if (splitted[0].equals("!�����ͼ���")) {
            c.getPlayer().getMap().setReactorState(c);
        } else if (splitted[0].equals("!��ӻ���")) {
            List<MapleMapObject> items = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
            for (MapleMapObject i : items) {
                c.getPlayer().getMap().removeMapObject(i);
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeItemFromMap(i.getObjectId(), 0, 0), i.getPosition());
            }
        } else if (splitted[0].equals("!����ġ����")) {
            if (splitted.length > 1) {
                final int rate = Integer.parseInt(splitted[1]);
                c.getChannelServer().setExpRate(rate);
                c.getPlayer().dropMessage(6, "����ġ ������ " + rate + "x ��� �����Ǿ����ϴ�.");
            } else {
                c.getPlayer().dropMessage(6, "����: !����ġ���� <����>");
            }
        } else if (splitted[0].equals("!��ӹ���")) {
            if (splitted.length > 1) {
                final int rate = Integer.parseInt(splitted[1]);
                c.getChannelServer().setDropRate(rate);
                c.getPlayer().dropMessage(6, "��� ������ " + rate + "x ��� �����Ǿ����ϴ�.");
            } else {
                c.getPlayer().dropMessage(6, "����: !��ӹ��� <����>");
            }
        } else if (splitted[0].equals("!���ƨ")) {
            ServerConstants.isShutdown = true;
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                cs.getPlayerStorage().disconnectAll();
            }
        } else if (splitted[0].equals("!����ʿ��ǽ�")) {
            MapleMap map = c.getPlayer().getMap();
            c.getPlayer().Message("���� �� : " + map.getId() + " - " + map.getStreetName() + " : " + map.getMapName());
            for (MapleMapObject mo : map.getAllNPC()) {
                c.getPlayer().Message(7, ((MapleNPC) mo).getId() + " : " + ((MapleNPC) mo).getName());
            }
        } else if (splitted[0].equals("!�������Ż")) {
            MapleMap map = c.getPlayer().getMap();
            c.getPlayer().Message("���� �� : " + map.getId() + " - " + map.getStreetName() + " : " + map.getMapName());
            for (MaplePortal mp : map.getPortals()) {
                c.getPlayer().Message(7, mp.getId() + " : " + mp.getName() + " ��ũ��Ʈ : " + mp.getScriptName() + " ������ : " + mp.getTarget());
            }
        } else if (splitted[0].equals("!������÷��̾�")) {
            MapleMap map = c.getPlayer().getMap();
            c.getPlayer().Message("���� �� : " + map.getId() + " - " + map.getStreetName() + " : " + map.getMapName());
            for (MapleMapObject pr : map.getAllPlayer()) {
                c.getPlayer().Message(7, ((MapleCharacter) pr).getName());
            }
        } else if (splitted[0].equals("!��ġ")) {
            int d = Integer.parseInt(splitted[1]);
            c.getPlayer().addInnerExp(d);
            c.getPlayer().message(5, "��ġ�� " + d + " ����߽��ϴ�.");
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("���ƨ", "", "���� ä���� ��� �÷��̾ ������ ���������մϴ�.", 6),
            new CommandDefinition("��ӻ���", "", "���� ���� ��� �������� �����մϴ�.", 4),
            new CommandDefinition("����Ʈ�ʱ�ȭ", "", "���� �޾��ִ� ����Ʈ�� ��� ���������ϴ�.", 2),
            new CommandDefinition("�������Ż", "", "���� ������ �ִ� ��Ż�� ����մϴ�.", 2),
            new CommandDefinition("��ȯ��ü", "", "���� ��ȯ�� ��ü�� ����մϴ�.", 5),
            new CommandDefinition("Ȯ�������", "", "��� ä���� Ȯ���� ��밡�� ���¸� �����մϴ�.", 5),
            new CommandDefinition("������", "", "Ȱ��ȭ�� �����带 ����մϴ�.", 6),
            new CommandDefinition("�������", "<������ѹ�>", "�ش� �����尡 ��� ��� ���۵Ǿ������� �����մϴ�.", 6),
            new CommandDefinition("����", "", "ĳ���� ���� ��Ŷ�� �����մϴ�.", 6),
            new CommandDefinition("������", "", "���� �ʿ��� ������ ��Ӱ��ɻ��¸� �����մϴ�.", 2),
            new CommandDefinition("�����ͼ�ȯ", "<������ID>", "�Է��� ID�� �����͸� ��ȯ�մϴ�.", 4),
            new CommandDefinition("������ġ��", "<�����Ϳ�����ƮID>", "�Է��� ID�� �����͸� Ĩ�ϴ�.", 4),
            new CommandDefinition("�������ʱ�ȭ", "", "��� �������� ���¸� 0���� ����ϴ�.", 4),
            new CommandDefinition("�����͸��", "", "���� ���� ��� �����͸� ����մϴ�.", 4),
            new CommandDefinition("����ʸ�����", "", "���� ���� ��� �����͸� ����մϴ�.", 4),
            new CommandDefinition("������÷��̾�", "", "���� ���� ��� �÷��̾ ����մϴ�.", 4),
            new CommandDefinition("�������ı�", "<�����Ϳ�����ƮID>", "�ش� ID�� �����͸� �ı��մϴ�.", 4),
            new CommandDefinition("�����ͼ���", "<�����Ϳ�����ƮID> <����>", "�ش� ID�� �������� ���¸� �����մϴ�.", 4),
            new CommandDefinition("����ġ����", "<����>", "���� ä���� ����ġ ������ �����մϴ�.", 6),
            new CommandDefinition("��ӹ���", "<����>", "���� ä���� ��� ������ �����մϴ�.", 6),
            new CommandDefinition("����ʿ��ǽ�", "", "����ʿ� �ִ� ���ǽ��� ����� ��� ����մϴ�.", 1),
            new CommandDefinition("�������Ż", "", "����ʿ� �ִ� ��Ż�� ����� ��� ����մϴ�.", 1),
            new CommandDefinition("��ġ", "", "��ġ �ø�", 5)
        };
    }
}

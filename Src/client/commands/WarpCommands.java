/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */
package client.commands;

import constants.ServerConstants;
import client.MapleClient;
import client.MapleCharacter;
import client.stats.BuffStats;
import community.MapleMultiChatCharacter;
import community.MapleUserTrade;
import launch.ChannelServer;
import launch.helpers.ChracterTransfer;
import launch.holder.MapleWhereAreYou;
import launch.world.WorldCommunity;
import launch.world.WorldConnected;
import packet.creators.MainPacketCreator;
import server.maps.MapleMap;
import server.maps.MaplePortal;
import server.shops.IMapleCharacterShop;

public class WarpCommands implements Command {

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!����")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim != null) {
                c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestSpawnpoint(victim.getPosition()));
            } else {
                MapleCharacter chr = null;
                for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
                    chr = cserv_.getPlayerStorage().getCharacterByName(splitted[1]);
                    if (chr != null) {
                        break;
                    }
                }
                if (chr != null) {
                    MapleWhereAreYou loc = WorldConnected.getLocation(splitted[1]);
                    c.getPlayer().dropMessage(6, "ä���� �����Ͽ� �����մϴ�. ��ø� ��ٷ��ּ���.");
                    c.getPlayer().crossChannelWarp(c, loc.map, (byte) loc.channel);
                } else {
                    c.getPlayer().dropMessage(6, "��� �÷��̾ �߰����� ���߽��ϴ�.");
                }
            }
        } else if (splitted[0].equals("!��ȯ")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim != null) {
                victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().findClosestSpawnpoint(c.getPlayer().getPosition()));
            } else {
                MapleCharacter chr = null;
                for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
                    chr = cserv_.getPlayerStorage().getCharacterByName(splitted[1]);
                    if (chr != null) {
                        break;
                    }
                }
                if (chr != null) {
                    MapleWhereAreYou loc = WorldConnected.getLocation(c.getPlayer().getName());
                    chr.dropMessage(6, "ä���� �����Ͽ� ��ȯ�˴ϴ�.");
                    chr.crossChannelWarp(chr.getClient(), loc.map, (byte) loc.channel);
                } else {
                    c.getPlayer().dropMessage(6, "��� �÷��̾ �߰����� ���߽��ϴ�.");
                }
            }
        } else if (splitted[0].equals("!��ü��ȯ")) {
            for (MapleCharacter victim : cserv.getPlayerStorage().getAllCharacters().values()) {
                if (victim.getMapId() != c.getPlayer().getMapId()) {
                    victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getPosition());
                } else {
                    MapleCharacter chr = null;
                    for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
                        chr = cserv_.getPlayerStorage().getAllCharacters().get(chr);
                        if (chr != null) {
                            break;
                        }
                    }
                    if (chr != null) {
                        MapleWhereAreYou loc = WorldConnected.getLocation(c.getPlayer().getName());
                        chr.dropMessage(6, "ä���� �����Ͽ� ��ȯ�˴ϴ�.");
                        chr.crossChannelWarp(chr.getClient(), loc.map, (byte) loc.channel);
                    }
                    chr.dropMessage(6, "��ü��ȯ �Ǿ����ϴ�.");
                }
            }
        } else if (splitted[0].equals("!��")) {
            MapleMap target = null;
            if (c.getPlayer().getEventInstance() != null) {
                target = c.getPlayer().getEventInstance().getMapFactory().getMap(Integer.parseInt(splitted[1]));
            } else {
                target = cserv.getMapFactory().getMap(Integer.parseInt(splitted[1]));
            }

            MaplePortal targetPortal = null;
            if (splitted.length > 2) {
                try {
                    targetPortal = target.getPortal(Integer.parseInt(splitted[2]));
                } catch (IndexOutOfBoundsException e) {
                    // noop, assume the gm didn't know how many portals there are
                    c.getPlayer().dropMessage(5, "Invalid portal selected.");
                } catch (NumberFormatException a) {
                    // noop, assume that the gm is drunk
                }
            }
            if (targetPortal == null) {
                targetPortal = target.getPortal(0);
            }
            c.getPlayer().changeMap(target, targetPortal);
            /* ġ�쾾 :: English Translated GM Command Starts here */
        } else if (splitted[0].equals("!map")) {
            MapleMap target = null;
            if (c.getPlayer().getEventInstance() != null) {
                target = c.getPlayer().getEventInstance().getMapFactory().getMap(Integer.parseInt(splitted[1]));
            } else {
                target = cserv.getMapFactory().getMap(Integer.parseInt(splitted[1]));
            }

            MaplePortal targetPortal = null;
            if (splitted.length > 2) {
                try {
                    targetPortal = target.getPortal(Integer.parseInt(splitted[2]));
                } catch (IndexOutOfBoundsException e) {
                    // noop, assume the gm didn't know how many portals there are
                    c.getPlayer().dropMessage(5, "Invalid portal selected.");
                } catch (NumberFormatException a) {
                    // noop, assume that the gm is drunk
                }
            }
            if (targetPortal == null) {
                targetPortal = target.getPortal(0);
            }
            c.getPlayer().changeMap(target, targetPortal);
        }

    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("����", "<�÷��̾��̸�> (<Ÿ�ٸ�ID>)", "�ڽ��� �ش� �÷��̾�� �����մϴ�. �� ID�� �Էµ� ��� �Է��� �÷��̾ �ش� ������ �̵���ŵ�ϴ�.", 2),
            new CommandDefinition("��ȯ", "<�÷��̾��̸�>", "�ش� �÷��̾ �ڽ��� ��ġ�� ��ȯ�մϴ�.", 2),
            new CommandDefinition("��ü��ȯ", "<��ü��ȯ>", "��������� �ڽ��� ��ġ�� ��ȯ�մϴ�.", 2),
            new CommandDefinition("��", "<��ID>", "�ش� ��ID�� ������ �̵��մϴ�.", 2),
            new CommandDefinition("map", "<MapID>", "Move to input Map ID.", 2),};
    }
}

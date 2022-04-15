/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package handler.channel;

import client.MapleClient;
import client.MapleCharacter;
import client.commands.CommandProcessor;
import client.items.Equip;
import client.items.MapleInventoryType;
import community.MapleMultiChat;
import community.MapleMultiChatCharacter;
import constants.ServerConstants;
import constants.programs.ControlUnit;
import handler.admin.AdminToolPacket;
import launch.CashShopServer;
import launch.ChannelServer;
import launch.world.WorldBroadcasting;
import launch.world.WorldCommunity;
import packet.creators.MainPacketCreator;
import packet.transfer.read.ReadingMaple;
import java.util.Collection;
import launch.AdminToolServer;
import packet.creators.UIPacket;
import server.items.ItemInformation;
import tools.LoggerChatting;

public class ChatHandler {

    public static void GeneralChat(String text, byte unk, MapleClient c, MapleCharacter chr) {

        if (!CommandProcessor.getInstance().processCommand(c, text)) {
            if (!chr.isGM() && text.length() >= 80) {
                return;
            }
            if (WorldCommunity.isFreeze) {
                chr.dropMessage(1, "채팅이 얼려져있는 상태이므로\r\n채팅을 할 수 없습니다.");
                return;
            }
            if (chr.getChatban().equals("true")) {
                chr.dropMessage(1, "채팅 금지 상태에선 채팅을 할 수 없습니다.");
                return;
            }
            if (text.charAt(0) == '~') {
                if (chr.getMeso() < 0) {
                    chr.dropMessage(1, "30000메소가 없어 전체채팅을 사용할 수 없습니다.");
                    return;
                } else {
                    if (ServerConstants.chatlimit >= 500) {
                        ServerConstants.chatlimit = 0;
                        ControlUnit.ChatList.clear();
                        ControlUnit.Chat.setModel(ControlUnit.ChatList);
                    }
                    ServerConstants.chatlimit++;
                    //chr.gainMeso(-30000, false);
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(text.substring(1));
                    if (c.getPlayer().haveItem(1142113, 1, true, false)) {
                        WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(1, sb.toString()));
                        AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[전체]" + c.getPlayer().getName() + " : " + text.substring(1).toString()));
                    } else if (c.getPlayer().haveItem(1143000, 1, true, false)) {
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(9, "[보스왕] " + chr.getName() + ":: " + text.replaceAll("~", "")));
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("<보스왕> [" + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                    } else if (c.getPlayer().haveItem(1142558, 1, true, false)) {
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(27, "[환생왕] " + chr.getName() + ":: " + text.replaceAll("~", "")));
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("<환생왕> [" + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                    } else if (c.getPlayer().haveItem(1142588, 1, true, false)) {
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(12, "【 천재치우 】" + chr.getName() + ":: " + text.replaceAll("~", "")));
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("<치우> [" + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                    
                    } else {
                        WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(21, sb.toString()));
                        AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[전체]" + c.getPlayer().getName() + " : " + text.substring(1).toString()));
                    }
                    ControlUnit.ChatList.addElement("[전체]" + c.getPlayer().getName() + " : " + text.substring(1).toString());
                    ControlUnit.Chat.setModel(ControlUnit.ChatList);
                }
            } else {
                if (ServerConstants.chatlimit >= 500) {
                    ServerConstants.chatlimit = 0;
                    ControlUnit.ChatList.clear();
                    ControlUnit.Chat.setModel(ControlUnit.ChatList);
                }
                ServerConstants.chatlimit++;

                StringBuilder sb = new StringBuilder();
                InventoryHandler.addMedalString(c.getPlayer(), sb);
                sb.append(text.substring(0));
                
                AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[일반][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                chr.getMap().broadcastMessage(MainPacketCreator.getChatText(chr.getId(), text, c.getPlayer().isGM(), unk), c.getPlayer().getPosition());
                
                ControlUnit.ChatList.addElement("[일반][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text);
                ControlUnit.Chat.setModel(ControlUnit.ChatList);
            }
            LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("일반 채팅 : ", chr, text));
        }
    }

    public static void Others(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        int type = rh.readByte();
        byte numRecipients = rh.readByte();
        int recipients[] = new int[numRecipients];

        for (byte i = 0; i < numRecipients; i++) {
            recipients[i] = rh.readInt();
        }
        String chattext = rh.readMapleAsciiString();
        if (!CommandProcessor.getInstance().processCommand(c, chattext)) {
            switch (type) {
                case 0:
                    ServerConstants.chatlimit++;
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[친구][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + chattext));
                    WorldCommunity.buddyChat(recipients, chr.getId(), chr.getName(), chattext);
                    LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("친구 : ", chr, chattext));
                    break;
                case 1:
                    ServerConstants.chatlimit++;
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[파티][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + chattext));
                    WorldCommunity.partyChat(chr.getParty(), chattext, chr.getName());
                    LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("파티 : ", chr, chattext));
                    break;
                case 2:
                    ServerConstants.chatlimit++;
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[길드][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + chattext));
                    ChannelServer.guildChat(chr.getGuildId(), chr.getName(), chr.getId(), chattext);
                    LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("길드 : ", chr, chattext));
                    break;
                case 3:
                    ServerConstants.chatlimit++;
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[연합][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + chattext));
                    WorldCommunity.allianceChat(chr.getGuildId(), chr.getName(), chr.getId(), chattext);
                    LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("연합 : ", chr, chattext));
                    break;
                case 4: //원정대 채팅
                    ServerConstants.chatlimit++;
                    AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[원정대][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + chattext));
                    chr.getParty().getExpedition().broadcastMessage(chr, MainPacketCreator.multiChat(chr.getName(), chattext, 4));
                    LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("원정대 : ", chr, chattext));
                    break;

            }
        }
    }

    public static void Messenger(ReadingMaple slea, MapleClient c) {
        String name;
        String input;
        MapleMultiChat messenger = c.getPlayer().getMessenger();

        switch (slea.readByte()) {
            case 0x00: // open
                if (messenger == null) {
                    slea.skip(1);
                    byte player = slea.readByte();
                    int messengerid = slea.readInt();
                    if (messengerid == 0) { // create
                        MapleMultiChatCharacter messengerplayer = new MapleMultiChatCharacter(c.getPlayer());
                        messenger = WorldCommunity.createMessenger(messengerplayer);
                        c.getPlayer().setMessenger(messenger);
                        c.getPlayer().setMessengerPosition(0);
                    } else { // join
                        messenger = WorldCommunity.getMessenger(messengerid);
                        int position = messenger.getLowestPosition();
                        MapleMultiChatCharacter messengerplayer = new MapleMultiChatCharacter(c.getPlayer(), position);
                        messenger.addMember(messengerplayer);
                        if (messenger != null) {
                            if (messenger.getMembers().size() < player) {
                                c.getPlayer().setMessenger(messenger);
                                c.getPlayer().setMessengerPosition(position);
                                WorldCommunity.joinMessenger(messenger.getId(), messengerplayer, c.getPlayer().getName(), messengerplayer.getChannel());
                            } else {
                                c.getPlayer().dropMessage(5, "이미 해당 메신저는 최대 인원 입니다.");
                            }
                        }
                    }
                } else {
                    c.getPlayer().dropMessage(1, "이미 닫힌 방입니다.");
                }
                break;
            case 0x02: // exit
                if (messenger != null) {
                    MapleMultiChatCharacter messengerplayer = new MapleMultiChatCharacter(c.getPlayer());
                    WorldCommunity.leaveMessenger(messenger.getId(), messengerplayer);
                    c.getPlayer().setMessenger(null);
                    c.getPlayer().setMessengerPosition(4);
                }
                break;
            case 0x03: { // invite
                if (messenger.getMembers().size() < 6) {
                    input = slea.readMapleAsciiString();
                    MapleCharacter target = null;
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        target = cserv.getPlayerStorage().getCharacterByName(input);
                        if (target != null) {
                            break;
                        }
                    }
                    if (target != null) {
                        if (target.getMessenger() == null) {
                            if (!c.getPlayer().isGM() && target.isGM()) {
                                c.getSession().writeAndFlush(MainPacketCreator.messengerNote(input, 4, 0));
                                return;
                            }
                            target.getClient().getSession().writeAndFlush(MainPacketCreator.messengerInvite(c.getPlayer().getName(), messenger.getId()));
                            c.getSession().writeAndFlush(MainPacketCreator.messengerNote(input, 4, 1));
                        } else {
                            c.getSession().writeAndFlush(MainPacketCreator.messengerChat(c.getPlayer().getName(), c.getPlayer().getName() + " : " + input + " 님은 이미 메신저를 사용하는 중입니다."));
                        }
                    } else {
                        c.getSession().writeAndFlush(MainPacketCreator.messengerNote(input, 4, 0));
                    }
                    break;
                }
            }
            case 0x05: // decline
                String targeted = slea.readMapleAsciiString();
                MapleCharacter target = null;
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    target = cserv.getPlayerStorage().getCharacterByName(targeted);
                    if (target != null) {
                        break;
                    }
                }
                if (target != null) {
                    if (target.getMessenger() != null) {
                        target.getClient().getSession().writeAndFlush(MainPacketCreator.messengerNote(c.getPlayer().getName(), 5, 0));
                    }
                }
                break;
            case 0x06: // message
                if (messenger != null) {
                    name = slea.readMapleAsciiString();
                    input = slea.readMapleAsciiString();
                    WorldCommunity.messengerChat(messenger.getId(), input, name);
                }
                break;
        }
    }

    public static void Whisper_Find(ReadingMaple rh, MapleClient c) {
        byte mode = rh.readByte();
        rh.skip(4); //Unknown Packet.
        boolean friend = false;
        switch (mode) {
            case 0x44: //친구 목록에서 클릭
                friend = true;
            case 5: {//찾기
                String recipient = rh.readMapleAsciiString();
                MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
                if (player != null) {
                    if (!player.isGM() || (c.getPlayer().isGM() && player.isGM())) {
                        if (CashShopServer.getInstance().isCharacterInCS(recipient)) {
                            c.getSession().writeAndFlush(MainPacketCreator.getFindReplyWithCS(recipient, friend));
                        } else {
                            c.getSession().writeAndFlush(MainPacketCreator.getFindReplyWithMap(recipient, friend, player.getMap().getId()));
                        }
                    } else {
                        c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 0));
                    }
                } else {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        player = cserv.getPlayerStorage().getCharacterByName(recipient);
                        if (player != null) {
                            break;
                        }
                    }
                    if (CashShopServer.getInstance().getPlayerStorage().isCharacterConnected(recipient)) {
                        c.getSession().writeAndFlush(MainPacketCreator.getFindReplyWithCS(recipient, friend));
                        return;
                    } else if (player != null) {
                        c.send(MainPacketCreator.getFindReply(recipient, friend, player.getClient().getChannel()));
                    } else {
                        c.send(MainPacketCreator.getWhisperReply(recipient, (byte) 0));
                    }
                }
                break;
            }
            case 6: { // Whisper
                String recipient = rh.readMapleAsciiString();
                String text = rh.readMapleAsciiString();
                ServerConstants.chatlimit++;
                AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[귓속말][Ch." + c.getChannel() + "]" + c.getPlayer().getName() + " : " + text));
                if (!CommandProcessor.getInstance().processCommand(c, text)) {
                    MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
                    if (player != null) {
                        if (player.isGM() && !c.getPlayer().isGM()) {
                            c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 0));
                        } else {
                            player.getClient().getSession().writeAndFlush(MainPacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
                            c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 1));
                            LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("귓", c.getPlayer(), "[대상 : " + player.getName() + "] : " + text));
                        }
                    } else { // Not found
                        Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
                        for (ChannelServer cserv : cservs) {
                            player = cserv.getPlayerStorage().getCharacterByName(recipient);
                            if (player != null) {
                                break;
                            }
                        }
                        if (player != null) {
                            if (!c.getPlayer().isGM() && player.isGM()) {
                                c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 0));
                            } else {
                                player.getClient().getSession().writeAndFlush(MainPacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
                                LoggerChatting.writeLog(LoggerChatting.chatLog, LoggerChatting.getChatLogType("귓", c.getPlayer(), "[대상 : " + player.getName() + "] : " + text));
                                c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 1));
                            }
                        } else {
                            c.getSession().writeAndFlush(MainPacketCreator.getWhisperReply(recipient, (byte) 0));
                        }
                    }
                }
                break;
            }
        }
    }
}

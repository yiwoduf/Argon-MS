/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler.chat;

import client.MapleCharacter;
import client.MapleChatClient;
import handler.admin.AdminToolPacket;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import launch.AdminToolServer;
import launch.ChannelServer;
import packet.chat.creator.ChatPacket;

/**
 *
 * @author SEUNGHYEON
 */
public class ChatHandler {

    public static Map<Integer, MapleChatClient> session = new HashMap<>();
    private static final Lock mutex = new ReentrantLock();

    public final static void registerMCC(final MapleChatClient mc) {
        mutex.lock();
        try {
            session.put(mc.getSenderAID(), mc);
        } finally {
            mutex.unlock();
        }
    }

    public final static void removeMCC(final MapleChatClient mc) {
        mutex.lock();
        try {
            session.remove(mc.getSenderAID());
        } finally {
            mutex.unlock();
        }
    }

    public final static MapleChatClient getMCC(final int cid) {
        mutex.lock();
        try {
            if (session.containsKey(cid)) {
                return session.get(cid);
            } else {
                return null;
            }
        } finally {
            mutex.unlock();
        }
    }

    public final static void buddyChat(final MapleChatClient mc, final String text, final int cid) {
        for (MapleChatClient mcc : session.values()) {
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                final MapleCharacter chr = cs.getPlayerStorage().getCharacterById(mcc.getSenderCID());
                if (chr != null) {
                    if (chr.getBuddylist().containsVisible(cid) || chr.getId() == cid) {
                        mcc.sendPacket(ChatPacket.OnFriendChatMessage(mc, text));
                        if (chr.getId() == cid) {
                            AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[ģ��][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                        }
                    }
                }
            }
        }

    }

    public final static void guildChat(final MapleChatClient mc, final String text, final int gid) {
        for (MapleChatClient mcc : session.values()) {
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                final MapleCharacter chr = cs.getPlayerStorage().getCharacterById(mcc.getSenderCID());
                if (chr != null) {
                    if (chr.getGuild() != null) {
                        if (chr.getGuild().getId() == gid) {
                            mcc.sendPacket(ChatPacket.OnGuildChatMessage(mc, text));
                            if (chr.getId() == mc.getSenderCID()) {
                                AdminToolServer.broadcastMessage(AdminToolPacket.sendChatText("[ģ��][Ch." + chr.getClient().getChannel() + "]" + chr.getName() + " : " + text));
                            }
                        }
                    }
                }
            }
        }
    }
}

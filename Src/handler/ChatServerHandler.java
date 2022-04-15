/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler;

import client.MapleChatClient;
import constants.ServerConstants;
import handler.chat.ChatHandler;
import handler.chat.ChatPacketDecoder;
import handler.mina.MaplePacketDecoder;
import launch.Start;
import org.apache.mina.common.IdleStatus;
import org.apache.mina.common.IoHandlerAdapter;
import org.apache.mina.common.IoSession;
import packet.chat.creator.ChatPacket;
import packet.chat.opcode.ChatRecvPacketOpcode;
import packet.creators.LoginPacket;
import packet.crypto.MapleCrypto;
import packet.transfer.read.ByteStream;
import packet.transfer.read.ReadingMaple;
import tools.HexTool;
import tools.RandomStream.Randomizer;

/**
 *
 * @author SEUNGHYEON
 */
public class ChatServerHandler extends IoHandlerAdapter {

    @Override
    public void exceptionCaught(final IoSession session, final Throwable cause) throws Exception {

    }

    @Override
    public void sessionOpened(final IoSession session) throws Exception {
        final String address = session.getRemoteAddress().toString().split(":")[0];
        Start.println("[ARGON] " + address + " has connected to chatting server.", 37);
        final byte serverRecv[] = {(byte) 0x22, (byte) 0x3F, (byte) 0x37, (byte) Randomizer.nextInt(255)};
        final byte serverSend[] = {(byte) 0xC9, (byte) 0x3A, (byte) 0x27, (byte) Randomizer.nextInt(255)};
        final byte ivRecv[] = serverRecv;
        final byte ivSend[] = serverSend;
        final MapleChatClient client = new MapleChatClient(
                session,
                new MapleCrypto(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)), // Sent Cypher
                new MapleCrypto(ivRecv, ServerConstants.MAPLE_VERSION));
        ChatPacketDecoder.DecoderState decoderState = new ChatPacketDecoder.DecoderState();
        session.setAttribute(ChatPacketDecoder.DECODER_STATE_KEY, decoderState);

        session.write(LoginPacket.initializeConnection(ServerConstants.MAPLE_VERSION, ivSend, ivRecv, false));
        session.setAttribute(MapleChatClient.MCCKEY, client);
        session.setIdleTime(IdleStatus.READER_IDLE, 60);
        session.setIdleTime(IdleStatus.WRITER_IDLE, 60);
        session.write(ChatPacket.LoginResult((byte) 0));
        session.write(ChatPacket.AliveReq());
    }

    @Override
    public void sessionClosed(final IoSession session) throws Exception {
        final MapleChatClient client = (MapleChatClient) session.getAttribute(MapleChatClient.MCCKEY);
        try {
            ChatHandler.removeMCC(client);
        } finally {
            session.close();
            session.removeAttribute(MapleChatClient.MCCKEY);
        }
        super.sessionClosed(session);
    }

    @Override
    public void sessionIdle(final IoSession session, final IdleStatus status) throws Exception {
        final MapleChatClient client = (MapleChatClient) session.getAttribute(MapleChatClient.MCCKEY);
        if (client != null) {
            //client.sendPing();
        }
        super.sessionIdle(session, status);
    }

    @Override
    public void messageReceived(final IoSession session, final Object message) {
        if (message == null || session == null) {
            return;
        }
        final ReadingMaple slea = new ReadingMaple(new ByteStream((byte[]) message));
        if (slea.available() < 2) {
            return;
        }
        final MapleChatClient c = (MapleChatClient) session.getAttribute(MapleChatClient.MCCKEY);
        final short header_num = slea.readShort();
        if (ServerConstants.showPackets) {
            final StringBuilder sb = new StringBuilder("Received data :\n");
            sb.append(HexTool.toString((byte[]) message)).append("\n").append(HexTool.toStringFromAscii((byte[]) message));
            System.out.println(sb.toString());
        }
        for (final ChatRecvPacketOpcode recv : ChatRecvPacketOpcode.values()) {
            if (recv.getValue() == header_num) {
                try {
                    handlePacket(recv, slea, c, false);
                } catch (InterruptedException ex) {

                }
                return;
            }
        }
    }

    public static final void handlePacket(final ChatRecvPacketOpcode header, final ReadingMaple rm, final MapleChatClient c, final boolean cs) throws InterruptedException {
        switch (header) {
            case LoginResult:
                final int SenderAID = rm.readInt();
                final long ReadTime = rm.readLong();
                rm.skip(4);
                final byte LowDateTime = rm.readByte();
                final int SenderCID = rm.readInt();
                final String RawMsg = rm.readMapleAsciiString();
                c.setSenderAID(SenderAID);
                c.setSenderCID(SenderCID);
                c.setReadTime(ReadTime);
                c.setLowDateTime(LowDateTime);
                c.setRawMsg(RawMsg);
                ChatHandler.registerMCC(c);
                break;
            case GuildChatMessage:
                rm.skip(4);
                int gid = rm.readInt();
                ChatHandler.guildChat(c, rm.readMapleAsciiString(), gid);
                break;
            case FriendChatMessage:
                rm.skip(4);
                ChatHandler.buddyChat(c, rm.readMapleAsciiString(), c.getSenderCID());
                break;
        }
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package launch.netty;

import client.MapleClient;
import static client.MapleClient.SessionIP;
import constants.GameConstants;
import constants.ServerConstants;
import constants.subclasses.ServerType;
import handler.MapleServerHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import launch.Start;
import packet.creators.LoginPacket;
import packet.crypto.MapleCrypto;
import packet.opcode.RecvPacketOpcode;
import packet.transfer.read.ReadingMaple;
import tools.FileoutputUtil;
//import tools.ProcessesList;
import tools.RandomStream.Randomizer;

/**
 *
 * @author csproj
 */
public class MapleNettyHandler extends SimpleChannelInboundHandler<ReadingMaple> {

    private final ServerType serverType;
    private final int channel;

    public MapleNettyHandler(ServerType serverType, int channel) {
        this.serverType = serverType;
        this.channel = channel;
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        final byte serverRecv[] = {(byte) 0x22, (byte) 0x3F, (byte) 0x37, (byte) Randomizer.nextInt(255)};
        final byte serverSend[] = {(byte) 0xC9, (byte) 0x3A, (byte) 0x27, (byte) Randomizer.nextInt(255)};
        final byte ivRecv[] = serverRecv;
        final byte ivSend[] = serverSend;
        final MapleClient client = new MapleClient(
                ctx.channel(),
                new MapleCrypto(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)), // Sent Cypher
                new MapleCrypto(ivRecv, ServerConstants.MAPLE_VERSION));
        // Start of IP checking
        final String address = ctx.channel().remoteAddress().toString().split(":")[0];
        // IV used to decrypt packets from client.
        switch (serverType) {
            case LOGIN:
                Start.println("[ARGON] " + address + " has connected to login server.", 37);
                break;
            case CHANNEL:
                Start.println("[ARGON] " + address + " has connected to channel server.", 37);
                break;
            case CASHSHOP:
                Start.println("[ARGON] " + address + " has connected to cash shop server.", 37);
                break;
            case BUDDYCHAT:
                Start.println("[ARGON] " + address + " has connected to chatting server.", 37);
                break;
            default:
        }
        client.setChannel(channel);
        ctx.writeAndFlush(LoginPacket.initializeConnection(ServerConstants.MAPLE_VERSION, ivSend, ivRecv, !serverType.equals(ServerType.LOGIN)));
        ctx.channel().attr(MapleClient.CLIENTKEY).set(client);
        client.sendPing();
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {

        MapleClient client = ctx.channel().attr(MapleClient.CLIENTKEY).get();

        if (client != null) {
            client.SessionIP = null;
            client.disconnect(true, false);
            client.deleteSessionIP(client.getIp());
        }
        ctx.channel().attr(MapleClient.CLIENTKEY).set(null);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        final byte serverRecv[] = {(byte) 0x22, (byte) 0x3F, (byte) 0x37, (byte) Randomizer.nextInt(255)};
        final byte serverSend[] = {(byte) 0xC9, (byte) 0x3A, (byte) 0x27, (byte) Randomizer.nextInt(255)};
        final byte ivRecv[] = serverRecv;
        final byte ivSend[] = serverSend;
        final MapleClient client = new MapleClient(
                ctx.channel(),
                new MapleCrypto(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)), // Sent Cypher
                new MapleCrypto(ivRecv, ServerConstants.MAPLE_VERSION));
        client.setChannel(channel);

        ctx.writeAndFlush(LoginPacket.initializeConnection(ServerConstants.MAPLE_VERSION, ivSend, ivRecv, !serverType.equals(ServerType.LOGIN)));

        ctx.channel().attr(MapleClient.CLIENTKEY).set(client);
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent e = (IdleStateEvent) evt;

            /*
             if (e.state() == IdleState.READER_IDLE) {
                 ctx.close();
             } else if (e.state() == IdleState.WRITER_IDLE) {
                 ctx.writeAndFlush(new PingMessage());
             }
             */
        }
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ReadingMaple slea) throws Exception {
        final MapleClient c = (MapleClient) ctx.channel().attr(MapleClient.CLIENTKEY).get();
        final short header_num = slea.readShort();
        if (ServerConstants.showPackets) {
            if (header_num != RecvPacketOpcode.MOVE_LIFE.getValue() && header_num != RecvPacketOpcode.QUEST_ACTION.getValue()) {
                final StringBuilder sb = new StringBuilder("[Receive] : ");
                sb.append(RecvPacketOpcode.getOpcodeName(header_num)).append(" [" + header_num + "]").append(" : ").append(slea.toString());
                System.out.println(sb.toString());
            }
        }

        for (final RecvPacketOpcode recv : RecvPacketOpcode.values()) {
            if (recv.getValue() == header_num) {
                try {
                    MapleServerHandler.handlePacket(recv, slea, c, serverType.equals(ServerType.CASHSHOP));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                return;
            }
        }
    }

}

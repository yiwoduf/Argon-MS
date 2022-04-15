/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package launch.netty;

import client.MapleClient;
import constants.ServerConstants;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import java.util.concurrent.locks.Lock;
import packet.crypto.MapleCrypto;
import packet.opcode.SendPacketOpcode;
import packet.transfer.read.*;
import tools.HexTool;

/**
 *
 * @author csproj
 */
public class MapleNettyEncoder extends MessageToByteEncoder<byte[]> {

    @Override
    protected void encode(ChannelHandlerContext ctx, byte[] msg, ByteBuf buffer) throws Exception {

        final MapleClient client = ctx.channel().attr(MapleClient.CLIENTKEY).get();
        final ReadingMaple rh = new ReadingMaple(new ByteStream(msg));
        final short header_num = rh.readShort();
        final StringBuilder sb = new StringBuilder("[Send] : ");
        sb.append(SendPacketOpcode.getOpcodeName(header_num)).append(" [" + header_num + "]").append(" : ").append(HexTool.toString(((byte[]) msg))).append("\n").append(HexTool.toStringFromAscii(msg)).append("\n\n");
        //System.out.println(sb.toString());
        if (client != null) {
            final Lock mutex = client.getLock();

            mutex.lock();
            try {
                final MapleCrypto send_crypto = client.getSendCrypto();

                buffer.writeBytes(send_crypto.getPacketHeader(msg.length));
                buffer.writeBytes(send_crypto.crypt(msg));
            } finally {
                mutex.unlock();
            }
        } else { // no client object created yet, send unencrypted (hello)
            buffer.writeBytes(msg);
            //    ctx.F(buffer);
        }

        ctx.flush();
    }
}

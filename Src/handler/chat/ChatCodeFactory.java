/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler.chat;

/**
 *
 * @author SEUNGHYEON
 */
import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;

public class ChatCodeFactory implements ProtocolCodecFactory {

    private final ProtocolEncoder encoder = new ChatPacketEncoder();
    private final ProtocolDecoder decoder = new ChatPacketDecoder();

    @Override
    public ProtocolEncoder getEncoder() throws Exception {
        return encoder;
    }

    @Override
    public ProtocolDecoder getDecoder() throws Exception {
        return decoder;
    }
}

/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package launch;

import constants.ServerConstants;
import handler.ChatServerHandler;
import handler.chat.ChatCodeFactory;
import java.io.IOException;
import java.net.InetSocketAddress;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

public class BuddyChatServer {

    private static int PORT = ServerConstants.BuddyChatPort;
    private static BuddyChatServer Instance = new BuddyChatServer();
    private InetSocketAddress InetSocketadd;
    private IoAcceptor acceptor;

    public static BuddyChatServer getInstance() {
        return Instance;
    }

    public final void run_startup_configurations() {
        try {
            /* 소켓 설정 시작 */
            ByteBuffer.setUseDirectBuffers(false);
            ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

            acceptor = new SocketAcceptor();
            final SocketAcceptorConfig cfg = new SocketAcceptorConfig();
            cfg.getSessionConfig().setTcpNoDelay(true);
            cfg.setDisconnectOnUnbind(true);
            cfg.getFilterChain().addLast("codec", new ProtocolCodecFilter(new ChatCodeFactory()));
            InetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind(InetSocketadd, new ChatServerHandler(), cfg);
            /* 소켓 설정 종료 */
            Start.println("[ARGON] Friend Chat Server " + PORT + " Port successfully opened.", 36);
        } catch (IOException e) {
            Start.println("[오류] 친구채팅서버가 " + PORT + " 포트를 개방하는데 실패했습니다.", 36);
            e.printStackTrace();
        }
    }

    public final void shutdown() {

    }
}

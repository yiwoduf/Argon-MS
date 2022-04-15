/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package launch;

import handler.AdminToolServerHandler;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

/**
 *
 * @author KSH
 */
public class AdminToolServer { // 치우씨 :: 이거 사용 안함

    private static int PORT = 9700;
    private static InetSocketAddress InetSocketadd;
    private static IoAcceptor acceptor;
    public static List<IoSession> session = new ArrayList<>();

    public static final void run_startup_configurations() {
        try {
            /* 소켓 설정 시작 */
            ByteBuffer.setUseDirectBuffers(false);
            ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

            acceptor = new SocketAcceptor();
            final SocketAcceptorConfig cfg = new SocketAcceptorConfig();
            cfg.getSessionConfig().setTcpNoDelay(true);
            cfg.setDisconnectOnUnbind(true);
            InetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind(InetSocketadd, new AdminToolServerHandler(), cfg);
            /* 소켓 설정 종료 */
            Start.println("[ARGON] 관리기서버가 " + PORT + " 포트를 성공적으로 개방하였습니다.", 36);
        } catch (IOException e) {
            Start.println("[오류] 관리기서버가 " + PORT + " 포트를 개방하는데 실패했습니다.", 36);
            e.printStackTrace();
        }
    }
    
    public static final void broadcastMessage(ByteBuffer buff) {
        for (IoSession se : session) {
            se.write(buff);
        }
    }
}

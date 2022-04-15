/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */
package launch;

import constants.ServerConstants;
import community.MapleGuildCharacter;
import constants.subclasses.ServerType;
import database.MYSQL;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.timeout.IdleStateHandler;
import launch.helpers.MapleLoginHelper;
import launch.helpers.MapleRankingWorker;
import launch.holder.WideObjectHolder;
import tools.Timer.WorldTimer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import launch.netty.MapleNettyDecoder;
import launch.netty.MapleNettyEncoder;
import launch.netty.MapleNettyHandler;

public class LoginServer {

    public static int PORT = ServerConstants.LoginPort;
    private String serverName, eventMessage;
    private byte flag;
    private int userLimit;
    private static LoginServer instance = new LoginServer();
    public static boolean Running = false;
    public boolean isReboot = false;
    private ServerBootstrap bootstrap;

    public static LoginServer getInstance() {
        return instance;
    }

    public void deleteGuildCharacter(MapleGuildCharacter mgc) {
        WideObjectHolder.getInstance().setGuildMemberOnline(mgc, false, -1);
        if (mgc.getGuildRank() > 1) { //not leader
            WideObjectHolder.getInstance().leaveGuild(mgc);
        } else {
            WideObjectHolder.getInstance().disbandGuild(mgc.getGuildId());
        }
    }

    public void run_startup_configurations() {
        try {
            userLimit = ServerConstants.defaultMaxChannelLoad;
            serverName = ServerConstants.serverName;
            eventMessage = ServerConstants.eventMessage;
            flag = ServerConstants.defaultFlag;
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = 0");
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {
                throw new RuntimeException("[����] ��� ĳ���͸� �������� ��Ű�µ� �����߽��ϴ�. �����ͺ��̽� ������ �ùٸ��� Ȯ���� �ּ���.");
            }
        } catch (Exception re) {
            System.err.println("[����] �α��� ���� ������ ������ �߻��߽��ϴ�.");
            if (!ServerConstants.realese) {
                re.printStackTrace();
            }
        }

        WorldTimer.getInstance().start();
        WorldTimer.getInstance().register(new MapleRankingWorker(), 1000 * 60 * 60);
        MapleLoginHelper.getInstance();
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast("decoder", new MapleNettyDecoder());
                            ch.pipeline().addLast("encoder", new MapleNettyEncoder());
                            ch.pipeline().addLast("idleStateHandler", new IdleStateHandler(60, 30, 0));
                            ch.pipeline().addLast("handler", new MapleNettyHandler(ServerType.LOGIN, -1));
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true);
            ChannelFuture f = bootstrap.bind(PORT).sync(); // (7)
            /* ���� ���� ���� */
            Start.println("[ARGON] Loggin Server " + PORT + " Port successfully opened.", 36);
        } catch (InterruptedException e) {
            Start.println("[ERROR] Loggin Server " + PORT + " Port error!", 36);
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void shutdown() {
        System.out.println("[����] ������ �����մϴ�..");
        WorldTimer.getInstance().stop();
        Running = false;
    }

    public String getServerName() {
        return serverName;
    }

    public String getEventMessage() {
        return eventMessage;
    }

    public byte getFlag() {
        return flag;
    }

    public void setEventMessage(String newMessage) {
        this.eventMessage = newMessage;
    }

    public void setFlag(byte newflag) {
        flag = newflag;
    }

    public int getUserLimit() {
        return userLimit;
    }

    public void setUserLimit(int newLimit) {
        userLimit = newLimit;
    }
}

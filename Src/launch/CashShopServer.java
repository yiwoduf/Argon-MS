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
import constants.subclasses.ServerType;
import handler.channel.AuctionHandler.WorldAuction;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import launch.holder.MapleCashShopPlayerHolder;
import launch.helpers.ChracterTransfer;
import launch.netty.MapleNettyDecoder;
import launch.netty.MapleNettyEncoder;
import launch.netty.MapleNettyHandler;

public class CashShopServer {

    private final int PORT = ServerConstants.CashShopPort;
    private MapleCashShopPlayerHolder players;
    private static final CashShopServer instance = new CashShopServer();
    private ServerBootstrap bootstrap;

    public static final CashShopServer getInstance() {
        return instance;
    }

    public final void run_startup_configurations() {

        players = new MapleCashShopPlayerHolder();

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
                            ch.pipeline().addLast("handler", new MapleNettyHandler(ServerType.CASHSHOP, -1));
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true);
            ChannelFuture f = bootstrap.bind(PORT).sync(); // (7)
            Start.println("[ARGON] Cash Shop Server " + PORT + " Port successfully opened.", 36);
        } catch (InterruptedException e) {
            Start.println("[오류] 캐시샵서버가 " + PORT + " 포트를 개방하는데 실패했습니다.", 36);
        }
        Runtime.getRuntime().addShutdownHook(new Thread(new ShutDownListener()));
    }

    public final MapleCashShopPlayerHolder getPlayerStorage() {
        return players;
    }

    public final void shutdown() {
        players.disconnectAll();
    }

    private final class ShutDownListener implements Runnable {

        @Override
        public void run() {
            System.out.println("Saving all connected clients...");
            players.disconnectAll();
            WorldAuction.save();
        }
    }

    public void ChannelChange_Data(ChracterTransfer transfer, int characterid) {
        getPlayerStorage().registerPendingPlayer(transfer, characterid);
    }

    public final boolean isCharacterInCS(String name) {
        return getPlayerStorage().isCharacterConnected(name);
    }
}

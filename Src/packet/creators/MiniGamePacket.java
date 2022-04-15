
package packet.creators;

import client.MapleCharacter;
import client.MapleClient;
import handler.channel.PlayerInteractionHandler;
import packet.opcode.SendPacketOpcode;

import packet.transfer.write.WritingPacket;
import server.shops.MapleMiniGame;
import tools.Pair;

/**
 * @author Administrator
 */
public class MiniGamePacket {

    public static final byte[] shopErrorMessage(final int error, final int type, final int msg) {
        final WritingPacket mplew = new WritingPacket();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(error);
        mplew.write(type);
        mplew.write(msg);

        return mplew.getPacket();
    }

    public static byte[] getMiniGame(MapleClient c, MapleMiniGame minigame) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x14);
        mplew.write(minigame.getGameType());
        mplew.write(minigame.getMaxSize()); //2
        mplew.writeShort(minigame.getVisitorSlot(c.getPlayer()));
        PacketProvider.addPlayerLooks(mplew, minigame.getMCOwner(), false);
        mplew.writeMapleAsciiString(minigame.getOwnerName());
        mplew.writeShort(minigame.getMCOwner().getJob());
        for (Pair visitorz : minigame.getVisitors()) {
            mplew.write(((Byte) visitorz.getLeft()).byteValue());
            PacketProvider.addPlayerLooks(mplew, (MapleCharacter) visitorz.getRight(), false);
            mplew.writeMapleAsciiString(((MapleCharacter) visitorz.getRight()).getName());
            mplew.writeShort(((MapleCharacter) visitorz.getRight()).getJob());
        }
        mplew.write(-1);
        mplew.write(0);
        addGameInfo(mplew, minigame.getMCOwner(), minigame);
        for (Pair visitorz : minigame.getVisitors()) {
            mplew.write(((Byte) visitorz.getLeft()).byteValue());
            addGameInfo(mplew, (MapleCharacter) visitorz.getRight(), minigame);
        }
        mplew.write(-1);
        mplew.writeMapleAsciiString(minigame.getDescription());
        mplew.writeShort(minigame.getPieceType());
        return mplew.getPacket();
    }

    public static byte[] getMiniGameReady(boolean ready) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(ready ? 0x5D : 0x5E);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameExitAfter(boolean ready) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(ready ? 0x5B : 0x5C);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameStart(int loser) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x60);
        mplew.write(loser == 1 ? 0 : 1);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameSkip(int slot) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(98);
        mplew.write(slot);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameRequestTie() {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(85);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameOmokTest2(int slot, int sex) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(90);
        mplew.write(slot);
        if (slot == 1) {
            mplew.write(sex);
        }
        return mplew.getPacket();
    }

    public static byte[] getMiniGameOmokTest() {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(89);
        return mplew.getPacket();
    }


    public static byte[] getMiniGameDenyTie() {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(86);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameFull() {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.writeShort(12);
        mplew.write(2);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameMoveOmok(int move1, int move2, int move3) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(99);
        mplew.writeInt(move1);
        mplew.writeInt(move2);
        mplew.write(move3);
        return mplew.getPacket();
    }

    public static byte[] getMiniGameNewVisitor(MapleCharacter c, int slot, MapleMiniGame game) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x13);
        mplew.write(slot);
        PacketProvider.addPlayerLooks(mplew, c, false);
        mplew.writeMapleAsciiString(c.getName());
        mplew.writeShort(c.getJob());
        addGameInfo(mplew, c, game);
        return mplew.getPacket();
    }

    public static void addGameInfo(WritingPacket mplew, MapleCharacter chr, MapleMiniGame game) {
        mplew.writeInt(game.getGameType());
        mplew.writeInt(game.getWins(chr));
        mplew.writeInt(game.getTies(chr));
        mplew.writeInt(game.getLosses(chr));
        mplew.writeInt(game.getScore(chr));
    }

    public static byte[] getMiniGameClose(byte number) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x1C);
        mplew.write(1);
        mplew.write(number);
        return mplew.getPacket();
    }

    public static byte[] getMatchCardStart(MapleMiniGame game, int loser) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x60);
        mplew.write(loser == 1 ? 0 : 1);
        int times = game.getPieceType() == 2 ? 30 : game.getPieceType() == 1 ? 20 : 12;
        mplew.write(times);
        for (int i = 1; i <= times; i++) {
            mplew.writeInt(game.getCardId(i));
        }
        return mplew.getPacket();
    }

    public static byte[] getMatchCardSelect(int turn, int slot, int firstslot, int type) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x67);
        mplew.write(turn);
        mplew.write(slot);
        if (turn == 0) {
            mplew.write(firstslot);
            mplew.write(type);
        }
        return mplew.getPacket();
    }

    public static byte[] getMiniGameResult(MapleMiniGame game, int type, int x) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x61);
        mplew.write(type);
        game.setPoints(x, type);
        if (type != 0) {
            game.setPoints(x == 1 ? 0 : 1, type == 2 ? 0 : 1);
        }
        if (type != 1) {
            if (type == 0) {
                mplew.write(x == 1 ? 0 : 1);
            } else {
                mplew.write(x);
            }
        }
        addGameInfo(mplew, game.getMCOwner(), game);
        for (Pair visitorz : game.getVisitors()) {
            addGameInfo(mplew, (MapleCharacter) visitorz.right, game);
        }
        return mplew.getPacket();

    }
}

/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package handler.channel;

import client.MapleCharacter;
import client.MapleClient;
import constants.GameConstants;

import java.sql.Timestamp;

import packet.creators.MainPacketCreator;
import packet.skills.AngelicBusterSkill;
import packet.transfer.read.ReadingMaple;

public class AngelicBusterHandler {

    public static final void DressUpTime(final ReadingMaple rh, final MapleClient c) {
        byte type = rh.readByte();
        if (type == 1) {
            if (GameConstants.isAngelicBuster(c.getPlayer().getJob())) {
                c.getSession().writeAndFlush(AngelicBusterSkill.AngelicBusterChangingWait(type, true));
                c.getSession().writeAndFlush(AngelicBusterSkill.AngelicBusterChangingWait(type, false));
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.updateCharLook(c.getPlayer()), false);
            }
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.updateCharLook(c.getPlayer()), false);
        }
    }

    public static void DressUpRequest(final MapleCharacter chr, ReadingMaple rh) {
        int code = rh.readInt();
        switch (code) {
            case 5010093:
                // chr.getMap().broadcastMessage(MaplePacketCreator.updateCharLook(chr, true));
                chr.getMap().broadcastMessage(AngelicBusterSkill.updateDress(code, chr));
                break;
            case 5010094:
                // chr.getMap().broadcastMessage(MaplePacketCreator.updateCharLook(chr, true));
                chr.getMap().broadcastMessage(AngelicBusterSkill.updateDress(code, chr));
                break;
        }
    }
}

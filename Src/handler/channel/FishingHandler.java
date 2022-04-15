/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package handler.channel;

import client.MapleCharacter;
import packet.creators.MainPacketCreator;
import scripting.NPCScriptManager;
import server.items.ItemInformation;
import tools.RandomStream.Randomizer;
import tools.Timer;

/**
 *
 * @author Administrator
 */
public class FishingHandler {
    public static int Items[] = {4001187, 4001188, 4001189};
    public static short quentity[] = {1, 1, 1};
    public static int FishingMap = 3000500;
    public static int FishingChair = 3010432;

    
    public static void GainFishing(final MapleCharacter chr) {
        int rand = Randomizer.nextInt(Items.length);
        chr.gainItem(Items[rand], quentity[rand], false, 0, null);
        ItemInformation ii = ItemInformation.getInstance();
        chr.dropMessage(6, "낚시를통해 아이템 " + ii.getName(Items[rand]) + "를 " + quentity[rand] + "개 얻었습니다!");
    }
    public static void StartFishing(final MapleCharacter chr) {
        chr.setFishing(true);
        chr.send(MainPacketCreator.getClock(100));
        Timer.BuffTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                if (chr.getChair() == FishingChair && chr.getMapId() == FishingMap) {
                    GainFishing(chr);
                    StartFishing(chr);
                } else {
                    StopFishing(chr);
                }
            }
        }, 120000);
    }
    public static void StopFishing(final MapleCharacter chr) {
        Timer.BuffTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                chr.setFishing(false);
            }
        }, 120000);
        chr.send(MainPacketCreator.getClock(0));
    }
}
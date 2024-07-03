/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler.channel;

import client.MapleCharacter;
import constants.ServerConstants;
import java.util.logging.Level;
import java.util.logging.Logger;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.creators.UIPacket;

/**
 *
 * @author Administrator
 */
public class Marriage extends Thread {
    private MapleCharacter male = null;
    private MapleCharacter fmale = null;
    private int rate = 0;
    private String msg[] = {"오늘 우리는 두 젊은이를 축복하기 위해 모였습니다.",
            "흔히 하늘이 내린 인연은 리본돼지의 붉은 리본으로 이어져 있다고 합니다.",
            "제가 보기에는 이 두 사람은 그 리본의 끝에 있는 서로를 찾아낸 것 같습니다.",
            "수 많은 여행자들 중에서 서로를 찾아낸 두 사람이야말로 진정한 행운아 일겁니다.",
            "서로에게 찾아 온 이 행운을 행복으로 만들어가는 것이 앞으로 두 사람에게 주어진 약속입니다.",
            "신랑, 검은 머리가 예티의 털처럼 하얗게 변할때까지 신부를 사랑하시겠습니까?",
            "신부, 엘나스산의 만년설이 모두 녹아 니할사막처럼 될 때까지 신랑을 사랑하시겠습니까?",
            "오늘 모인 하객분들이 두 사람의 맹세에 대한 증인이 되어 주십시오.",
            "모두의 축복 속에 두 젊은이가 부부가 되었음을 선포합니다."};

    public Marriage(final MapleCharacter male, final MapleCharacter fmale) {
        this.male = male;
        this.fmale = fmale;
    }

    @Override
    public void run() {
        try {
            WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(5, "[결혼] " + male.getName() + "님 과 " + fmale.getName() + "님 의 결혼식을 시작 합니다."));
            Thread.sleep(3000);
            while (true) {
                male.getMap().broadcastMessage(UIPacket.showInfo(msg[rate]));
                if (rate == 8) {
                    male.send(UIPacket.showWZEffect("Effect/BasicEff.img/Wedding", 1));
                    fmale.send(UIPacket.showWZEffect("Effect/BasicEff.img/Wedding", 1));
                    male.getMap().broadcastMessage(UIPacket.broadcastWZEffect(male.getId(), "Effect/BasicEff.img/Wedding", 1));
                    fmale.getMap().broadcastMessage(UIPacket.broadcastWZEffect(fmale.getId(), "Effect/BasicEff.img/Wedding", 1));
                    long time = System.currentTimeMillis();
                    male.setMarri(fmale.getName(), fmale.getId(), time, 1112308);
                    male.saveMarri();
                    fmale.setMarri(male.getName(), male.getId(), time, 1112308);
                    fmale.saveMarri();
                    Thread.sleep(5000);
                    male.warp(ServerConstants.mainMap);
                    fmale.warp(ServerConstants.mainMap);
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(5, "[결혼] " + male.getName() + "님 과 " + fmale.getName() + "님 이 모두의 축복 속에서 결혼을 하였습니다."));
                    ServerConstants.isMarri = false;
                    this.stop();
                    return;
                }
                rate ++;
                Thread.sleep(6000);
            }
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
    }
}

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
    private String msg[] = {"���� �츮�� �� �����̸� �ູ�ϱ� ���� �𿴽��ϴ�.",
            "���� �ϴ��� ���� �ο��� ���������� ���� �������� �̾��� �ִٰ� �մϴ�.",
            "���� ���⿡�� �� �� ����� �� ������ ���� �ִ� ���θ� ã�Ƴ� �� �����ϴ�.",
            "�� ���� �����ڵ� �߿��� ���θ� ã�Ƴ� �� ����̾߸��� ������ ���� �ϰ̴ϴ�.",
            "���ο��� ã�� �� �� ����� �ູ���� ������ ���� ������ �� ������� �־��� ����Դϴ�.",
            "�Ŷ�, ���� �Ӹ��� ��Ƽ�� ��ó�� �Ͼ�� ���Ҷ����� �źθ� ����Ͻðڽ��ϱ�?",
            "�ź�, ���������� ���⼳�� ��� ��� ���һ縷ó�� �� ������ �Ŷ��� ����Ͻðڽ��ϱ�?",
            "���� ���� �ϰ��е��� �� ����� �ͼ��� ���� ������ �Ǿ� �ֽʽÿ�.",
            "����� �ູ �ӿ� �� �����̰� �κΰ� �Ǿ����� �����մϴ�."};

    public Marriage(final MapleCharacter male, final MapleCharacter fmale) {
        this.male = male;
        this.fmale = fmale;
    }

    @Override
    public void run() {
        try {
            WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(5, "[��ȥ] " + male.getName() + "�� �� " + fmale.getName() + "�� �� ��ȥ���� ���� �մϴ�."));
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
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(5, "[��ȥ] " + male.getName() + "�� �� " + fmale.getName() + "�� �� ����� �ູ �ӿ��� ��ȥ�� �Ͽ����ϴ�."));
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

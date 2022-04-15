/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */
package scripting;

import client.MapleClient;
import server.maps.MaplePortal;

public class PortalPlayerInteraction extends AbstractPlayerInteraction {

    private final MaplePortal portal;

    public PortalPlayerInteraction(final MapleClient c, final MaplePortal portal) {
        super(c);
        this.portal = portal;
    }

    public final MaplePortal getPortal() {
        return portal;
    }

    public final void inFreeMarket() {
        if (getPlayer().getLevel() > 10) {
            saveLocation("FREE_MARKET");
            playPortalSE();
            warp(910000001, "st00");
        } else {
            playerMessage(5, "���� 10 �̻� �̰��� �� �� �ֽ��ϴ�.");
        }
    }
}

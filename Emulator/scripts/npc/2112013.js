var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("Juliet");
    if (em == null) {
        cm.dispose();
        return;
    }
    if (!cm.canHold(4001131, 1)) {
        cm.sendOk("#fn나눔고딕 Extrabold##r기타창의 슬롯이 한칸 필요합니다.#k");
        cm.dispose();
        return;
    }
   /*if (cm.getPlayer().getMapId() == 926110203) { //just first stage
        var npc = cm.getPlayer().getMap().getNPCByOid(cm.getObjectId());
        if (npc.getPosition().distanceSq(cm.getPlayer().getPosition()) > 5000) {
            cm.sendOk("#fn나눔고딕 Extrabold#조사하기에는 너무 멀리 있다.");
            cm.dispose();
            return;
        }
        if (em.getProperty("stage5") == null || em.getProperty("stage5").equals("0")) {

            if (cm.getPlayer().hasGmLevel(6) && false) { // debug
                cm.getMap().setReactorState(cm.getPlayer().getPlayer().getId());
                cm.mapMessage(6, cm.getPlayer().getName() + " 님이 스위치를 누르자 특수한 포탈이 나타났다.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage5", "1");
                cm.dispose();
                return;
            }
            } else if (em.getProperty("stage5_" + cm.getObjectId()).equals("2")) {
                cm.getMap().setReactorState(cm.getPlayer().getPlayer().getId());
                cm.mapMessage(6, cm.getPlayer().getName() + " 님이 스위치를 누르자 특수한 포탈이 나타났다.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage5", "1");
            } else if (em.getProperty("stage5_" + cm.getObjectId()).equals("1")) {
                cm.sendOk("#fn나눔고딕 Extrabold#이미 조사한 곳이다.");
}
}*/

    if (cm.getPlayer().getMapId() == 926110000) { //just first stage
        var npc = cm.getPlayer().getMap().getNPCByOid(cm.getObjectId());
        if (npc.getPosition().distanceSq(cm.getPlayer().getPosition()) > 5000) {
            cm.sendOk("#fn나눔고딕 Extrabold#조사하기에는 너무 멀리 있다.");
            cm.dispose();
            return;
        }
        if (em.getProperty("stage1") == null || em.getProperty("stage1").equals("0")) {

            if (cm.getPlayer().hasGmLevel(6) && true){ // debug
                cm.getMap().setReactorState(cm.getPlayer().getClient());
                cm.mapMessage(6, cm.getPlayer().getName() + " 님이 스위치를 누르자 특수한 포탈이 나타났다.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage1", "1");
                cm.dispose();
                return;
            }

            if (em.getProperty("stage1_" + cm.getObjectId()) == null) {
                em.setProperty("stage1_" + cm.getObjectId(), "1");
                var rand = Math.random();
                if (rand < 0.2) {
                    cm.sendOk("#fn나눔고딕 Extrabold#경험치를 획득했지만 아무것도 찾지는 못했다.");
                    cm.gainExpR(500);
                } else if (rand < 0.5) {
                    cm.sendOk("#fn나눔고딕 Extrabold#500 메소를 발견했다.");
                    cm.gainMeso(500);
                } else {
                    cm.sendOk("#fn나눔고딕 Extrabold#아무것도 없는 것 같다.");
                }
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("0")) {
                em.setProperty("stage1_" + cm.getObjectId(), "1");
                var rand = Math.random();
                if (rand < 0.2) {
                    cm.sendOk("경험치를 획득했지만 아무것도 찾지는 못했다.");
                    cm.gainExpR(500);
                } else if (rand < 0.5) {
                    cm.sendOk("#fn나눔고딕 Extrabold#500 메소를 발견했다.");
                    cm.gainMeso(500);
                } else {
                    cm.sendOk("#fn나눔고딕 Extrabold#아무것도 없는 것 같다.");
                }
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("1")) {
                cm.sendOk("#fn나눔고딕 Extrabold#이미 조사한 곳이다.");
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("2")) {
                cm.getMap().setReactorState(cm.getPlayer().getClient());
                cm.mapMessage(6, cm.getPlayer().getName() + "님이 스위치를 누르자 특수한 포탈이 나타났다.");
                cm.gainPartyExpPQ(10000, "rnj", 70);
                cm.clearEffect();
                em.setProperty("stage1", "1");
            } else if (em.getProperty("stage1_" + cm.getObjectId()).equals("3")) {
                cm.gainItem(4001130, 1);
                cm.sendOk("#fn나눔고딕 Extrabold#무언가 편지를 발견했다.");
                em.setProperty("stage1_" + cm.getObjectId(), "1");
            }
        } else {
            if (em.getProperty("stage1_" + cm.getObjectId()) != null && em.getProperty("stage1_" + cm.getObjectId()).equals("3")) {
                cm.gainItem(4001130, 1);
                cm.sendOk("#fn나눔고딕 Extrabold#무언가 편지를 발견했다.");
                em.setProperty("stage1_" + cm.getObjectId(), "1");
            } else {
                cm.sendOk("#fn나눔고딕 Extrabold#이미 다음 스테이지로 가는 포탈이 열려있다.");
            }
        }
    }
    cm.dispose();
}
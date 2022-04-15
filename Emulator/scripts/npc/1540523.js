var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    
    howmuch = 30000 // 환생포인트
    item = 2431838; // 아이템코드 
    itemqty = 1000; // 아이템개수
    job = [13100, 5112];
  
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
       cm.sendSimple("환생을 거듭하여 #b극한의 힘#k을 가진 자에게 특별한 직업으로 변생을 하게 해 주지...\r\n\r\n#L0# 핑크빈(#b환포3만#k,#b파이널조각1000개#k)#l\r\n#L1# 미하일((#b환포3만#k,#b파이널조각1000개#k)")
    } else if (status == 1) {
       if (cm.getPlayer().getGP() < howmuch || cm.getItemQuantity(item) < itemqty) {
           cm.sendOk("변생을 하기 위한 포인트나 아이템이 부족하네..");
           cm.dispose();
           return;
       }
        var it = cm.getPlayer().getSkills().keySet().iterator();
        var resetskill = [];
        var i = 0;
        while (it.hasNext()) {
            var lskill = it.next();
            if (lskill.getId() >= 80000000) {
                continue;
            }
            resetskill[i] = lskill.getId();
            i++;
        }
        for (var j = 0; j < resetskill.length; j ++) {
            cm.getPlayer().changeSkillLevel(resetskill[j], 0, 0);
        }
        cm.resetStats(4, 4, 4, 4);
        cm.changeJob(job[selection]);
        cm.getPlayer().gainGP(-howmuch);
        cm.gainItem(item,-itemqty);
        cm.sendOk("변생이 완료되었다네.\r\n#b@스킬마스터#k로 스킬을 마스터하게나.");
        cm.dispose();
    }
}
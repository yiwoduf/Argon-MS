var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
       말 = "#fn나눔고딕 Extrabold# 후원포인트 및 환생포인트로 추가데미지를 구매하실 수 있습니다.\r\n\r\n#L0#후원포인트로 추가데미지 구매하기.\r\n#L1#환생포인트로 추가데미지 구매하기.\r\n"
       cm.sendSimple(말);
    } else if (status == 1) {
        선택 = selection;
        if (selection == 0) {
            cm.sendGetNumber("#fn나눔고딕 Extrabold# 후원포인트를 사용하여 추가데미지를 구매하실 수 있습니다. 사용하고 싶은 후원포인트 양을 적어주세요.\r\n\r\n#r(#h #님의 현재 후원포인트 : "+cm.getPlayer().getRC()+")",1,1,cm.getPlayer().getRC())
        } else if (selection == 1) {
            cm.sendGetNumber("#fn나눔고딕 Extrabold# 환생포인트를 사용하여 추가데미지를 구매하실 수 있습니다. 사용하고 싶은 환생포인트 양을 적어주세요.\r\n\r\n#r(#h #님의 현재 환생포인트 : "+cm.getPlayer().getGP()+")",1,1,cm.getPlayer().getGP())
        }
    }// else if (status == 2) {
      
        if (선택 == 0) {
            if (cm.getPlayer().getRC() >= selection) {
                cm.getPlayer().gainRC(-selection);
            } else {
                cm.sendOk("오류가 발생했습니다.");
                cm.dispose();
                return;
            }
        } else if (선택 == 1) {
            if (cm.getPlayer().getGP() >= selection) {
                cm.getPlayer().gainGP(-selection);
            } else {
                cm.sendOk("오류가 발생했습니다.");
                cm.dispose();
                return;
            }
          
       }
            cm.getPlayer().setAddDamage(Number(cm.getPlayer().getAddDamage()) + Number(selection*10000));
            cm.sendOk("완료");
            cm.dispose();
        
    }
}






























































































